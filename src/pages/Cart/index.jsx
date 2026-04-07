import { useCart } from "../../store/cartContext";
import { Link } from "react-router-dom";
import { FiTrash2, FiShoppingCart } from "react-icons/fi";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-16 animate-slide-up">
        <FiShoppingCart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Tu carrito está vacío
        </h2>
        <Link to="/productos" className="btn-primary inline-block">
          Seguir comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom py-8 animate-slide-up">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Carrito de compras
      </h1>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="p-4 flex flex-wrap items-center gap-4 hover:bg-denia-rose/20 transition-colors"
            >
              <img
                src={item.images?.[0] || "/images/placeholder.jpg"}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg shadow"
              />
              <div className="flex-1 min-w-0">
                <Link
                  to={`/producto/${item.id}`}
                  className="text-lg font-medium text-gray-800 hover:text-denia-peach transition-colors"
                >
                  {item.name}
                </Link>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                <button
                  onClick={() =>
                    updateQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                  className="px-2 py-1 text-gray-600 hover:text-denia-peach text-lg"
                >
                  -
                </button>
                <span className="w-8 text-center text-gray-800 font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 text-gray-600 hover:text-denia-peach text-lg"
                >
                  +
                </button>
              </div>
              <div className="text-right w-24 text-gray-800 font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 transition-colors p-2"
              >
                <FiTrash2 size={20} />
              </button>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 p-4 flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-800">Total:</span>
          <span className="text-2xl font-bold text-denia-peach-dark">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
        <div className="p-4 bg-white border-t border-gray-200 flex justify-end">
          <Link to="/checkout" className="btn-primary">
            Proceder al pago
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
