import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiSearch, FiShoppingCart, FiMenu, FiX, FiMail } from "react-icons/fi";
import logo from "../assets/logo.jpg";
import { useCart } from "../store/cartContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useCart();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/productos?busqueda=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-denia-mint-light">
      <div className="container-custom py-3">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img
              src={logo}
              alt="Denia Style"
              className="h-10 w-auto rounded-full"
            />
            <span className="hidden sm:inline text-xl font-bold bg-gradient-to-r from-denia-peach to-denia-peach-dark bg-clip-text text-transparent">
              Denia Style
            </span>
          </Link>

          <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-auto">
            <div className="relative group">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-modern pl-4 pr-10 py-2 rounded-full border-denia-mint-light focus:border-denia-peach"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-denia-peach transition-colors"
              >
                <FiSearch size={20} />
              </button>
            </div>
          </form>

          <div className="flex items-center gap-4 shrink-0">
            <Link
              to="/contacto"
              className="text-gray-600 hover:text-denia-peach transition-colors hidden sm:block"
            >
              <FiMail size={24} />
            </Link>
            <Link
              to="/carrito"
              className="relative text-gray-600 hover:text-denia-peach transition-colors"
            >
              <FiShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-denia-peach text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse-slow">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              className="sm:hidden text-gray-600 hover:text-denia-peach"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="sm:hidden mt-4 py-4 border-t border-denia-mint-light animate-fade-in">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className="px-4 py-2 text-gray-700 hover:bg-denia-mint-light rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                to="/productos"
                className="px-4 py-2 text-gray-700 hover:bg-denia-mint-light rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Productos
              </Link>
              <Link
                to="/sobre-nosotros"
                className="px-4 py-2 text-gray-700 hover:bg-denia-mint-light rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre nosotros
              </Link>
              <Link
                to="/contacto"
                className="px-4 py-2 text-gray-700 hover:bg-denia-mint-light rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
