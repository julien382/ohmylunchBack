import './LaCarte.scss';
import LaCarteCard from '../LaCarteCard/LaCarteCard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const LaCarte = () => {
  const [menu, setMenu] = useState({ entrees: [], plats: [], desserts: [] });
  const [panier, setPanier] = useState({ entrees: [], plats: [], desserts: [] });

  // Fonction pour récupérer les données depuis l'API
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        const products = response.data;

        // Regrouper les plats en fonction de leur catégorie
        const entrees = products.filter(item => item.category === 'entrees');
        const plats = products.filter(item => item.category === 'plats');
        const desserts = products.filter(item => item.category === 'desserts');

        setMenu({ entrees, plats, desserts });
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    };

    fetchMenu();
  }, []);

  // Fonction pour ajouter ou supprimer un élément du panier
  const togglePanier = (card, category) => {
    setPanier((prevPanier) => {
      const updatedCategory = prevPanier[category].some(item => item._id === card._id)
        ? prevPanier[category].filter(item => item._id !== card._id) // Si déjà dans le panier, retirer
        : [...prevPanier[category], card]; // Sinon, ajouter

      // Retourne le panier mis à jour sans affecter les autres catégories
      const updatedPanier = {
        ...prevPanier,
        [category]: updatedCategory,
      };

      // Sauvegarder le panier mis à jour dans le localStorage
      localStorage.setItem('panier', JSON.stringify(updatedPanier));

      return updatedPanier;
    });
  };

  // Charger le panier depuis le localStorage au démarrage
  useEffect(() => {
    const savedPanier = JSON.parse(localStorage.getItem('panier'));
    if (savedPanier) {
      setPanier(savedPanier);
    }
  }, []);

  return (
    <div className='laCarte'>
      <h2 className='laCarteTitle'>La Carte</h2>

      {/* Section Entrées */}
      {menu.entrees.length > 0 && (
        <div className='laCarteTypePlatsContainer'>
          <h3 className='laCarteTypePlats'>ENTRÉES</h3>
          <span className='laCarteTypePlatsBarre'></span>
          <div className='laCarteCards'>
            {menu.entrees.map((card) => {
              const isFavorite = panier.entrees.some(item => item._id === card._id);
              return (
                <LaCarteCard
                  key={card._id}
                  img={`http://localhost:5000/${card.img}`}
                  title={card.title}
                  text={card.text}
                  price={card.price}
                  isFavorite={isFavorite}
                  onToggleFavorite={() => togglePanier(card, 'entrees')}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Section Plats */}
      {menu.plats.length > 0 && (
        <div className='laCarteTypePlatsContainer'>
          <h3 className='laCarteTypePlats'>PLATS</h3>
          <span className='laCarteTypePlatsBarre'></span>
          <div className='laCarteCards'>
            {menu.plats.map((card) => {
              const isFavorite = panier.plats.some(item => item._id === card._id);
              return (
                <LaCarteCard
                  key={card._id}
                  img={`http://localhost:5000/${card.img}`}
                  title={card.title}
                  text={card.text}
                  price={card.price}
                  isFavorite={isFavorite}
                  onToggleFavorite={() => togglePanier(card, 'plats')}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Section Desserts */}
      {menu.desserts.length > 0 && (
        <div className='laCarteTypePlatsContainer'>
          <h3 className='laCarteTypePlats'>DESSERTS</h3>
          <span className='laCarteTypePlatsBarre'></span>
          <div className='laCarteCards'>
            {menu.desserts.map((card) => {
              const isFavorite = panier.desserts.some(item => item._id === card._id);
              return (
                <LaCarteCard
                  key={card._id}
                  img={`http://localhost:5000/${card.img}`}
                  title={card.title}
                  text={card.text}
                  price={card.price}
                  isFavorite={isFavorite}
                  onToggleFavorite={() => togglePanier(card, 'desserts')}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Lien vers la page Panier */}
      <Link 
        to={{
          pathname: "/panier",
          state: { panier },  // Passer le panier à la page Panier
        }} 
        className='buttonCommander'
      >
        <p>Commander</p>
      </Link>
    </div>
  );
};

export default LaCarte;
