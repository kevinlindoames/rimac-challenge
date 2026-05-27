import React from 'react';

interface PlanCardProps {
  name: string;
  originalPrice?: number;
  currentPrice: number;
  benefits: string[];
  onSelect: () => void;
  discountPercent?: number; // 0 o 5
}

export const PlanCard: React.FC<PlanCardProps> = ({
  name,
  originalPrice,
  currentPrice,
  benefits,
  onSelect,
  discountPercent = 0,
}) => {
  const hasDiscount = discountPercent > 0 && originalPrice !== undefined;

  return (
    <div className="flex flex-col w-full bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition-all">
      {/* Nombre del plan */}
      <h3 className="text-lg font-bold text-[#141938] px-4 pt-4">{name}</h3>

      {/* Precio */}
      <div className="px-4 mt-2">
        {hasDiscount && (
          <span className="text-sm text-gray-400 line-through">${originalPrice}</span>
        )}
        <span className="text-2xl font-black text-[#4F4FFF] ml-2">
          ${currentPrice.toFixed(2)}
        </span>
        <span className="text-sm text-gray-500"> /mes</span>
        {hasDiscount && (
          <p className="text-xs text-green-600 mt-1">5% de descuento aplicado</p>
        )}
      </div>

      {/* Beneficios */}
      <ul className="mt-4 px-4 space-y-2 flex-1">
        {benefits.map((benefit, idx) => (
          <li key={idx} className="text-sm text-[#141938] flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>

      {/* Botón */}
      <button
        onClick={onSelect}
        className="mt-6 mx-4 mb-4 bg-[#4F4FFF] text-white py-2 rounded-full hover:bg-blue-700 transition"
      >
        Seleccionar Plan
      </button>
    </div>
  );
};