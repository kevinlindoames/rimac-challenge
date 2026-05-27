// packages/shared/src/components/PlanCard.tsx
import React from 'react';

interface PlanCardProps {
  name: string;
  originalPrice?: number;
  currentPrice: number;
  benefits: string[];
  onSelect: () => void;
  recommended?: boolean;
  discountPercent?: number;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  name,
  originalPrice,
  currentPrice,
  benefits,
  onSelect,
  recommended = false,
  discountPercent = 0,
}) => {
  const hasDiscount = discountPercent > 0 && originalPrice !== undefined;

  return (
    <div className="relative w-[288px] h-full flex flex-col pt-[68px] px-8 pb-12 gap-6 bg-white rounded-2xl shadow-[0px_1px_32px_rgba(174,172,243,0.35)]">
      {/* Tag "Plan recomendado" (opcional) */}
      {recommended && (
        <div className="absolute top-4 left-4 z-10 bg-[#7DF0BA] rounded-md px-2 py-0.5">
          <span className="text-[#141938] font-black text-xs leading-4 tracking-wide uppercase">
            Plan recomendado
          </span>
        </div>
      )}

      {/* Nombre del plan */}
      <h3 className="text-[#141938] font-black text-2xl leading-8 tracking-[-0.2px]">
        {name}
      </h3>

      {/* Precio (content dinámico) */}
      <div className="flex flex-col gap-1 w-full">
        <span className="text-[#7981B2] font-black text-xs leading-4 tracking-wide uppercase">
          COSTO DEL PLAN
        </span>
        {hasDiscount && originalPrice && (
          <span className="text-[#7981B2] font-normal text-sm leading-5 tracking-[-0.2px] line-through">
            ${originalPrice}
          </span>
        )}
        <div className="flex items-baseline gap-1">
          <span className="text-[#141938] font-black text-xl leading-7 tracking-[-0.2px]">
            ${currentPrice.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">al mes</span>
        </div>
        {hasDiscount && (
          <span className="text-xs text-green-600 mt-1">{discountPercent}% de descuento aplicado</span>
        )}
      </div>

      {/* Línea divisoria */}
      <div className="w-full h-px bg-[#D7DBF5]" />

      {/* Beneficios - ocupan el espacio restante con flex-1 */}
      <ul className="flex-1 flex flex-col gap-4 w-full list-disc list-inside text-[#141938] font-bold text-base leading-7 tracking-[0.1px]">
        {benefits.map((benefit, idx) => (
          <li key={idx}>{benefit}</li>
        ))}
      </ul>

      {/* Botón - se pega al fondo con mt-auto y respeta el gap de 40px superior */}
      <div className="w-full mt-auto pt-10">
        <button
          onClick={onSelect}
          className="w-full h-12 bg-[#FF1C44] text-white font-bold text-lg leading-5 tracking-wide rounded-3xl hover:bg-red-600 transition"
        >
          Seleccionar Plan
        </button>
      </div>
    </div>
  );
};