const bcrypt = require('bcrypt');

// Créer un mot de passe crypté
const generatePassword = async () => {
  const password = "adminpassword";  // Le mot de passe en texte clair que tu veux crypter
  const saltRounds = 10;  // Nombre de tours de salage pour bcrypt
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log("Mot de passe crypté :", hashedPassword);
};

generatePassword();
