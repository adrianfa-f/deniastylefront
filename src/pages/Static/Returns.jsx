const Returns = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Política de devoluciones
      </h1>
      <div className="prose prose-gray max-w-none text-gray-700">
        <p className="mb-4">
          En Denia Style queremos que estés completamente satisfecha con tu
          compra. Si por algún motivo no es así, aquí te explicamos cómo
          realizar una devolución.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Plazo de devolución
        </h2>
        <p className="mb-4">
          Dispones de 14 días naturales desde la recepción del pedido para
          devolver cualquier producto.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Condiciones
        </h2>
        <ul className="list-disc ml-6 mb-4">
          <li>
            El producto debe estar sin usar, en las mismas condiciones en que lo
            recibiste.
          </li>
          <li>Debe conservar las etiquetas originales y el embalaje.</li>
          <li>
            Los artículos personalizados o íntimos no pueden ser devueltos por
            razones de higiene.
          </li>
        </ul>
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Proceso de devolución
        </h2>
        <p className="mb-4">
          Contacta con nosotros en{" "}
          <a
            href="mailto:devoluciones@deniastyle.com"
            className="text-denia-peach hover:underline"
          >
            devoluciones@deniastyle.com
          </a>{" "}
          indicando tu número de pedido y el motivo. Te proporcionaremos
          instrucciones.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Reembolsos
        </h2>
        <p className="mb-4">
          Una vez recibido y comprobado el producto, te reembolsaremos el
          importe (excepto gastos de envío) mediante el mismo método de pago
          utilizado.
        </p>
        <p className="mt-6 text-sm text-gray-500">
          Última actualización: marzo de 2025
        </p>
      </div>
    </div>
  );
};

export default Returns;
