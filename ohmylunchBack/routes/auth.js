const express = require('express');
const { generateToken, verifyToken } = require('../utils/tokenGenerator');
const router = express.Router();

// Route de login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Vérification simple (sans cryptage, mais sécurisé avec un token)
  if (username === 'admin' && password === 'admin') {
    const token = generateToken({ username }); // Génère un token avec l'username
    return res.json({ token });
  } else {
    return res.status(400).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
  }
});

// Vérification du token
router.get('/verify', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Récupère le token dans l'en-tête Authorization

  if (!token) {
    return res.status(403).json({ message: 'Token manquant' });
  }

  try {
    const decoded = verifyToken(token); // Vérifie le token
    res.json({ message: 'Token vérifié avec succès', user: decoded });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

module.exports = router;
