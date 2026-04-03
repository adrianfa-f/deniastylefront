const ProductAttributes = ({ attributes }) => {
  if (!attributes || attributes.length === 0) return null;

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Características</h3>
      <ul className="space-y-1 text-sm">
        {attributes.map((attr, index) => (
          <li key={index}>
            <span className="font-medium">{attr.name}:</span> {attr.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductAttributes;
