// src/pages/ProductDetail/index.jsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  getProductById,
  getSimilarProducts,
} from "../../services/productService";
import { useCart } from "../../store/cartContext";
import { useState } from "react";
import ProductCard from "../../components/product/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedAttributes, setSelectedAttributes] = useState({});

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  // Obtener productos similares usando el nuevo sistema
  const { data: similarProducts, isLoading: similarLoading } = useQuery({
    queryKey: ["similar", id],
    queryFn: () => getSimilarProducts(id, 6),
    enabled: !!product,
  });

  if (isLoading)
    return (
      <div className="text-center py-12 text-gray-600">
        Cargando producto...
      </div>
    );
  if (error)
    return (
      <div className="text-center py-12 text-red-600">
        Error al cargar el producto.
      </div>
    );

  // Agrupar atributos por nombre (para mostrar)
  const attributesMap = product.attributes.reduce((acc, attr) => {
    if (!acc[attr.name]) acc[attr.name] = [];
    if (!acc[attr.name].includes(attr.value)) acc[attr.name].push(attr.value);
    return acc;
  }, {});

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Imágenes */}
        <div>
          <img
            src={product.images[0] || "/images/placeholder.jpg"}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-4">
              {product.images.slice(1).map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt=""
                  className="w-20 h-20 object-cover rounded cursor-pointer"
                />
              ))}
            </div>
          )}
        </div>

        {/* Información */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {product.name}
          </h1>
          <p className="text-2xl font-semibold text-denia-peach-dark mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Atributos (incluye Material y Fabricante) */}
          {Object.entries(attributesMap).map(([name, values]) => (
            <div key={name} className="mb-4">
              <h3 className="font-semibold text-gray-800 mb-2">{name}:</h3>
              <div className="flex flex-wrap gap-2">
                {values.map((value) => (
                  <button
                    key={value}
                    onClick={() =>
                      setSelectedAttributes({
                        ...selectedAttributes,
                        [name]: value,
                      })
                    }
                    className={`px-3 py-1 rounded-full border ${
                      selectedAttributes[name] === value
                        ? "bg-denia-peach text-white border-denia-peach"
                        : "bg-white text-gray-700 border-gray-300 hover:border-denia-peach"
                    } transition`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-6">
            <button
              onClick={handleAddToCart}
              className="bg-denia-mint text-gray-800 px-6 py-3 rounded-full hover:bg-denia-mint-dark hover:text-white transition-colors w-full md:w-auto"
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>

      {/* Productos similares */}
      {!similarLoading && similarProducts && similarProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Productos similares
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {similarProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
