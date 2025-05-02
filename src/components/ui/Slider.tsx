import React, { useState, useEffect, forwardRef } from 'react';
import { clsx } from 'clsx';

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  label?: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  showValue?: boolean;
  valuePrefix?: string;
  valueSuffix?: string;
  helperText?: string;
  error?: string;
}

const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ 
    label, 
    min, 
    max, 
    step = 1, 
    value, 
    onChange, 
    showValue = true,
    valuePrefix = '',
    valueSuffix = '',
    helperText,
    error,
    className,
    id,
    ...props 
  }, ref) => {
    const [localValue, setLocalValue] = useState<number>(value);
    const sliderId = id || `slider-${Math.random().toString(36).substring(2, 9)}`;
    
    useEffect(() => {
      setLocalValue(value);
    }, [value]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value);
      setLocalValue(newValue);
      onChange(newValue);
    };
    
    const percentage = ((localValue - min) / (max - min)) * 100;
    
    return (
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          {label && (
            <label 
              htmlFor={sliderId} 
              className="block text-sm font-medium text-gray-700"
            >
              {label}
            </label>
          )}
          
          {showValue && (
            <span className="text-sm font-medium text-gray-900">
              {valuePrefix}{localValue}{valueSuffix}
            </span>
          )}
        </div>
        
        <div className="relative">
          <input
            ref={ref}
            id={sliderId}
            type="range"
            min={min}
            max={max}
            step={step}
            value={localValue}
            onChange={handleChange}
            className={clsx(
              'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer',
              className
            )}
            style={{
              background: `linear-gradient(to right, #0ea5e9 0%, #0ea5e9 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`
            }}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${sliderId}-error` : helperText ? `${sliderId}-description` : undefined}
            {...props}
          />
        </div>
        
        {helperText && !error && (
          <p 
            className="mt-1 text-sm text-gray-500" 
            id={`${sliderId}-description`}
          >
            {helperText}
          </p>
        )}
        
        {error && (
          <p 
            className="mt-1 text-sm text-red-600" 
            id={`${sliderId}-error`}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Slider.displayName = 'Slider';

export default Slider;