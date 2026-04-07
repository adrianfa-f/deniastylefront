import { useState, useEffect } from "react";

const ProductFiltersBar = ({ filters, onFilterChange, products }) => {
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [tempMin, setTempMin] = useState("");
  const [tempMax, setTempMax] = useState("");

  useEffect(() => {
    if (products && products.length) {
      const sizeSet = new Set();
      const colorSet = new Set();
      products.forEach((product) => {
        product.attributes?.forEach((attr) => {
          if (attr.name === "Talla") sizeSet.add(attr.value);
          if (attr.name === "Color") colorSet.add(attr.value);
        });
      });
      setSizes(Array.from(sizeSet).sort());
      setColors(Array.from(colorSet).sort());
    }
  }, [products]);

  const handleSizeChange = (e) =>
    onFilterChange({ size: e.target.value || null });
  const handleColorChange = (e) =>
    onFilterChange({ color: e.target.value || null });

  const handlePriceApply = () => {
    const min = tempMin !== "" ? parseFloat(tempMin) : undefined;
    const max = tempMax !== "" ? parseFloat(tempMax) : undefined;
    onFilterChange({ minPrice: min, maxPrice: max });
  };

  const clearFilters = () => {
    onFilterChange({
      categoryId: null,
      search: "",
      minPrice: undefined,
      maxPrice: undefined,
      size: null,
      color: null,
    });
    setTempMin("");
    setTempMax("");
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-md p-4 mb-6 border border-denia-mint-light">
      <div className="flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[160px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Mín"
              value={tempMin}
              onChange={(e) => setTempMin(e.target.value)}
              className="input-modern w-full py-2 px-3 rounded-lg"
            />
            <span className="self-center text-gray-500">-</span>
            <input
              type="number"
              placeholder="Máx"
              value={tempMax}
              onChange={(e) => setTempMax(e.target.value)}
              className="input-modern w-full py-2 px-3 rounded-lg"
            />
            <button
              onClick={handlePriceApply}
              className="btn-secondary py-2 px-4 text-sm"
            >
              Aplicar
            </button>
          </div>
        </div>
        {sizes.length > 0 && (
          <div className="min-w-[120px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Talla
            </label>
            <select
              value={filters.size || ""}
              onChange={handleSizeChange}
              className="input-modern py-2 px-3 rounded-lg"
            >
              <option value="">Todas</option>
              {sizes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        )}
        {colors.length > 0 && (
          <div className="min-w-[120px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <select
              value={filters.color || ""}
              onChange={handleColorChange}
              className="input-modern py-2 px-3 rounded-lg"
            >
              <option value="">Todos</option>
              {colors.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        )}
        <button
          onClick={clearFilters}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
};

export default ProductFiltersBar;
