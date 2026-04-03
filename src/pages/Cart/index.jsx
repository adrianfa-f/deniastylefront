import { useCart } from "../../store/cartContext";
import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Tu carrito está vacío
        </h2>
        <Link to="/productos" className="text-denia-peach hover:underline">
          Seguir comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Carrito de compras
      </h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-200">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="p-4 flex flex-wrap items-center gap-4"
            >
              <img
                src={item.images[0] || "/images/placeholder.jpg"}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1 min-w-0">
                <Link
                  to={`/producto/${item.id}`}
                  className="text-lg font-medium text-gray-800 hover:text-denia-peach"
                >
                  {item.name}
                </Link>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    updateQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                  className="px-2 py-1 border rounded text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="w-8 text-center text-gray-800">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 border rounded text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <div className="text-right w-24 text-gray-800">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
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
          <Link
            to="/checkout"
            className="bg-denia-mint text-gray-800 px-6 py-2 rounded-full hover:bg-denia-mint-dark hover:text-white transition-colors"
          >
            Proceder al pago
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
