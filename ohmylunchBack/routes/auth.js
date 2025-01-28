const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Route de login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Vérification simple sans cryptage
  if (username === 'admin' && password === 'admin') {
    const token = jwt.sign({ username: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  } else {
    return res.status(400).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
  }
});

// Vérification du token
router.get('/verify', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token manquant' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token invalide ou expiré' });
    }

    res.json({ message: 'Token vérifié avec succès', user: decoded });
  });
});

module.exports = router;
