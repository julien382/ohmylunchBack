const { MongoClient } = require('mongodb');
const { generateToken } = require('../utils/tokenGenerator'); // Chemin vers ton fichier tokenGenerator.js

const uri = 'mongodb://localhost:27017'; // Modifie avec l'URI de ta base MongoDB
const dbName = 'nom_de_ta_base'; // Remplace par le nom de ta base
const collectionName = 'users'; // Remplace par le nom de ta collection

async function updateToken() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Génération d'un nouveau token
    const token = generateToken();
    console.log('Nouveau token généré :', token);

    // Mise à jour du document (remplace "admin" par le username ou _id approprié)
    const result = await collection.updateOne(
      { username: 'admin' }, // Critère de sélection
      {
        $set: { token: token }, // Met à jour le champ token
        $unset: { password: '' }, // Supprime le champ password
      }
    );

    console.log(`Document mis à jour :`, result.modifiedCount);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du token :', error);
  } finally {
    await client.close();
  }
}

updateToken();
