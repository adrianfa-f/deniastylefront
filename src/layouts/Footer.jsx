import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-denia-mint-dark to-denia-mint text-white mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Denia Style</h3>
            <p className="text-sm opacity-90">
              Moda femenina con estilo y calidad. Encuentra las últimas
              tendencias.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/productos" className="hover:underline">
                  Productos
                </Link>
              </li>
              <li>
                <Link to="/sobre-nosotros" className="hover:underline">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:underline">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Información legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/terminos" className="hover:underline">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link to="/privacidad" className="hover:underline">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:underline">
                  Política de cookies
                </Link>
              </li>
              <li>
                <Link to="/devoluciones" className="hover:underline">
                  Devoluciones
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <p className="text-sm">Email: info@deniastyle.com</p>
            <p className="text-sm">Tel: +34 123 456 789</p>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm opacity-80">
          © 2025 Denia Style. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
