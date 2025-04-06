'use client';

import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Компонент многострочного поля ввода на основе Shadcn UI
 * Поддерживает различные состояния и стили
 */

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  error?: string;
  label?: string;
  fullWidth?: boolean;
  className?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props: TextareaProps, ref: React.ForwardedRef<HTMLTextAreaElement>) => {
    const { 
      className, 
      error, 
      label, 
      fullWidth = false, 
      required,
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
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm",
            "ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed",
            "disabled:opacity-50 dark:border-gray-700 dark:bg-gray-950 dark:ring-offset-gray-950",
            "dark:placeholder:text-gray-400 dark:focus-visible:ring-blue-400 transition-colors duration-200",
            error ? 'border-red-500 focus-visible:ring-red-500 dark:focus-visible:ring-red-400' : '',
            fullWidth ? 'w-full' : '',
            className
          )}
          id={id}
          ref={ref}
          required={required}
          {...rest}
        />
        {error && (
          <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
        )}
      </div>
    )
  }
)

Textarea.displayName = "Textarea"

export { Textarea }
export default Textarea
