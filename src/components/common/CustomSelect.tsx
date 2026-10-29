import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  label: string;
  value: string;
  description?: string;
}

interface CustomSelectProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: (string | SelectOption)[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  buttonClassName?: string;
  ariaLabel?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  id,
  value,
  onChange,
  options,
  placeholder = 'Select an option...',
  disabled = false,
  className = '',
  buttonClassName = '',
  ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [placement, setPlacement] = useState<'down' | 'up'>('down');
  const [dynamicMaxHeight, setDynamicMaxHeight] = useState<number>(240);

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Normalize options to SelectOption[]
  const normalizedOptions: SelectOption[] = options.map((opt) =>
    typeof opt === 'string' ? { label: opt, value: opt } : opt
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  // Intelligent collision detection to place dropdown where space exists
  const updatePosition = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    const preferredHeight = 240;

    // If space below is insufficient (< preferredHeight) and space above is greater, open upwards
    if (spaceBelow < preferredHeight && spaceAbove > spaceBelow) {
      setPlacement('up');
      const calculatedMax = Math.min(preferredHeight, Math.max(140, spaceAbove - 16));
      setDynamicMaxHeight(calculatedMax);
    } else {
      setPlacement('down');
      const calculatedMax = Math.min(preferredHeight, Math.max(140, spaceBelow - 16));
      setDynamicMaxHeight(calculatedMax);
    }
  }, []);

  // Update position on open and when window or any ancestor resizes/scrolls
  useEffect(() => {
    if (isOpen) {
      updatePosition();
      const handleScrollOrResize = () => updatePosition();
      window.addEventListener('resize', handleScrollOrResize, { passive: true });
      window.addEventListener('scroll', handleScrollOrResize, { capture: true, passive: true });
      return () => {
        window.removeEventListener('resize', handleScrollOrResize);
        window.removeEventListener('scroll', handleScrollOrResize, { capture: true });
      };
    }
  }, [isOpen, updatePosition]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  // Keyboard navigation & Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen]);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const toggleDropdown = () => {
    if (disabled) return;
    if (!isOpen) {
      updatePosition();
    }
    setIsOpen(!isOpen);
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        id={id}
        type="button"
        disabled={disabled}
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        className={`w-full appearance-none pl-3.5 pr-11 py-2.5 text-xs sm:text-sm rounded-2xl border text-left flex items-center justify-between transition-all duration-150 relative ${
          isOpen
            ? 'border-[#0B6B45] ring-2 ring-[#0B6B45]/20 bg-white shadow-sm'
            : 'border-slate-200 bg-white hover:border-slate-300'
        } ${disabled ? 'opacity-60 cursor-not-allowed bg-slate-50' : 'cursor-pointer'} ${buttonClassName}`}
      >
        <span
          className={`block truncate ${
            selectedOption ? 'text-[#102C57] font-medium' : 'text-slate-400'
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        {/* Dropdown chevron with sufficient spacing from the right wall */}
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400">
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 text-[#66758A] ${
              isOpen ? 'rotate-180 text-[#0B6B45]' : ''
            }`}
          />
        </span>
      </button>

      {/* Floating Dropdown Modal Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          role="listbox"
          tabIndex={-1}
          style={{
            maxHeight: `${dynamicMaxHeight}px`,
          }}
          className={`absolute left-0 right-0 z-50 overflow-y-auto bg-white rounded-2xl border border-slate-200/90 shadow-2xl p-1.5 focus:outline-none transition-all duration-150 animate-in fade-in zoom-in-95 ${
            placement === 'up'
              ? 'bottom-full mb-2 origin-bottom'
              : 'top-full mt-2 origin-top'
          } [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden`}
        >
          {normalizedOptions.length === 0 ? (
            <div className="py-3 px-3 text-center text-xs text-slate-400">
              No options available
            </div>
          ) : (
            normalizedOptions.map((option) => {
              const isSelected = option.value === value;
              return (
                <div
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option.value)}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between cursor-pointer transition-colors duration-150 ${
                    isSelected
                      ? 'bg-[#E7F7EF] text-[#0B6B45] font-semibold'
                      : 'text-[#243247] hover:bg-slate-50 hover:text-[#102C57]'
                  }`}
                >
                  <div className="flex flex-col truncate pr-2">
                    <span className="truncate">{option.label}</span>
                    {option.description && (
                      <span className="text-[11px] text-[#66758A] font-normal truncate mt-0.5">
                        {option.description}
                      </span>
                    )}
                  </div>
                  {isSelected && (
                    <Check className="w-4 h-4 text-[#0B6B45] shrink-0" />
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
