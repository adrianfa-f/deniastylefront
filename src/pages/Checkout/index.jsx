import { useState } from "react";
import { useCart } from "../../store/cartContext";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../services/orderService";

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
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Preparar datos para la API
    const orderData = {
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      customerAddress: formData.address,
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      // Llamar a la API para crear el pedido
      const order = await createOrder(orderData);
      console.log("Pedido creado:", order);

      // Opcional: abrir WhatsApp con los detalles
      const itemsList = cartItems
        .map(
          (item) =>
            `- ${item.name} (ID: ${item.id}) - Cantidad: ${item.quantity} - Precio: $${(item.price * item.quantity).toFixed(2)}`,
        )
        .join("\n");
      const message = `*NUEVO PEDIDO*\n\nCliente: ${formData.name}\nEmail: ${formData.email}\nTeléfono: ${formData.phone}\nDirección: ${formData.address}\n\n*Productos:*\n${itemsList}\n\n*Total:* $${totalPrice.toFixed(2)}`;
      const encodedMessage = encodeURIComponent(message);
      const phoneNumber = "34123456789"; // Reemplazar con número real
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank");

      clearCart();
      setSubmitted(true);
      setTimeout(() => navigate("/"), 5000);
    } catch (err) {
      console.error("Error al crear pedido:", err);
      setError(
        err.response?.data?.error ||
          "Error al procesar el pedido. Intenta de nuevo.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          ¡Pedido enviado!
        </h2>
        <p className="text-gray-600 mb-4">
          Gracias por tu compra. Se ha abierto WhatsApp para que confirmes el
          envío del mensaje.
        </p>
        <p className="text-gray-600">
          También hemos enviado una copia a tu correo. Te contactaremos pronto.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Finalizar pedido
      </h1>
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>
      )}
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Nombre completo</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-denia-peach"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-denia-peach"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Teléfono</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-denia-peach"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Dirección</label>
            <textarea
              name="address"
              required
              rows="3"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-denia-peach"
            />
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
              className={`w-full bg-denia-mint text-gray-800 py-3 rounded-full hover:bg-denia-mint-dark hover:text-white transition-colors ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
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
