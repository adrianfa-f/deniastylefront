import { Link } from "react-router-dom";
import { useCart } from "../../store/cartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/producto/${product.id}`}>
        <img
          src={product.images[0] || "/images/placeholder.jpg"}
          alt={product.name}
          className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
        />
      </Link>
      <div className="p-4">
        <Link to={`/producto/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-denia-peach mb-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-denia-peach-dark">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-denia-mint text-gray-800 px-3 py-1 rounded-full hover:bg-denia-mint-dark hover:text-white transition-colors text-sm"
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
