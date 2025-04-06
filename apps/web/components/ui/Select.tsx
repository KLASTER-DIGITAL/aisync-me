'use client';

import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Компонент выпадающего списка на основе Shadcn UI
 * Поддерживает различные состояния и стили
 */

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'className'> {
  options: SelectOption[];
  error?: string;
  label?: string;
  fullWidth?: boolean;
  className?: string;
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (props: SelectProps, ref: React.ForwardedRef<HTMLSelectElement>) => {
    const { 
      className, 
      options,
      error, 
      label, 
      fullWidth = false, 
      required,
      placeholder,
      id, 
      ...rest 
    } = props;

    return (
      <div className={cn(fullWidth ? 'w-full' : '', 'space-y-2')}>
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
            {required && <span className="text-red-500"> *</span>}
          </label>
        )}
        <select
          className={cn(
            "flex h-10 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "dark:border-gray-700 dark:bg-gray-950 dark:ring-offset-gray-950 dark:focus-visible:ring-blue-400",
            "transition-colors duration-200",
            error ? 'border-red-500 focus-visible:ring-red-500 dark:focus-visible:ring-red-400' : '',
            fullWidth ? 'w-full' : '',
            className
          )}
          id={id}
          ref={ref}
          required={required}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
        )}
      </div>
    )
  }
)

Select.displayName = "Select"

export { Select }
export default Select
