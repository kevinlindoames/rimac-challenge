import React from 'react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
  label: string;
  wide?: boolean;
  checked?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, wide = false, checked, onChange, onBlur, name, ...props }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        onBlur={onBlur}
        className="w-4 h-4 text-primary focus:ring-primary rounded border-gray-300"
        {...props}
      />
      <span className={`text-[#0A051E] font-normal text-sm md:text-xs leading-6 md:leading-5 tracking-[0.2px] md:tracking-[0.1px] ${wide ? 'w-full' : 'w-[246px]'}`}>
        {label}
      </span>
    </label>
  );
};
Checkbox.displayName = 'Checkbox';