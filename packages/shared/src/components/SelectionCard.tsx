// packages/shared/src/components/SelectionCard.tsx
import React from 'react';

interface SelectionCardProps {
  title: string;
  description: string;
  iconSrc: string;
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
      className={`relative w-full md:w-[256px] h-auto min-h-[160px] rounded-2xl px-6 pb-10 pt-4 cursor-pointer transition-all ${
        selected
          ? 'border-[3px] border-[#03050F] bg-white'
          : 'border border-gray-200 bg-white shadow-[0px_1px_32px_rgba(174,172,243,0.35)] hover:shadow-xl'
      }`}
    >
      <div className="absolute top-4 right-4 w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center bg-white">
        {selected && <div className="w-3 h-3 rounded-full bg-[#389E0D]" />}
      </div>

      <div className="w-8 h-8 md:w-12 md:h-12 rounded-full  flex items-center justify-center overflow-hidden">
        <img src={iconSrc} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <h3 className="text-xl font-black text-[#141938] tracking-[-0.2px] leading-7">
          {title}
        </h3>
        <p className="text-xs font-normal text-[#141938] leading-5 tracking-[0.2px]">
          {description}
        </p>
      </div>
    </div>
  );
};