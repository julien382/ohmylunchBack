const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/productRoutes");
const bodyParser = require("body-parser");

dotenv.config(); // Charger les variables d'environnement depuis le fichier .env

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Pour parser le JSON des requêtes
app.use("/uploads", express.static("uploads")); // Pour servir les images

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connecté à MongoDB");
  })
  .catch((err) => {
    console.error("Erreur de connexion à MongoDB", err);
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes); // Ajouter la route pour les produits

// Démarrage du serveur
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
