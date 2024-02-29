# Cours sur le Data Pipeline dans le Contexte d'un E-commerce

## Introduction au Data Pipeline :

Un Data Pipeline est un processus automatisé qui permet de collecter, traiter et transformer des données brutes afin de les rendre utiles pour des analyses ou des actions ultérieures. Dans le contexte d'un e-commerce, un Data Pipeline peut être utilisé pour gérer différentes tâches telles que le traitement des commandes, l'analyse des comportements des clients, la gestion des stocks, etc.

## Composants d'un Data Pipeline :

1. **Source de données** :
   - Dans un e-commerce, les sources de données peuvent inclure les transactions des clients, les détails des produits, les informations sur les utilisateurs, etc.
   - Ces données peuvent provenir de différentes sources telles que des bases de données, des fichiers de logs, des API externes, des flux de données en temps réel, etc.

2. **Collecte des données** :
   - La collecte des données consiste à extraire les données brutes depuis les différentes sources vers le pipeline de traitement.
   - Cela peut être réalisé à l'aide d'outils et de technologies comme Apache Kafka, AWS Kinesis, des scripts d'importation de bases de données, etc.

3. **Traitement et Transformation des Données** :
   - Les données collectées sont ensuite traitées et transformées pour les préparer à l'analyse ou à d'autres actions.
   - Cela peut impliquer des opérations telles que le nettoyage des données, la normalisation, la validation, l'enrichissement avec des données supplémentaires, etc.
   - Des outils et des frameworks comme Apache Spark, Apache Flink, ou même des scripts Python ou Node.js peuvent être utilisés pour cette étape.

4. **Stockage des Données** :
   - Les données traitées sont stockées dans un entrepôt de données ou une base de données pour un accès ultérieur.
   - Les options de stockage peuvent inclure des bases de données relationnelles (MySQL, PostgreSQL), des bases de données NoSQL (MongoDB, Cassandra), des entrepôts de données cloud (Amazon Redshift, Google BigQuery), etc.

5. **Analyse et Visualisation des Données** :
   - Une fois que les données sont stockées, elles peuvent être analysées pour obtenir des insights commerciaux ou des informations sur les tendances des clients.
   - Des outils d'analyse comme Tableau, Power BI, ou des bibliothèques Python comme Pandas peuvent être utilisés pour cette étape.

6. **Actions basées sur les Données** :
   - Enfin, les résultats de l'analyse peuvent être utilisés pour prendre des décisions commerciales, personnaliser l'expérience client, optimiser les opérations, etc.
   - Cela peut inclure des actions telles que l'envoi de recommandations de produits personnalisées, l'optimisation des campagnes marketing, la gestion des stocks en temps réel, etc.

## Exemple de Data Pipeline dans un E-commerce :

Prenons l'exemple d'un Data Pipeline pour gérer les commandes dans un e-commerce :

1. **Collecte des Données** :
   - Les détails des commandes des clients sont collectés à partir du site web, de l'application mobile ou d'autres canaux de vente.

2. **Traitement et Transformation des Données** :
   - Les données des commandes sont nettoyées, validées et transformées pour les adapter au format requis.
   - Les informations telles que le total de la commande, les détails des produits, les informations sur le client sont extraites et structurées.

3. **Stockage des Données** :
   - Les données des commandes sont stockées dans une base de données transactionnelle ou un entrepôt de données pour une utilisation ultérieure.

4. **Analyse et Actions basées sur les Données** :
   - Les données des commandes peuvent être analysées pour comprendre les tendances des clients, identifier les produits populaires, évaluer les performances des campagnes de marketing, etc.
   - Sur la base de ces analyses, des actions peuvent être prises, telles que l'optimisation des stocks, l'amélioration de l'expérience client, la personnalisation des offres, etc.

## Conclusion :

En résumé, un Data Pipeline est un élément essentiel de l'infrastructure d'un e-commerce, permettant de gérer efficacement les données et d'obtenir des insights précieux pour prendre des décisions commerciales éclairées et offrir une expérience client optimale. En comprenant les composants et le fonctionnement d'un Data Pipeline, les entreprises peuvent tirer parti de leurs données pour rester compétitives sur le marché en constante évolution du commerce électronique.

