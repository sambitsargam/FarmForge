import React, { useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  position?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 300,
  className
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  
  const positionStyles = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 mb-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 translate-x-2 ml-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 translate-y-2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 -translate-x-2 mr-2'
  };
  
  const arrowStyles = {
    top: 'bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full border-l-transparent border-r-transparent border-b-transparent',
    right: 'left-0 top-1/2 transform -translate-y-1/2 -translate-x-full border-t-transparent border-b-transparent border-r-transparent',
    bottom: 'top-0 left-1/2 transform -translate-x-1/2 -translate-y-full border-l-transparent border-r-transparent border-t-transparent',
    left: 'right-0 top-1/2 transform -translate-y-1/2 translate-x-full border-t-transparent border-b-transparent border-l-transparent'
  };
  
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };
  
  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    setIsVisible(false);
  };
  
  // Clone the child element to add event handlers
  const childElement = React.cloneElement(children, {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    ref: (node: HTMLElement) => {
      triggerRef.current = node;
      // Forward the ref if the child has one
      const { ref } = children;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLElement>).current = node;
      }
    }
  });
  
  return (
    <>
      {childElement}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={clsx(
            'absolute z-50 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded shadow-sm max-w-xs',
            positionStyles[position],
            className
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {content}
          <div 
            className={clsx(
              'absolute w-0 h-0 border-4 border-gray-900',
              arrowStyles[position]
            )}
          />
        </div>
      )}
    </>
  );
};

export default Tooltip;