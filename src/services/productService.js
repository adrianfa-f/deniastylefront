import apiClient from "./apiClient";

// Obtener productos con filtros opcionales
export const getProducts = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.categoryId) params.append("categoryId", filters.categoryId);
  if (filters.search) params.append("search", filters.search);
  if (filters.minPrice !== undefined && filters.minPrice !== null)
    params.append("minPrice", filters.minPrice);
  if (filters.maxPrice !== undefined && filters.maxPrice !== null)
    params.append("maxPrice", filters.maxPrice);
  // Nota: talla y color no están implementados en el backend, se pueden añadir después.
  const response = await apiClient.get("/products", { params });
  return response.data;
};

// Obtener un producto por ID
export const getProductById = async (id) => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};

export const getCategories = async () => {
  const response = await apiClient.get("/categories");
  return response.data;
};

export const getSimilarProducts = async (productId, limit = 6) => {
  const allProducts = await getProducts({});
  const current = allProducts.find((p) => p.id === parseInt(productId));
  if (!current) return [];

  // Extraer atributos clave del producto actual
  const getAttrValue = (product, name) => {
    const attr = product.attributes.find((a) => a.name === name);
    return attr ? attr.value : null;
  };

  const currentCategory = current.categoryId;
  const currentMaterial = getAttrValue(current, "Material");
  const currentFabricante = getAttrValue(current, "Fabricante");
  const currentColor = getAttrValue(current, "Color");
  const currentPrice = current.price;

  // Calcular puntuación para cada producto
  const scored = allProducts
    .filter((p) => p.id !== current.id)
    .map((product) => {
      let score = 0;

      // 1. Categoría (peso alto)
      if (product.categoryId === currentCategory) score += 5;

      // 2. Material (peso medio)
      const productMaterial = getAttrValue(product, "Material");
      if (productMaterial && productMaterial === currentMaterial) score += 3;

      // 3. Fabricante (peso medio)
      const productFabricante = getAttrValue(product, "Fabricante");
      if (productFabricante && productFabricante === currentFabricante)
        score += 3;

      // 4. Color (peso bajo)
      const productColor = getAttrValue(product, "Color");
      if (productColor && productColor === currentColor) score += 2;

      // 5. Precio (diferencia menor, puntuación mayor)
      const priceDiff = Math.abs(product.price - currentPrice);
      const maxPrice = 200; // precios de ejemplo, ajustar según tus datos
      const priceScore = Math.max(0, 2 * (1 - priceDiff / maxPrice));
      score += priceScore;

      return { product, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.product);

  return scored;
};
