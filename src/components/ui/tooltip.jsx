"use client";
import React, { useState, useRef, useEffect } from 'react';

const TooltipProvider = ({ children }) => {
  return <>{children}</>;
};

const TooltipContext = React.createContext({
  isOpen: false,
  setIsOpen: () => {},
  triggerRef: null,
});

const Tooltip = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);

  return (
    <TooltipContext.Provider value={{ isOpen, setIsOpen, triggerRef }}>
      {children}
    </TooltipContext.Provider>
  );
};

const TooltipTrigger = ({ children, asChild = false }) => {
  const { setIsOpen, triggerRef } = React.useContext(TooltipContext);
  const child = asChild ? React.Children.only(children) : children;

  return React.cloneElement(child, {
    ref: triggerRef,
    onMouseEnter: () => setIsOpen(true),
    onMouseLeave: () => setIsOpen(false),
  });
};

const TooltipContent = React.forwardRef(({ 
  children,
  className = '',
  sideOffset = 4,
  ...props 
}, ref) => {
  const { isOpen, triggerRef } = React.useContext(TooltipContext);
  const tooltipRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isOpen && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      const top = triggerRect.top - tooltipRect.height - sideOffset;
      const left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;

      setPosition({
        top: top + window.scrollY,
        left: left + window.scrollX
      });
    }
  }, [isOpen, sideOffset]);

  if (!isOpen) return null;

  return (
    <div
      ref={tooltipRef}
      className={`fixed z-50 rounded-md border bg-white px-3 py-1.5 text-sm text-gray-900 shadow-md ${className}`}
      style={{ 
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
      {...props}
    >
      {children}
    </div>
  );
});

TooltipContent.displayName = 'TooltipContent';

const CustomTooltip = ({ trigger, content, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      const top = triggerRect.top - tooltipRect.height - 4;
      const left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;

      setPosition({
        top: top + window.scrollY,
        left: left + window.scrollX
      });
    }
  }, [isVisible]);

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="inline-block"
      >
        {trigger}
      </div>
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`fixed z-50 rounded-md border bg-white px-3 py-1.5 text-sm text-gray-900 shadow-md ${className}`}
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  CustomTooltip
};