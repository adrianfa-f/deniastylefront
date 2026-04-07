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
      {/* Hero section con gradiente y patrón */}
      <section className="relative overflow-hidden bg-gradient-to-br from-denia-rose via-white to-denia-mint-light rounded-3xl my-8 p-8 md:p-12 text-center shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-denia-peach rounded-full opacity-10 blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-denia-mint rounded-full opacity-10 blur-3xl translate-y-1/2 -translate-x-1/3"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
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

      {/* Categorías */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
          Categorías
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {activeCategories.map((cat) => (
            <Link
              key={cat.id}
              to={`/productos?categoria=${cat.id}`}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 text-center transform hover:-translate-y-1"
            >
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-denia-mint-light to-denia-mint rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="text-3xl">👗</span>
              </div>
              <span className="text-gray-700 font-medium">{cat.name}</span>
              <span className="text-xs text-gray-500 block mt-1">
                ({cat._count.products})
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Productos destacados */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
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
