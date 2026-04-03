// src/pages/ProductList/index.jsx
import { useQuery } from "@tanstack/react-query";
import { getProducts, getCategories } from "../../services/productService";
import ProductCard from "../../components/product/ProductCard";
import ProductFiltersBar from "../../components/product/ProductFiltersBar";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Estado de filtros, inicializado desde los parámetros de URL
  const [filters, setFilters] = useState({
    categoryId: searchParams.get("categoria")
      ? parseInt(searchParams.get("categoria"))
      : null,
    search: searchParams.get("busqueda") || "",
    minPrice: searchParams.get("min")
      ? parseFloat(searchParams.get("min"))
      : undefined,
    maxPrice: searchParams.get("max")
      ? parseFloat(searchParams.get("max"))
      : undefined,
    size: searchParams.get("talla") || null,
    color: searchParams.get("color") || null,
  });

  // Sincronizar estado cuando cambian los parámetros URL (ej. desde el header)
  useEffect(() => {
    setFilters({
      categoryId: searchParams.get("categoria")
        ? parseInt(searchParams.get("categoria"))
        : null,
      search: searchParams.get("busqueda") || "",
      minPrice: searchParams.get("min")
        ? parseFloat(searchParams.get("min"))
        : undefined,
      maxPrice: searchParams.get("max")
        ? parseFloat(searchParams.get("max"))
        : undefined,
      size: searchParams.get("talla") || null,
      color: searchParams.get("color") || null,
    });
  }, [searchParams]);

  // Función para actualizar filtros y sincronizar URL
  const handleFilterChange = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);

    // Construir nuevos parámetros de URL
    const params = {};
    if (updatedFilters.categoryId) params.categoria = updatedFilters.categoryId;
    if (updatedFilters.search) params.busqueda = updatedFilters.search;
    if (updatedFilters.minPrice) params.min = updatedFilters.minPrice;
    if (updatedFilters.maxPrice) params.max = updatedFilters.maxPrice;
    if (updatedFilters.size) params.talla = updatedFilters.size;
    if (updatedFilters.color) params.color = updatedFilters.color;
    setSearchParams(params);
  };

  // Obtener productos con los filtros actuales
  const { data: products, isLoading } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
  });

  // Obtener categorías desde la API
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // Filtrar solo categorías que tienen al menos un producto
  const activeCategories =
    categories?.filter((cat) => cat._count?.products > 0) || [];

  if (isLoading)
    return (
      <div className="text-center py-12 text-gray-600">
        Cargando productos...
      </div>
    );

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Nuestros productos
      </h1>

      {/* Botones de categorías rápidas */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => handleFilterChange({ categoryId: null })}
          className={`px-4 py-2 rounded-full ${
            filters.categoryId === null
              ? "bg-denia-peach text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          } transition`}
        >
          Todos
        </button>
        {activeCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleFilterChange({ categoryId: cat.id })}
            className={`px-4 py-2 rounded-full ${
              filters.categoryId === cat.id
                ? "bg-denia-peach text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } transition`}
          >
            {cat.name}
            <span className="ml-1 text-xs opacity-75">
              ({cat._count.products})
            </span>
          </button>
        ))}
      </div>

      {/* Barra de filtros horizontal (precio, talla, color) */}
      <ProductFiltersBar
        filters={filters}
        onFilterChange={handleFilterChange}
        products={products} // pasamos productos para extraer tallas y colores dinámicamente
      />

      {/* Listado de productos */}
      {products?.length === 0 ? (
        <p className="text-center text-gray-600">
          No se encontraron productos.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
