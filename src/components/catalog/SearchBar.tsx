'use client';

import { useCallback } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <div className="relative flex items-center">
      <input
        type="text"
        placeholder="Find by Prefecture, Brewery, or Style"
        value={value}
        onChange={handleChange}
        className="input-field py-3 pr-10 text-sm font-body"
        aria-label="Search sakes"
      />
      <div className="absolute right-0 flex items-center">
        {value ? (
          <button
            onClick={() => onChange('')}
            className="text-outline hover:text-on-surface transition-colors p-1"
            aria-label="Clear search"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        ) : (
          <span className="text-outline p-1">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </span>
        )}
      </div>
    </div>
  );
}
