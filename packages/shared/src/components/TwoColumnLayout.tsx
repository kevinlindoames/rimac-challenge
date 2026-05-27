import React from 'react';

interface TwoColumnLayoutProps {
  children: React.ReactNode;
  tag?: string;
  title?: string;
  subtitle?: string;
  imageSrc?: string;
}

export const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  children,
  tag,
  title,
  subtitle,
  imageSrc,
}) => {
  return (
    <>
      {/* Desktop (>= 768px) */}
      <div className="hidden md:flex flex-row items-start p-0 w-[1296px] h-[660px] max-w-full mx-auto">
        {imageSrc && (
          <div className="w-[600px] h-[640px] pt-8 pb-12 pl-[120px] pr-0 flex-shrink-0">
            <img src={imageSrc} alt="Seguro Salud" className="w-full h-full object-cover rounded-2xl" />
          </div>
        )}
        <div className="flex flex-col items-start pt-8 pr-[216px] pb-20 pl-[128px] w-[696px] h-[660px] gap-6">
          <div className="flex flex-col items-start p-0 gap-4 w-[352px]">
            {tag && <div className="inline-flex items-center px-2 py-1 gap-1 bg-gradient-to-r from-[#00F4E2] to-[#00FF7F] rounded text-[#03050F] font-bold text-sm leading-4 tracking-wide">{tag}</div>}
            {title && <h1 className="text-[#03050F] font-bold text-[32px] leading-10 w-[352px]">{title}</h1>}
            {subtitle && <p className="text-[#03050F] font-semibold text-sm leading-5 tracking-wide w-[352px]">{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>

      {/* Mobile (< 768px) */}
      <div className="md:hidden w-full max-w-[399px] mx-auto px-6 pb-16 bg-[#F8F9FF] min-h-[723px] flex flex-col gap-6">
        {/* Fila superior: texto (tag + título) a la izquierda, imagen a la derecha */}
        <div className="flex flex-row items-center justify-between gap-3 w-full max-w-[336px]">
          <div className="w-[188px] h-[100px] flex flex-col items-start gap-2">
            {tag && (
              <div className="inline-flex items-center px-2 py-1 gap-1 bg-gradient-to-r from-[#00F4E2] to-[#00FF7F] rounded text-[#03050F] font-bold text-xs leading-4 tracking-wide w-fit">
                {tag}
              </div>
            )}
            {title && <h1 className="text-[#03050F] font-bold text-2xl leading-8">{title}</h1>}
          </div>
          {imageSrc && (
            <div className="w-[136px] h-[160px] rounded-2xl overflow-hidden flex-shrink-0">
              <img src={imageSrc} alt="Seguro Salud" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
        {subtitle && <p className="text-[#03050F] font-semibold text-sm leading-5 tracking-wide">{subtitle}</p>}
        {children}
      </div>
    </>
  );
};