// src/pages/Home/index.jsx
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
  // Filtramos solo categorías con productos (incluyendo subcategorías)
  const activeCategories =
    categories?.filter((cat) => cat._count.products > 0) || [];

  if (productsLoading || categoriesLoading) return <div>Cargando...</div>;

  return (
    <div>
      {/* Hero section */}
      <section className="bg-gradient-to-r from-denia-rose to-denia-mint-light rounded-2xl p-8 mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Denia Style
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Descubre las últimas tendencias en moda femenina
        </p>
        <Link
          to="/productos"
          className="inline-block bg-denia-peach text-white px-6 py-3 rounded-full hover:bg-denia-peach-dark transition-colors"
        >
          Ver colección
        </Link>
      </section>

      {/* Categorías principales */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Categorías</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {activeCategories.map((cat) => (
            <Link
              key={cat.id}
              to={`/productos?categoria=${cat.id}`}
              className="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition"
            >
              <div className="w-16 h-16 mx-auto bg-denia-mint-light rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl">👗</span>
              </div>
              <span className="text-gray-700 font-medium">{cat.name}</span>
              <span className="text-xs text-gray-500 block">
                ({cat._count.products})
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Productos destacados */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
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
