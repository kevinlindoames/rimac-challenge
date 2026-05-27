import React from 'react';

interface SelectionCardProps {
  title: string;
  description: string;
  iconSrc: string; // ruta de la imagen PNG
  selected: boolean;
  onSelect: () => void;
}

export const SelectionCard: React.FC<SelectionCardProps> = ({
  title,
  description,
  iconSrc,
  selected,
  onSelect,
}) => {
  return (
    <div
      onClick={onSelect}
      className={`relative w-[256px] h-[212px] rounded-2xl p-4 pb-10 cursor-pointer transition-all ${
        selected
          ? 'border-[3px] border-[#03050F] bg-white'
          : 'border border-gray-200 bg-white shadow-[0px_1px_32px_rgba(174,172,243,0.35)] hover:shadow-xl'
      }`}
    >
      {/* Radio button (top right) */}
      <div className="absolute top-4 right-4 w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center bg-white">
        {selected && <div className="w-3 h-3 rounded-full bg-[#389E0D]" />}
      </div>

      {/* Icono (top left, tamaño 48x48) */}
      <div className="w-12 h-12 rounded-full  flex items-center justify-center overflow-hidden">
        <img src={iconSrc} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Título */}
      <h3 className="mt-4 text-xl font-black text-[#141938] tracking-[-0.2px]">{title}</h3>

      {/* Descripción */}
      <p className="mt-2 text-xs font-normal text-[#141938] leading-5 tracking-[0.2px]">
        {description}
      </p>
    </div>
  );
};