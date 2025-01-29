const express = require("express");
const Product = require("../models/Product");
const multer = require("multer"); // Importer multer
const path = require("path");
const router = express.Router();

// Configuration de multer pour gérer l'upload des images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Dossier où les images seront stockées
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nom unique basé sur le timestamp
  },
});

const upload = multer({ storage: storage }); // Instance de multer avec la configuration

// Route pour ajouter un produit (avec upload d'image)
router.post("/", upload.single("img"), async (req, res) => {
  const { category, title, text, price } = req.body;
  let img = req.file ? req.file.path : null;

  if (img) {
    img = img.split(path.sep).join("/");  // Remplacer le séparateur de chemin système par un slash
  }

  if (!category || !img || !title || !text || !price) {
    return res.status(400).json({ message: "Tous les champs sont obligatoires" });
  }

  try {
    const newProduct = new Product({
      category,
      img, // Chemin de l'image avec des slashes
      title,
      text,
      price,
    });

    await newProduct.save();
    res.status(201).json(newProduct); // Retourner le produit créé
  } catch (error) {
    console.error("Erreur lors de l'ajout du produit :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Route pour récupérer tous les produits
router.get("/", async (req, res) => {
  try {
    const products = await Product.find(); // Récupère tous les produits
    res.json(products); // Retourne la liste des produits
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
