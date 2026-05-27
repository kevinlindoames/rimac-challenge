import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  wide?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, wide = false, ...props }, ref) => (
    <label className="flex flex-row items-center gap-3 w-full cursor-pointer">
      <div className="relative flex items-center justify-center w-5 h-5">
        <input
          type="checkbox"
          ref={ref}
          className="absolute opacity-0 w-5 h-5 cursor-pointer peer"
          {...props}
        />
        <div className="w-5 h-5 border border-[#5E6488] rounded-sm bg-white peer-checked:bg-[#0A051E] peer-checked:border-[#0A051E] transition-colors" />
        <svg
          className="absolute w-4 h-4 text-white pointer-events-none hidden peer-checked:block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className={`text-[#0A051E] font-normal text-sm md:text-xs leading-6 md:leading-5 tracking-[0.2px] md:tracking-[0.1px] ${wide ? 'w-full' : 'w-[246px]'}`}>
        {label}
      </span>
    </label>
  )
);
Checkbox.displayName = 'Checkbox';