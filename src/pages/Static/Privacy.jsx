const Privacy = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Política de privacidad
      </h1>
      <div className="prose prose-gray max-w-none text-gray-700">
        <p className="mb-4">
          En Denia Style nos tomamos muy en serio la privacidad de nuestros
          usuarios. Esta política explica cómo recopilamos, usamos y protegemos
          tu información personal.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Información que recopilamos
        </h2>
        <p className="mb-4">
          Podemos recopilar datos personales como nombre, dirección de correo
          electrónico, teléfono y dirección de envío cuando realizas un pedido o
          te pones en contacto con nosotros.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Uso de la información
        </h2>
        <p className="mb-4">
          Utilizamos tu información para procesar pedidos, comunicarnos contigo
          y mejorar nuestros servicios. No compartiremos tus datos con terceros
          sin tu consentimiento, excepto cuando sea necesario para cumplir con
          la ley.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Seguridad
        </h2>
        <p className="mb-4">
          Implementamos medidas de seguridad para proteger tu información, pero
          ningún sistema es 100% seguro. Te recomendamos mantener seguros tus
          datos de acceso.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Tus derechos
        </h2>
        <p className="mb-4">
          Puedes solicitar acceso, rectificación o eliminación de tus datos
          personales escribiéndonos a{" "}
          <a
            href="mailto:info@deniastyle.com"
            className="text-denia-peach hover:underline"
          >
            info@deniastyle.com
          </a>
          .
        </p>
        <p className="mt-6 text-sm text-gray-500">
          Última actualización: marzo de 2025
        </p>
      </div>
    </div>
  );
};

export default Privacy;
