import React, { useState, useEffect } from 'react';
import { Search, X, Sparkles } from 'lucide-react';

interface SearchComponentProps {
  value: string;
  onChange: (val: string) => void;
  collegeNames?: string[];
  placeholder?: string;
}

export const SearchComponent: React.FC<SearchComponentProps> = ({
  value,
  onChange,
  collegeNames = [],
  placeholder = 'Search college, district, or branch...',
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (value.trim().length > 1) {
      const query = value.toLowerCase();
      const matches = collegeNames
        .filter((name) => name.toLowerCase().includes(query))
        .slice(0, 5);
      setFilteredSuggestions(matches);
      setShowSuggestions(matches.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [value, collegeNames]);

  return (
    <div className="relative flex-1 max-w-xl mx-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setShowSuggestions(false);
        }}
        className="relative flex items-center"
      >
        <div className="absolute left-3.5 text-[#38bdf8] pointer-events-none">
          <Search className="w-4 h-4" />
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => {
            if (value.trim().length > 1 && filteredSuggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          onBlur={() => {
            // Delay to allow clicking suggestion
            setTimeout(() => setShowSuggestions(false), 200);
          }}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2.5 bg-[#0f172a] border border-white/10 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:bg-[#1e293b] focus:border-transparent transition-all shadow-inner font-medium"
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-3.5 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </form>

      {/* Autocomplete Dropdown */}
      {showSuggestions && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-[#0f172a] rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50 divide-y divide-white/5">
          <div className="px-3 py-2 bg-[#1e293b] text-[10px] font-extrabold text-[#38bdf8] uppercase tracking-widest flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#38bdf8]" />
            Quick College Matches
          </div>
          {filteredSuggestions.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onMouseDown={() => {
                onChange(item);
                setShowSuggestions(false);
              }}
              className="w-full text-left px-4 py-2.5 text-xs text-slate-200 hover:bg-[#1e293b] hover:text-[#38bdf8] transition flex items-center justify-between"
            >
              <span className="font-bold line-clamp-1">{item}</span>
              <span className="text-[10px] text-slate-400 font-mono">&rarr;</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
