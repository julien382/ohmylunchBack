const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User"); // Importation du modèle User

// Connexion à MongoDB
mongoose.connect("mongodb://localhost:27017/ohmylunch", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Création d'un utilisateur administrateur
const createUser = async () => {
  const hashedPassword = await bcrypt.hash("admin123", 10); // Hash du mot de passe
  const user = new User({ username: "admin", password: hashedPassword });
  await user.save();
  console.log("Utilisateur administrateur créé !");
  mongoose.disconnect();
};

createUser().catch((err) => {
  console.error(err);
  mongoose.disconnect();
});
