const Cookies = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Política de cookies
      </h1>
      <div className="prose prose-gray max-w-none text-gray-700">
        <p className="mb-4">
          Este sitio web utiliza cookies para mejorar la experiencia del
          usuario. A continuación, te explicamos qué son las cookies, cómo las
          utilizamos y cómo puedes gestionarlas.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          ¿Qué son las cookies?
        </h2>
        <p className="mb-4">
          Las cookies son pequeños archivos de texto que se almacenan en tu
          dispositivo cuando visitas un sitio web. Ayudan a recordar tus
          preferencias y a analizar el comportamiento de navegación.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Tipos de cookies que utilizamos
        </h2>
        <ul className="list-disc ml-6 mb-4">
          <li>
            Cookies técnicas: necesarias para el funcionamiento del sitio.
          </li>
          <li>
            Cookies de análisis: nos ayudan a entender cómo los usuarios
            interactúan con la web (Google Analytics).
          </li>
          <li>
            Cookies de preferencias: recuerdan tus ajustes (idioma, región,
            etc.).
          </li>
        </ul>
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Gestión de cookies
        </h2>
        <p className="mb-4">
          Puedes configurar tu navegador para bloquear o eliminar cookies. Sin
          embargo, esto podría afectar la funcionalidad del sitio.
        </p>
        <p className="mb-4">
          Para más información, consulta la ayuda de tu navegador.
        </p>
        <p className="mt-6 text-sm text-gray-500">
          Última actualización: marzo de 2025
        </p>
      </div>
    </div>
  );
};

export default Cookies;
