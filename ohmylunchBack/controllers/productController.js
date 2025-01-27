const Product = require('../models/Product');

// Obtenir tous les produits
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Ajouter un produit
const addProduct = async (req, res) => {
    const { category, img, title, text, price } = req.body;

    if (!category || !img || !title || !text || !price) {
        return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
    }

    try {
        const newProduct = new Product({ category, img, title, text, price });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Mettre à jour un produit
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Supprimer un produit
const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Produit supprimé' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

module.exports = { getProducts, addProduct, updateProduct, deleteProduct };
