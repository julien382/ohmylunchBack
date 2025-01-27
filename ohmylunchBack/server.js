const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const multer = require('multer');
const path = require('path');

dotenv.config();
connectDB();

const app = express();

// Configuration pour multer (gérer l'upload des fichiers)
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

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Sert les fichiers statiques comme les images depuis le dossier public

// Routes
app.use('/api/products', productRoutes);

// Route de test
app.get('/', (req, res) => {
    res.send('API en fonctionnement...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
