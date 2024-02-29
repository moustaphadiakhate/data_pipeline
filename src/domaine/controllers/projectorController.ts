import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { validateRequestParams } from "../services/validateRequestParams";
import { Client } from "../../types/projector/GetClientOrderRequest";

require('dotenv').config();

const router = express.Router();

router.get('/:client_email', Client, validateRequestParams, (req: Request, res: Response) => {
  try {
    const client_email = req.params.client_email;
    const pdfFileName = `${client_email.replace('@', '_').replace('.', '_')}_facture.pdf`;

    const pdfFilePath = path.join(__dirname, '..', '..', '..', 'scripts', 'factures', pdfFileName);

    // Vérifier si le fichier PDF existe
    if (!fs.existsSync(pdfFilePath)) {
      return res.status(404).send('Aucune facture n`\'est pas disponiblepour le client ' + client_email);
    }

    // Envoyer le fichier PDF si trouvé
    res.sendFile(pdfFilePath, (err) => {
      if (err) {
        res.status(500).send('Erreur lors de l\'envoi du fichier PDF');
      }
    });
  } catch (error) {
    res.status(500).send('Erreur lors de l\'envoi du fichier PDF');
  }
});

export default router;