# DEMO DATA PIPELINE API

---

## Exigences

Pour le démo app, vous aurez besoin de Node.js et NPM sur votre environnement.

---

### Node
- #### Installation de Node sur Windows

  Allez simplement sur le [site officiel de Node.js](https://nodejs.org/) et téléchargez l'installateur.
Assurez-vous également d'avoir `git` disponible dans votre PATH, `npm` pourrait en avoir besoin (vous pouvez trouver git [ici](https://git-scm.com/)).

- #### Installation de Node sur Ubuntu

  Vous pouvez installer nodejs et npm facilement avec apt install, exécutez simplement les commandes suivantes.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Autres systèmes d'exploitation
  Vous pouvez trouver plus d'informations sur l'installation sur le [site officiel de Node.js](https://nodejs.org/) et le [site officiel de NPM](https://npmjs.org/).

Si l'installation a réussi, vous devriez pouvoir exécuter la commande suivante.

    $ node --version
    v16.13.1

    $ npm --version
    8.3.0

Si vous devez mettre à jour `npm`, vous pouvez le faire en utilisant `npm` ! Cool non ? Après avoir exécuté la commande suivante, rouvrez simplement la ligne de commande et soyez heureux.

    $ npm install npm -g

### NPM

Sélectionnez le dossier et exécutez les commandes ci-dessous.

   1. `$ git clone https://github.com/moustaphadiakhate/data_pipeline.git`
   2. `$ cd data_pipeline`
   3. Créez une copie de `.env.template` et renommez-la `.env`.
   4. Retirez le `#` de chaque ligne.

## Pour exécuter l'api

1. `$ npm dev`
2. Allez sur `localhost:3009/health` dans un navigateur
   * La sortie normale ressemble à ceci :
   `{"status":200, "msg": "Api niit shop... Nothing to see here."}`

# Scripts: Pipeline de Génération de Commandes et de Factures

 `$ npm run orderPipeline`

 Le script ci-dessus génère des fichiers JSON de commandes et des fichiers PDF de factures pour chaque client à partir des données extraites d'un fichier JSON contenant des événements de commande.


1. **Lecture des données de commande :**
   - Lecture du contenu du fichier `events.json` qui contient les événements de commande.
   - Transformation des données JSON en un tableau d'objets d'événements.

2. **Regroupement des commandes par client avec quantité :**
   - Utilisation de la fonction `reduce()` pour regrouper les commandes par adresse e-mail du client et calculer la quantité de chaque article commandé.

3. **Génération des fichiers JSON de commandes et des fichiers PDF de factures :**
   - Parcours de chaque entrée dans l'objet `commandsByClientWithQuantity`.
   - Pour chaque client, calcul du prix total de la commande en multipliant le prix de chaque article par sa quantité.
   - Génération du fichier JSON de commande contenant les détails de la commande et du prix total. Le fichier est enregistré dans le dossier "commandes".
   - Génération du fichier PDF de facture contenant les détails de la commande et du prix total. Le fichier est enregistré dans le dossier "factures".
   - Utilisation de `PDFDocument` pour créer le contenu du fichier PDF avec les détails de la commande.
   - Envoi des fichiers PDF pour chaque client.
   - Affichage des messages de confirmation pour chaque client dont la commande et la facture ont été générées.

4. **Gestion des erreurs :**
   - Utilisation d'un bloc `try-catch` pour capturer les erreurs potentielles lors de la génération des fichiers.
   - Affichage des messages d'erreur en cas de problème.

5. **Conclusion :**
   - Affichage d'un message indiquant que la génération des commandes et des factures est terminée une fois que le traitement est effectué pour tous les clients.

Ce pipeline automatise le processus de génération de commandes et de factures à partir des données d'événements de commande, en produisant des fichiers JSON et des fichiers PDF pour chaque client.

## All Api endpoints

### Name: order
```
curl --location --request GET 'http://localhost:3009/v1/niit_shop/order' \
--header 'Content-Type: application/json' \
--data-raw '    {
    "client_email":"toto@niit.sn",
    "item":"react"
    }'
```

### Name: get_order
```
curl --location 'http://localhost:3009/v1/sdk/get_order&client_email=tata@niit.sn' \
--data ''
```
