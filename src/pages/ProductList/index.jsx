import { useQuery } from "@tanstack/react-query";
import { getProducts, getCategories } from "../../services/productService";
import ProductCard from "../../components/product/ProductCard";
import ProductFiltersBar from "../../components/product/ProductFiltersBar";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
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

  const handleFilterChange = (newFilters) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    const params = {};
    if (updated.categoryId) params.categoria = updated.categoryId;
    if (updated.search) params.busqueda = updated.search;
    if (updated.minPrice) params.min = updated.minPrice;
    if (updated.maxPrice) params.max = updated.maxPrice;
    if (updated.size) params.talla = updated.size;
    if (updated.color) params.color = updated.color;
    setSearchParams(params);
  };

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const activeCategories =
    categories?.filter((cat) => cat._count?.products > 0) || [];

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-denia-peach"></div>
      </div>
    );

  return (
    <div className="animate-slide-up">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
        Nuestros productos
      </h1>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button
          onClick={() => handleFilterChange({ categoryId: null })}
          className={`px-4 py-2 rounded-full transition-all ${!filters.categoryId ? "bg-denia-peach text-white shadow-md" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
        >
          Todos
        </button>
        {activeCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleFilterChange({ categoryId: cat.id })}
            className={`px-4 py-2 rounded-full transition-all ${filters.categoryId === cat.id ? "bg-denia-peach text-white shadow-md" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          >
            {cat.name}{" "}
            <span className="text-xs ml-1">({cat._count.products})</span>
          </button>
        ))}
      </div>

      <ProductFiltersBar
        filters={filters}
        onFilterChange={handleFilterChange}
        products={products}
      />

      {products?.length === 0 ? (
        <p className="text-center text-gray-500 py-12">
          No se encontraron productos.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
