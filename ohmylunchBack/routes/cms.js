const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Exemple de route protégée pour CMS
router.get("/", authMiddleware, (req, res) => {
  res.json({ message: "Bienvenue dans l'espace CMS !" });
});

module.exports = router;
