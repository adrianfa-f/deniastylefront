import { Link } from "react-router-dom";
import { useCart } from "../../store/cartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
      {product.destacado && (
        <span className="absolute top-3 left-3 z-10 bg-denia-peach text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
          Destacado
        </span>
      )}
      <Link to={`/producto/${product.id}`}>
        <div className="overflow-hidden relative">
          <img
            src={product.images?.[0] || "/images/placeholder.jpg"}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-denia-peach transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">
            {product.description}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xl font-bold text-denia-peach-dark">
              ${product.price.toFixed(2)}
            </span>
            <button
              onClick={handleAddToCart}
              className="bg-denia-mint text-gray-800 px-4 py-2 rounded-full hover:bg-denia-mint-dark hover:text-white transition-all text-sm font-medium shadow-md hover:shadow-lg"
            >
              Añadir
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
