import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types"; // Importer PropTypes
import "./Login.scss";

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", form);
      const { token } = response.data;

      onLogin(token); // Appeler la méthode onLogin pour mettre à jour l'état global
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Connexion Admin</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

// Validation des props
Login.propTypes = {
  onLogin: PropTypes.func.isRequired, // Déclare que onLogin est une fonction requise
};

export default Login;
