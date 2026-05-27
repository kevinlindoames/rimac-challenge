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
  iconSrc: string;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  name,
  originalPrice,
  currentPrice,
  benefits,
  onSelect,
  recommended = false,
  discountPercent = 0,
  iconSrc,
}) => {
  const hasDiscount = discountPercent > 0 && originalPrice !== undefined;

  return (
    <div className="relative w-full h-full flex flex-col pt-6 md:pt-[68px] px-4 md:px-8 pb-6 md:pb-12 gap-4 md:gap-6 bg-white rounded-2xl shadow-[0px_1px_32px_rgba(174,172,243,0.35)]">
      {recommended && (
        <div className="absolute top-4 left-4 z-10 bg-[#7DF0BA] rounded-md px-2 py-0.5">
          <span className="text-[#141938] font-black text-xs leading-4 tracking-wide uppercase">
            Plan recomendado
          </span>
        </div>
      )}

      {/* Nombre + precio + icono */}
      <div className="flex flex-row items-start gap-2 md:gap-4 w-full">
        <div className="flex-1 flex flex-col gap-3 md:gap-6">
          <h3 className="text-lg md:text-2xl font-black text-[#141938] tracking-[-0.2px] leading-6 md:leading-8">
            {name}
          </h3>
          <div className="flex flex-col gap-1">
            <span className="text-[#7981B2] font-black text-xs leading-4 tracking-wide uppercase">
              COSTO DEL PLAN
            </span>
            {hasDiscount && originalPrice && (
              <span className="text-[#7981B2] font-normal text-sm leading-5 tracking-[-0.2px] line-through">
                ${originalPrice}
              </span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-lg md:text-xl font-black text-[#141938] leading-6 md:leading-7 tracking-[-0.2px]">
                ${currentPrice.toFixed(2)}
              </span>
              <span className="text-xs md:text-sm text-gray-500">al mes</span>
            </div>
            {hasDiscount && (
              <span className="text-xs text-green-600 mt-1">{discountPercent}% de descuento aplicado</span>
            )}
          </div>
        </div>
        <div className="w-10 h-10 md:w-14 md:h-14 flex-shrink-0">
          <img src={iconSrc} alt={name} className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="w-full h-px bg-[#D7DBF5]" />

      <ul className="flex-1 flex flex-col gap-2 md:gap-4 w-full list-disc list-inside text-[#141938] font-bold text-sm md:text-base leading-6 md:leading-7 tracking-[0.1px]">
        {benefits.map((benefit, idx) => (
          <li key={idx}>{benefit}</li>
        ))}
      </ul>

      <div className="w-full mt-4 md:mt-auto pt-4 md:pt-10">
        <button
          onClick={onSelect}
          className="w-full h-10 md:h-12 bg-[#FF1C44] text-white font-bold text-sm md:text-lg leading-5 tracking-wide rounded-2xl md:rounded-3xl hover:bg-red-600 transition"
        >
          Seleccionar Plan
        </button>
      </div>
    </div>
  );
};