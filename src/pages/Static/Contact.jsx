// src/pages/Static/Contact.jsx
import { useState } from "react";
import { FaWhatsapp, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría el envío real (por ejemplo, EmailJS)
    console.log("Mensaje enviado:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Contacto</h1>

      {/* Enlaces a redes sociales */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Conéctate con nosotros
        </h2>
        <div className="flex flex-wrap gap-6 justify-center md:justify-start">
          <a
            href="https://wa.me/34123456789?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-green-600 hover:text-green-800 transition"
          >
            <FaWhatsapp size={28} />
            <span className="text-lg">WhatsApp</span>
          </a>
          <a
            href="https://facebook.com/deniastyle"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
          >
            <FaFacebook size={28} />
            <span className="text-lg">Facebook</span>
          </a>
          <a
            href="https://instagram.com/deniastyle"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-pink-600 hover:text-pink-800 transition"
          >
            <FaInstagram size={28} />
            <span className="text-lg">Instagram</span>
          </a>
          <a
            href="https://twitter.com/deniastyle"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition"
          >
            <FaTwitter size={28} />
            <span className="text-lg">X (Twitter)</span>
          </a>
        </div>
      </div>

      {/* Formulario de contacto (opcional) */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Envíanos un mensaje
        </h2>
        {submitted && (
          <div className="bg-denia-mint-light text-gray-800 p-4 rounded mb-4">
            ¡Mensaje enviado! Te responderemos pronto.
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Nombre</label>
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
            <label className="block text-gray-700 mb-1">Mensaje</label>
            <textarea
              name="message"
              required
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-denia-peach"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-denia-mint text-gray-800 py-2 rounded-full hover:bg-denia-mint-dark hover:text-white transition-colors"
          >
            Enviar mensaje
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
