import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, required, className, value, onChange, onBlur, name, ...props }, ref) => {
    console.log(`[Input] value: ${value}, name: ${name}`); // para depuración
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && '*'}
        </label>
        <input
          ref={ref}
          name={name}
          value={value ?? ''}
          onChange={onChange}
          onBlur={onBlur}
          className={clsx(
            'mt-1 w-full border rounded-lg p-2 focus:ring-primary focus:border-primary',
            error ? 'border-red-500' : 'border-gray-300',
            className
          )}
          {...props}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';