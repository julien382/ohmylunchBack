import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './CMS.scss';

const CMS = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    category: 'entrees',
    img: null, // Gérer l'image comme un fichier
    title: '',
    text: '',
    price: '',
  });
  const [imagePreview, setImagePreview] = useState(null); // Prévisualisation de l'image
  const imgInputRef = useRef(null); // Référence pour l'input de l'image

  // Charger les produits
  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error("Erreur de chargement :", error));
  }, []);

  // Gérer les changements de formulaire
  const handleChange = (e) => {
    if (e.target.name === 'img') {
      const file = e.target.files[0];
      setForm({ ...form, img: file });
      setImagePreview(URL.createObjectURL(file)); // Prévisualiser l'image
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  // Ajouter un produit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('category', form.category);
    formData.append('img', form.img); // Ajouter l'image
    formData.append('title', form.title);
    formData.append('text', form.text);
    formData.append('price', form.price);

    try {
      // Envoi des données au serveur
      const response = await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Pour s'assurer que l'image est bien envoyée
        },
      });

      // Ajoute le produit avec l'image correctement retournée par le serveur
      setProducts([...products, response.data]); // Utilise la réponse qui contient l'URL de l'image
      setForm({ category: 'entrees', img: null, title: '', text: '', price: '' });
      setImagePreview(null); // Réinitialiser la prévisualisation

      // Réinitialiser le champ image
      if (imgInputRef.current) {
        imgInputRef.current.value = ''; // Vider l'input file
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit :', error);
    }
  };

  // Supprimer un produit
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  // Déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token"); // Supprimer le token
    navigate("/"); // Rediriger vers la page de connexion
  };

  // Filtrer les produits par catégorie
  const categories = ['entrees', 'plats', 'desserts'];

  return (
    <div className="cms-page">
      <div className='containerAdmin'>
        <h2>Admin</h2>
        <button onClick={handleLogout} className="logout-btn">
          Déconnexion
        </button>
      </div>
      <h2>Gestion de la Carte</h2>

      {/* Formulaire pour ajouter un produit */}
      <form onSubmit={handleSubmit}>
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="entrees">Entrées</option>
          <option value="plats">Plats</option>
          <option value="desserts">Desserts</option>
        </select>
        <input
          type="file"
          name="img"
          accept="image/*"
          onChange={handleChange}
          required
          ref={imgInputRef} // Référence pour l'input de l'image
        />
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Preview" />
          </div>
        )}
        <input
          type="text"
          name="title"
          placeholder="Titre"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="text"
          placeholder="Description"
          value={form.text}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="price"
          placeholder="Prix"
          value={form.price}
          onChange={handleChange}
          required
        />
        <button type="submit">Ajouter</button>
      </form>

      {/* Affichage des produits par catégorie */}
      {categories.map(category => {
        const filteredProducts = products.filter(product => product.category === category);
        return (
          filteredProducts.length > 0 && (
            <div className='menuCMS'>
              <div className='laCarteTypePlatsContainer' key={category}>
                <h3 className='laCarteTypePlats'>{category.toUpperCase()}</h3>
                <span className='laCarteTypePlatsBarre'></span>
                <div className='laCarteCards'>
                  {filteredProducts.map((product, index) => (
                    <div
                      key={product._id}
                      className="laCarteCard"
                      style={{ animationDelay: `${index * 0.1}s` }} // Animation delay
                    >
                      <img
                        src={`http://localhost:5000/${product.img}`} // URL de l'image
                        alt={product.title}
                        className="laCarteCardImage"
                      />
                      <div className="laCarteCardContent">
                        <div className='laCarteCardText'>
                          <h4>{product.title}</h4>
                          <p>{product.text}</p>
                        </div>
                        <div className="laCarteCardFooter">
                          <button className="delete-btn" onClick={() => handleDelete(product._id)}>Supprimer</button>
                          <p>{product.price}€</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};

export default CMS;
