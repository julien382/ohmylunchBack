import './Cart.scss';
import serveurClient from '../../assets/img/serveurClient.jpg';
import { useLocation } from 'react-router-dom';
import LaCarteCard from '../LaCarteCard/LaCarteCard';
import { useState, useEffect } from 'react';

const Cart = () => {
  const location = useLocation();
  const [panier, setPanier] = useState(location.state?.panier || JSON.parse(localStorage.getItem('panier')) || { entrees: [], plats: [], desserts: [] });

  // Fonction pour ajouter ou supprimer un élément du panier
  const togglePanier = (card, category) => {
    setPanier((prevPanier) => {
      const updatedCategory = prevPanier[category].some(item => item._id === card._id)
        ? prevPanier[category].filter(item => item._id !== card._id) // Si déjà dans le panier, supprimer
        : [...prevPanier[category], card]; // Sinon, ajouter

      // Retourne le panier mis à jour sans affecter les autres catégories
      const updatedPanier = {
        ...prevPanier,
        [category]: updatedCategory,
      };

      // Sauvegarder le panier mis à jour dans localStorage
      localStorage.setItem('panier', JSON.stringify(updatedPanier));

      return updatedPanier;
    });
  };

  // Trier les éléments du panier par ID
  const sortedPanier = {
    entrees: [...panier.entrees].sort((a, b) => a._id - b._id),  // Assure-toi que _id est utilisé ici
    plats: [...panier.plats].sort((a, b) => a._id - b._id),
    desserts: [...panier.desserts].sort((a, b) => a._id - b._id),
  };

  console.log(localStorage);
  
  // Log du panier dans le localStorage pour déboguer
  useEffect(() => {
    localStorage.setItem('panier', JSON.stringify(panier));  // Sauvegarder le panier dans localStorage
  }, [panier]);

  return (
    <div className='cartContainer'>
      <img src={serveurClient} alt='serveurClient' className='cartImage' />
      
      <div className='cart'>
        <h2 className='cartTitle'>Panier</h2>

        {sortedPanier.entrees.length === 0 && sortedPanier.plats.length === 0 && sortedPanier.desserts.length === 0 ? (
          <p>Votre panier est vide.</p>
        ) : (
          <>
            {/* Section Entrées */}
            {sortedPanier.entrees.length > 0 && (
              <div className='panierSection'>
                <h3 className='sectionTitle'>ENTREES</h3>
                <div className='sectionTitleBar'></div>  {/* Barre sous le titre */}
                <div className='laCarteCards'>
                  {sortedPanier.entrees.map((item) => (
                    <LaCarteCard
                      key={item._id}  // Utiliser _id ici
                      img={`http://localhost:5000/${item.img}`}
                      title={item.title}
                      text={item.text}
                      price={item.price}
                      isFavorite={true}
                      onToggleFavorite={() => togglePanier(item, 'entrees')}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Section Plats */}
            {sortedPanier.plats.length > 0 && (
              <div className='panierSection'>
                <h3 className='sectionTitle'>PLATS</h3>
                <div className='sectionTitleBar'></div>  {/* Barre sous le titre */}
                <div className='laCarteCards'>
                  {sortedPanier.plats.map((item) => (
                    <LaCarteCard
                      key={item._id}  // Utiliser _id ici
                      img={`http://localhost:5000/${item.img}`}
                      title={item.title}
                      text={item.text}
                      price={item.price}
                      isFavorite={true}
                      onToggleFavorite={() => togglePanier(item, 'plats')}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Section Desserts */}
            {sortedPanier.desserts.length > 0 && (
              <div className='panierSection'>
                <h3 className='sectionTitle'>DESSERTS</h3>
                <div className='sectionTitleBar'></div>  {/* Barre sous le titre */}
                <div className='laCarteCards'>
                  {sortedPanier.desserts.map((item) => (
                    <LaCarteCard
                      key={item._id}  // Utiliser _id ici
                      img={`http://localhost:5000/${item.img}`}
                      title={item.title}
                      text={item.text}
                      price={item.price}
                      isFavorite={true}
                      onToggleFavorite={() => togglePanier(item, 'desserts')}
                    />
                  ))}
                </div>
              </div>
            )}

            <p className='serverReminder'>Présentez cette liste au serveur pour finaliser votre commande.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
