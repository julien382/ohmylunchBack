import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import MainPage from "./pages/MainPage/MainPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import CartPage from "./pages/CartPage/CartPage";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
import CMSPage from "./pages/CMSPage/CMSPage";  // Importation de la page CMS

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  const location = useLocation(); 

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [location.pathname]);

  return (
    <div id="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/Panier" element={<CartPage />} />
          <Route path="/Histoire" element={<HistoryPage />} />
          <Route path="/admin" element={<CMSPage />} />  {/* Ajout de la route pour le CMS */}
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
