// controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET, // Assure-toi que tu as une clé secrète dans ton .env
      { expiresIn: "2h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne." });
  }
};

const verifyToken = (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "Token manquant." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token invalide." });
    }

    res.status(200).json({ message: "Token valide." });
  });
};

module.exports = { login, verifyToken };
