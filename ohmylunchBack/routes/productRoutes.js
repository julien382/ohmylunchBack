const express = require('express');
const router = express.Router();
const path = require('path');
const { getProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const multer = require('multer');

// Configuration multer pour l'upload de l'image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads'); // Dossier où stocker les images
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + path.extname(file.originalname); // Nom unique basé sur la date
        cb(null, fileName);
    }
});
const upload = multer({ storage });

// Route pour obtenir tous les produits
router.get('/', getProducts);

// Route pour ajouter un produit avec image
router.post('/', upload.single('img'), addProduct); // Utilisation de multer pour l'image

// Route pour mettre à jour un produit
router.put('/:id', updateProduct);

// Route pour supprimer un produit
router.delete('/:id', deleteProduct);

module.exports = router;
