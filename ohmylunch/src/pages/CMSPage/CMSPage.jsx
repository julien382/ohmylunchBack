import { useState, useEffect } from "react";
import axios from "axios";
import CMS from "../../components/CMS/CMS";
import Login from "../../components/Login/Login";
import "./CMSPage.scss";

const CMSPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]); // État pour les produits

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          await axios.get("http://localhost:5000/api/auth/verify", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Token invalide ou expiré :", error);
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };

    // Charger les produits si authentifié
    if (isAuthenticated) {
      axios.get("http://localhost:5000/api/products")
        .then(response => {
          setProducts(response.data); // Mettre à jour les produits
        })
        .catch(error => {
          console.error("Erreur lors du chargement des produits", error);
        });
    }

    checkAuth();
  }, [isAuthenticated]); // Recharger les produits lorsque l'authentification change

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  if (loading) {
    return <div>Vérification en cours...</div>;
  }

  return (
    <div>
      {isAuthenticated ? (
        <CMS products={products} /> // Passer les produits au composant CMS
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default CMSPage;
