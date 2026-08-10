import React, { useState } from 'react';
import { SlidersHorizontal, X, RotateCcw, Check, Sparkles } from 'lucide-react';
import { FilterState } from '../types';

interface FilterComponentProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
  totalResultsCount: number;
}

export const FilterComponent: React.FC<FilterComponentProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalResultsCount,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Count active filters (excluding default values)
  const activeCount = [
    filters.selectedState !== '',
    filters.selectedDistrict !== '',
    filters.selectedBranch !== '',
    filters.universityType !== '',
    filters.isAutonomous !== '',
    filters.maxFees < 200000,
  ].filter(Boolean).length;

  const handleSelect = (key: keyof FilterState, value: any) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="relative inline-block">
      {/* Filter Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-extrabold uppercase tracking-wider transition-all shadow-md ${
          activeCount > 0
            ? 'bg-[#38bdf8] text-[#020617] border-[#38bdf8] ring-2 ring-sky-400/30'
            : 'bg-[#0f172a] text-slate-200 border-white/10 hover:border-sky-500/40 hover:bg-[#1e293b]'
        }`}
      >
        <SlidersHorizontal className="w-4 h-4 text-current" />
        <span>Filter</span>
        {activeCount > 0 && (
          <span className="bg-[#020617] text-[#38bdf8] text-[10px] font-black w-5 h-5 rounded-md flex items-center justify-center ml-0.5 shadow-sm">
            {activeCount}
          </span>
        )}
      </button>

      {/* Filter Modal / Popover */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-[#0f172a] text-slate-100 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-white/10 relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#1e293b] text-[#38bdf8] rounded-xl border border-sky-500/20">
                  <SlidersHorizontal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white uppercase tracking-tight">Filter Colleges</h3>
                  <p className="text-xs text-slate-400 font-bold">
                    Showing {totalResultsCount} matching colleges
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-[#1e293b] transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Filter Presets */}
            <div className="py-3 border-b border-white/10">
              <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                Quick Filters
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onFilterChange({ ...filters, universityType: 'Government' });
                  }}
                  className={`text-xs px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider border transition ${
                    filters.universityType === 'Government'
                      ? 'bg-[#38bdf8] text-[#020617] border-[#38bdf8]'
                      : 'bg-[#1e293b] text-slate-300 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  🏛️ Government
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onFilterChange({ ...filters, selectedDistrict: 'Nashik' });
                  }}
                  className={`text-xs px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider border transition ${
                    filters.selectedDistrict === 'Nashik'
                      ? 'bg-[#38bdf8] text-[#020617] border-[#38bdf8]'
                      : 'bg-[#1e293b] text-slate-300 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  📍 Nashik
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onFilterChange({ ...filters, isAutonomous: 'Yes' });
                  }}
                  className={`text-xs px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider border transition ${
                    filters.isAutonomous === 'Yes'
                      ? 'bg-[#38bdf8] text-[#020617] border-[#38bdf8]'
                      : 'bg-[#1e293b] text-slate-300 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  ⭐ Autonomous Only
                </button>
              </div>
            </div>

            {/* Filter Form Controls */}
            <div className="space-y-4 py-4">
              {/* State */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 uppercase tracking-wider">State</label>
                <select
                  value={filters.selectedState}
                  onChange={(e) => handleSelect('selectedState', e.target.value)}
                  className="w-full p-2.5 bg-[#1e293b] border border-slate-700 rounded-xl text-sm font-bold text-white focus:ring-2 focus:ring-[#38bdf8] focus:outline-none"
                >
                  <option value="">All States</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Karnataka">Karnataka</option>
                </select>
              </div>

              {/* District */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 uppercase tracking-wider">District / City</label>
                <select
                  value={filters.selectedDistrict}
                  onChange={(e) => handleSelect('selectedDistrict', e.target.value)}
                  className="w-full p-2.5 bg-[#1e293b] border border-slate-700 rounded-xl text-sm font-bold text-white focus:ring-2 focus:ring-[#38bdf8] focus:outline-none"
                >
                  <option value="">All Districts</option>
                  <option value="Nashik">Nashik</option>
                  <option value="Pune">Pune</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Vadodara">Vadodara</option>
                </select>
              </div>

              {/* Branch */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 uppercase tracking-wider">Engineering / Course Branch</label>
                <select
                  value={filters.selectedBranch}
                  onChange={(e) => handleSelect('selectedBranch', e.target.value)}
                  className="w-full p-2.5 bg-[#1e293b] border border-slate-700 rounded-xl text-sm font-bold text-white focus:ring-2 focus:ring-[#38bdf8] focus:outline-none"
                >
                  <option value="">All Branches</option>
                  <option value="Computer Engineering">Computer Engineering</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Artificial Intelligence & ML">Artificial Intelligence & ML</option>
                  <option value="Computer Science & Science">Computer Science & Science</option>
                </select>
              </div>

              {/* University Type */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1 uppercase tracking-wider">University Type</label>
                  <select
                    value={filters.universityType}
                    onChange={(e) => handleSelect('universityType', e.target.value)}
                    className="w-full p-2.5 bg-[#1e293b] border border-slate-700 rounded-xl text-sm font-bold text-white focus:ring-2 focus:ring-[#38bdf8] focus:outline-none"
                  >
                    <option value="">All Types</option>
                    <option value="Private">Private</option>
                    <option value="Government">Government</option>
                    <option value="Semi-Government">Semi-Government</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1 uppercase tracking-wider">Autonomous</label>
                  <select
                    value={filters.isAutonomous}
                    onChange={(e) => handleSelect('isAutonomous', e.target.value)}
                    className="w-full p-2.5 bg-[#1e293b] border border-slate-700 rounded-xl text-sm font-bold text-white focus:ring-2 focus:ring-[#38bdf8] focus:outline-none"
                  >
                    <option value="">Any</option>
                    <option value="Yes">Yes (Autonomous)</option>
                    <option value="No">No (Affiliated)</option>
                  </select>
                </div>
              </div>

              {/* Max Fees Slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Max Annual Tuition Fee</label>
                  <span className="text-xs font-extrabold text-[#38bdf8] bg-sky-500/10 px-2 py-0.5 rounded-md border border-sky-500/20">
                    ₹{filters.maxFees.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="200000"
                  step="5000"
                  value={filters.maxFees}
                  onChange={(e) => handleSelect('maxFees', Number(e.target.value))}
                  className="w-full accent-[#38bdf8] cursor-pointer"
                />
              </div>

              {/* Sort Order */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 uppercase tracking-wider">Sort Results By</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleSelect('sortBy', e.target.value as any)}
                  className="w-full p-2.5 bg-[#1e293b] border border-slate-700 rounded-xl text-sm font-bold text-white focus:ring-2 focus:ring-[#38bdf8] focus:outline-none"
                >
                  <option value="ranking_asc">Ranking (Top Rated First)</option>
                  <option value="fees_low">Fees (Lowest to Highest)</option>
                  <option value="fees_high">Fees (Highest to Lowest)</option>
                  <option value="name_asc">College Name (A to Z)</option>
                  <option value="est_year_desc">Established Year (Oldest First)</option>
                  <option value="est_year_asc">Established Year (Newest First)</option>
                </select>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-white/10 flex gap-3">
              <button
                type="button"
                onClick={onReset}
                className="w-1/3 flex items-center justify-center gap-1.5 py-2.5 border border-slate-700 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-300 hover:bg-[#1e293b] transition"
              >
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-2/3 bg-[#38bdf8] text-[#020617] py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider hover:bg-sky-300 transition flex items-center justify-center gap-1 shadow-lg"
              >
                <Check className="w-4 h-4" /> Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
