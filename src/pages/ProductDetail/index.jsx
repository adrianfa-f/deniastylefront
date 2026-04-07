import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById, getProducts } from "../../services/productService";
import { useCart } from "../../store/cartContext";
import { useState } from "react";
import ProductCard from "../../components/product/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [selectedImage, setSelectedImage] = useState("");

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  const { data: relatedProducts } = useQuery({
    queryKey: ["related", product?.categoryId],
    queryFn: () => getProducts({ categoryId: product?.categoryId }),
    enabled: !!product,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-denia-peach"></div>
      </div>
    );
  if (error)
    return (
      <div className="text-center py-12 text-red-500">
        Error al cargar el producto.
      </div>
    );

  const related =
    relatedProducts?.filter((p) => p.id !== product.id).slice(0, 6) || [];

  const attributesMap =
    product.attributes?.reduce((acc, attr) => {
      if (!acc[attr.name]) acc[attr.name] = [];
      if (!acc[attr.name].includes(attr.value)) acc[attr.name].push(attr.value);
      return acc;
    }, {}) || {};

  const handleAddToCart = () => addToCart(product, 1);

  const imageList = product.images || [];
  const defaultImage = imageList[0] || "/images/placeholder.jpg";
  const mainImage = selectedImage || defaultImage;

  return (
    <div className="container-custom py-8 animate-slide-up">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>
          {imageList.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {imageList.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${mainImage === img ? "border-denia-peach shadow-md" : "border-transparent"}`}
                >
                  <img
                    src={img}
                    alt={`Vista ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="lg:w-1/2">
          {product.destacado && (
            <span className="inline-block bg-denia-peach text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
              Destacado
            </span>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            {product.name}
          </h1>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold text-denia-peach-dark">
              ${product.price.toFixed(2)}
            </span>
            {product.stock > 0 ? (
              <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                En stock
              </span>
            ) : (
              <span className="text-sm text-red-600 bg-red-100 px-2 py-1 rounded-full">
                Agotado
              </span>
            )}
          </div>
          <p className="text-gray-700 mb-6 leading-relaxed">
            {product.description}
          </p>
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
                    className={`px-3 py-1 rounded-full border transition-all ${selectedAttributes[name] === value ? "bg-denia-peach text-white border-denia-peach shadow-sm" : "bg-white text-gray-700 border-gray-300 hover:border-denia-peach"}`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div className="mt-8">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full md:w-auto px-8 py-3 rounded-full text-white font-bold transition-all ${product.stock === 0 ? "bg-gray-400 cursor-not-allowed" : "btn-primary"}`}
            >
              {product.stock === 0 ? "Agotado" : "Añadir al carrito"}
            </button>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-denia-peach pl-3">
            Productos relacionados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {related.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
