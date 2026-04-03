import { useState, useEffect } from "react";

const ProductFiltersBar = ({ filters, onFilterChange, products }) => {
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [tempMin, setTempMin] = useState("");
  const [tempMax, setTempMax] = useState("");

  useEffect(() => {
    if (products && products.length) {
      // Extraer tallas únicas de los productos (atributo Talla)
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

  const handleSizeChange = (e) => {
    const size = e.target.value;
    onFilterChange({ size: size || null });
  };

  const handleColorChange = (e) => {
    const color = e.target.value;
    onFilterChange({ color: color || null });
  };

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
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Mín"
              value={tempMin}
              onChange={(e) => setTempMin(e.target.value)}
              className="w-full px-2 py-1 border rounded"
            />
            <span className="self-center">-</span>
            <input
              type="number"
              placeholder="Máx"
              value={tempMax}
              onChange={(e) => setTempMax(e.target.value)}
              className="w-full px-2 py-1 border rounded"
            />
            <button
              onClick={handlePriceApply}
              className="bg-denia-mint text-gray-800 px-3 py-1 rounded hover:bg-denia-mint-dark"
            >
              Aplicar
            </button>
          </div>
        </div>

        <div className="min-w-[120px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Talla
          </label>
          <select
            value={filters.size || ""}
            onChange={handleSizeChange}
            className="w-full px-2 py-1 border rounded bg-white"
          >
            <option value="">Todas</option>
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-[120px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Color
          </label>
          <select
            value={filters.color || ""}
            onChange={handleColorChange}
            className="w-full px-2 py-1 border rounded bg-white"
          >
            <option value="">Todos</option>
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={clearFilters}
          className="bg-gray-200 text-gray-700 px-4 py-1 rounded hover:bg-gray-300"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
};

export default ProductFiltersBar;
