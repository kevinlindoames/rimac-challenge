// packages/shared/src/components/PlanCard.tsx
import React from 'react';

interface PlanCardProps {
  name: string;
  originalPrice?: number;   // Precio original (si hay descuento)
  currentPrice: number;     // Precio final (con descuento aplicado)
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
    <div
      className={`
        relative w-[288px] flex flex-col 
        pt-10 px-8 pb-12 gap-6 
        bg-white rounded-2xl shadow-[0px_1px_32px_rgba(174,172,243,0.35)]
        min-h-[662px] md:min-h-0
      `}
    >
      {recommended && (
        <div className="absolute top-4 left-4 z-10 bg-[#7DF0BA] rounded-md px-2 py-0.5">
          <span className="text-[#141938] font-black text-xs leading-4 tracking-wide uppercase">
            Plan recomendado
          </span>
        </div>
      )}

      {/* Nombre + icono */}
      <div className="flex flex-row items-start gap-4 w-full">
        <div className="flex-1">
          <h3 className="text-[#141938] font-black text-2xl leading-8 tracking-[-0.2px]">
            {name}
          </h3>
        </div>
        <div className="w-14 h-14 flex-shrink-0">
          <img src={iconSrc} alt={name} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Precio */}
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

      {/* Beneficios */}
      <ul className="flex flex-col gap-4 w-full">
        {benefits.map((benefit, idx) => (
          <li key={idx} className="flex flex-row items-start gap-2">
            <div className="w-5 h-5 flex-shrink-0 mt-0.5">
              {/* Ícono de punto o glifo (puedes cambiarlo por SVG si quieres) */}
              <div className="w-2 h-2 rounded-full bg-[#03050F] mt-1.5" />
            </div>
            <span className="text-[#141938] font-bold text-base leading-7 tracking-[0.1px]">
              {benefit}
            </span>
          </li>
        ))}
      </ul>

      {/* Botón */}
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