import { useState } from "react";
import { useCart } from "../../store/cartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simular envío
    console.log("Pedido:", {
      ...formData,
      items: cartItems,
      total: totalPrice,
    });
    clearCart();
    setSubmitted(true);
    setTimeout(() => navigate("/"), 3000);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="text-center py-16 animate-slide-up">
        <div className="bg-green-100 text-green-700 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          ¡Pedido enviado!
        </h2>
        <p className="text-gray-600">
          Gracias por tu compra. Te contactaremos pronto.
        </p>
      </div>
    );
  }

  return (
    <div className="container-custom py-8 animate-slide-up">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Finalizar pedido
      </h1>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Nombre completo
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="input-modern"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="input-modern"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Teléfono
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="input-modern"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Dirección
            </label>
            <textarea
              name="address"
              required
              rows="3"
              value={formData.address}
              onChange={handleChange}
              className="input-modern"
            ></textarea>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between text-lg font-semibold text-gray-800 mb-4">
              <span>Total a pagar:</span>
              <span className="text-denia-peach-dark">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`btn-primary w-full ${loading ? "opacity-75 cursor-not-allowed" : ""}`}
            >
              {loading ? "Procesando..." : "Confirmar pedido"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
