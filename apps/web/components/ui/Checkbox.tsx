'use client';

import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Компонент чекбокса на основе Shadcn UI
 * Поддерживает различные состояния и стили
 */

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className' | 'type'> {
  label?: string;
  description?: string;
  error?: string;
  className?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (props: CheckboxProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const { 
      className, 
      label,
      description,
      error, 
      id,
      disabled,
      required,
      ...rest 
    } = props;

    return (
      <div className="flex items-start space-x-2">
        <div className="flex items-center justify-center h-5 mt-0.5">
          <input
            type="checkbox"
            className={cn(
              "h-4 w-4 rounded border border-gray-300 text-blue-600",
              "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              "transition-colors duration-200",
              "dark:border-gray-600 dark:bg-gray-800 dark:ring-offset-gray-800 dark:focus:ring-blue-600",
              disabled && "cursor-not-allowed opacity-50",
              error && "border-red-500 focus:ring-red-500",
              className
            )}
            id={id}
            ref={ref}
            disabled={disabled}
            required={required}
            {...rest}
          />
        </div>
        {(label || description) && (
          <div className="text-sm">
            {label && (
              <label 
                htmlFor={id} 
                className={cn(
                  "font-medium text-gray-700 dark:text-gray-300 select-none",
                  disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                {label}
                {required && <span className="text-red-500"> *</span>}
              </label>
            )}
            {description && (
              <p className="text-gray-500 dark:text-gray-400">{description}</p>
            )}
            {error && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>}
          </div>
        )}
      </div>
    )
  }
)

Checkbox.displayName = "Checkbox"

export { Checkbox }
export default Checkbox
