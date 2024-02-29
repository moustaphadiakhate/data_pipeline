import * as path from "path";
import * as fs from "fs";
import PDFDocument from "pdfkit";

// Importation des données de la commande
import { niit_items } from '../src/types/order/OrderRequest';
const packageJsonPath = path.join(__dirname, "..", "log", "events.json");

// Définition du type pour un événement
type Event = {
  timestamp: string;
  who: string;
  msg: {
    client_email: string;
    item: string;
  };
};

// Lire le contenu du fichier events.json
const eventsData: Event[] = fs.readFileSync(packageJsonPath, 'utf-8')
  .split('\n')
  .filter(Boolean)
  .map((line: string) => JSON.parse(line));

// Regrouper les commandes par client_email avec quantité
const commandsByClientWithQuantity: { [key: string]: { [key: string]: number } } = eventsData.reduce((acc: { [key: string]: { [key: string]: number } }, event: Event) => {
  const clientEmail: string = event.msg.client_email;
  const item: string = event.msg.item;

  if (!acc[clientEmail]) {
    acc[clientEmail] = {};
  }

  if (!acc[clientEmail][item]) {
    acc[clientEmail][item] = 0;
  }

  acc[clientEmail][item]++;

  return acc;
}, {});

// Générer les fichiers JSON de commandes et les fichiers PDF de factures pour chaque client
Object.entries(commandsByClientWithQuantity).forEach( async ([clientEmail, items]) => {
  const totalPrice = Object.entries(items).reduce((acc, [itemName, quantity]) => {
    const item = niit_items.find(item => item.name === itemName);
    if (item) {
      return acc + item.price * quantity;
    }
    return acc;
  }, 0);

  // Générer le fichier JSON de commande
  const commandData = { client_email: clientEmail, items: items, total_price: totalPrice };
  const jsonFileName = `${clientEmail.replace('@', '_').replace('.', '_')}_commandes.json`;
  const jsonOutputPath = path.join(__dirname, "commandes", jsonFileName);
  await fs.writeFileSync(jsonOutputPath, JSON.stringify(commandData, null, 2));

  // Générer le fichier PDF de facture
  const doc = new PDFDocument();
  const pdfFileName = `${clientEmail.replace('@', '_').replace('.', '_')}_facture.pdf`;
  const pdfOutputPath = path.join(__dirname, "factures", pdfFileName);
  doc.pipe(fs.createWriteStream(pdfOutputPath));

  doc.fontSize(16).text(`Facture pour ${clientEmail}`, { align: 'center' }).moveDown();
  doc.fontSize(12).text('Détails de la commande :').moveDown();

  Object.entries(items).forEach(([itemName, quantity]) => {
    const item = niit_items.find(item => item.name === itemName);
    if (item) {
      doc.text(`${itemName} x ${quantity} : ${item.price * quantity} $`);
    } else {
      doc.text(`Article inconnu : ${itemName}`);
    }
  });

  doc.moveDown().text(`Prix total : ${totalPrice} $`, { align: 'right' });

  doc.end();

  console.log(`Commande et facture générées pour ${clientEmail}`);
});

console.log('Génération des commandes et des factures terminée.');
