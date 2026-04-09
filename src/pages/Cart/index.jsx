import { useState } from "react";
import { useCart } from "../../store/cartContext";
import { Link } from "react-router-dom";
import { FiTrash2, FiShoppingCart, FiX } from "react-icons/fi";
import { createOrder } from "../../services/orderService"; // Asegúrate de tener este servicio

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } =
    useCart();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerAddress: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validar campos
    if (
      !formData.customerName ||
      !formData.customerEmail ||
      !formData.customerPhone ||
      !formData.customerAddress
    ) {
      setError("Por favor, completa todos los campos.");
      setLoading(false);
      return;
    }

    const orderData = {
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      customerAddress: formData.customerAddress,
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await createOrder(orderData);
      console.log("Pedido creado:", response);
      clearCart();
      setShowModal(false);
      alert("¡Pedido realizado con éxito! Te contactaremos pronto.");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
          "Error al crear el pedido. Intenta de nuevo.",
      );
    } finally {
      setLoading(false);
    }
  };

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
    <>
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
            <button onClick={() => setShowModal(true)} className="btn-primary">
              Hacer pedido
            </button>
          </div>
        </div>
      </div>

      {/* Modal para datos del cliente */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-fade-in">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <FiX size={24} />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Datos para el pedido
            </h2>
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  name="customerName"
                  required
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className="input-modern w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="customerEmail"
                  required
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  className="input-modern w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="customerPhone"
                  required
                  value={formData.customerPhone}
                  onChange={handleInputChange}
                  className="input-modern w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Dirección
                </label>
                <textarea
                  name="customerAddress"
                  required
                  rows="2"
                  value={formData.customerAddress}
                  onChange={handleInputChange}
                  className="input-modern w-full"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex justify-center items-center gap-2"
              >
                {loading ? "Enviando..." : "Confirmar pedido"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
