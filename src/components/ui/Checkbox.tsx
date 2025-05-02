import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  helperText?: string;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ 
    label, 
    helperText, 
    error, 
    className, 
    id,
    ...props 
  }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;
    
    return (
      <div className="relative flex items-start mb-4">
        <div className="flex items-center h-5">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            className={clsx(
              'h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500',
              error && 'border-red-300',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${checkboxId}-error` : helperText ? `${checkboxId}-description` : undefined}
            {...props}
          />
        </div>
        
        <div className="ml-3 text-sm">
          {label && (
            <label 
              htmlFor={checkboxId} 
              className={clsx(
                'font-medium',
                error ? 'text-red-700' : 'text-gray-700'
              )}
            >
              {label}
            </label>
          )}
          
          {helperText && !error && (
            <p 
              className="text-gray-500" 
              id={`${checkboxId}-description`}
            >
              {helperText}
            </p>
          )}
          
          {error && (
            <p 
              className="text-red-600" 
              id={`${checkboxId}-error`}
            >
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;