import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/Static/About";
import Contact from "./pages/Static/Contact";
import Terms from "./pages/Static/Terms";
import Privacy from "./pages/Static/Privacy";
import Cookies from "./pages/Static/Cookies";
import Returns from "./pages/Static/Returns";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="productos" element={<ProductList />} />
          <Route path="producto/:id" element={<ProductDetail />} />
          <Route path="carrito" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="sobre-nosotros" element={<About />} />
          <Route path="contacto" element={<Contact />} />
          {/* Páginas legales */}
          <Route path="terminos" element={<Terms />} />
          <Route path="privacidad" element={<Privacy />} />
          <Route path="cookies" element={<Cookies />} />
          <Route path="devoluciones" element={<Returns />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
