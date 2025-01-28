import './LaCarteCard.scss';
import PropTypes from 'prop-types';

const LaCarteCard = ({ img, title, text, price, onToggleFavorite, isFavorite }) => {
    const toggleFavorite = (e) => {
        e.stopPropagation(); // Empêcher la propagation du clic
        // Appeler la fonction pour ajouter ou supprimer du panier
        onToggleFavorite({ title, text, price, img });
    };

    return (
        <div className='laCarteCard' onClick={toggleFavorite}>
            <img src={img} alt={title} className='laCarteCardImage' /> {/* Utilisation de la prop img ici */}
            <div className='laCarteCardContent'>
                <div className='laCarteCardText'>
                    <h4>{title}</h4>
                    <p>{text}</p>
                </div>
                <div className='laCarteCardFooter'>
                    <svg
                        className={`heartIcon ${isFavorite ? 'filled' : ''}`} // Utilisation de la prop isFavorite
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        />
                    </svg>
                    <p>{price}€</p>
                </div>
            </div>
        </div>
    );
};

LaCarteCard.propTypes = {
    img: PropTypes.string.isRequired, // La prop img est maintenant obligatoire
    title: PropTypes.string.isRequired,
    text: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onToggleFavorite: PropTypes.func.isRequired,
    isFavorite: PropTypes.bool.isRequired, // Prop pour l'état favori
};

export default LaCarteCard;