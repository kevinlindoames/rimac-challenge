import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center px-6 md:px-[120px] py-3 md:py-2 h-14 md:h-16 bg-white border-b border-gray-100">
      <div className="text-2xl font-bold text-primary">RIMAC</div>
      <div className="flex items-center gap-2">
        <span className="hidden md:inline text-sm text-gray-600">¡Compra por este medio!</span>
        <span className="text-sm md:text-base font-bold text-gray-800">(01) 411 6001</span>
      </div>
    </header>
  );
};