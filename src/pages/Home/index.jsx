import { useQuery } from "@tanstack/react-query";
import { getProducts, getCategories } from "../../services/productService";
import ProductCard from "../../components/product/ProductCard";
import { Link } from "react-router-dom";

const Home = () => {
  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const featuredProducts = products?.filter((p) => p.destacado) || [];
  const activeCategories =
    categories?.filter((cat) => cat._count?.products > 0) || [];

  if (productsLoading || categoriesLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-denia-peach"></div>
      </div>
    );

  return (
    <div className="animate-slide-up">
      {/* Hero section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-denia-rose via-white to-denia-mint-light rounded-3xl my-8 p-8 md:p-12 text-center shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-denia-peach rounded-full opacity-10 blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-denia-mint rounded-full opacity-10 blur-3xl translate-y-1/2 -translate-x-1/3"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 font-playfair">
            Denia Style
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Descubre las últimas tendencias en moda femenina. Calidad y estilo
            para cada ocasión.
          </p>
          <Link
            to="/productos"
            className="btn-primary inline-flex items-center gap-2"
          >
            Ver colección
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* Categorías - Versión mejorada */}
      <section className="mb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center font-playfair">
          Categorías
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
          {activeCategories.map((cat) => (
            <Link
              key={cat.id}
              to={`/productos?categoria=${cat.id}`}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-5 text-center transform hover:-translate-y-2"
            >
              <div className="w-28 h-28 mx-auto bg-gradient-to-br from-denia-mint-light to-denia-mint rounded-full flex items-center justify-center mb-4 overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                <img
                  src={`/images/categorias/${cat.slug}.jpg`}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/categorias/default.jpg";
                  }}
                />
              </div>
              <span className="text-gray-800 font-semibold text-lg group-hover:text-denia-peach transition-colors duration-300">
                {cat.name}
              </span>
              <span className="text-sm text-gray-500 block mt-1">
                ({cat._count.products} productos)
              </span>
              <div className="absolute inset-0 rounded-2xl border-2 border-denia-peach opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </Link>
          ))}
        </div>
      </section>

      {/* Productos destacados */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center font-playfair">
          Productos destacados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
