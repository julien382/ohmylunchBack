const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Récupérer le token du header

  if (!token) {
    return res.status(403).json({ message: "Token manquant." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token invalide." });
    }

    req.user = decoded; // Ajoute les infos utilisateur à la requête
    next(); // Continue l'exécution de la route suivante
  });
};

module.exports = authMiddleware;
