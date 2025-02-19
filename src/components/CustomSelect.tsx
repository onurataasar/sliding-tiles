"use client";

import { useState, useRef, useEffect } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

interface Option {
  value: number;
  label: string;
}

interface Props {
  value: number;
  onChange: (value: number) => void;
  options: Option[];
}

export default function CustomSelect({ value, onChange, options }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left rounded-lg border dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors relative group"
      >
        <span>{selectedOption?.label}</span>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300 transition-colors">
          {isOpen ? <HiChevronUp size={20} /> : <HiChevronDown size={20} />}
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors
                ${
                  option.value === value ? "bg-purple-100 dark:bg-gray-700" : ""
                }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
