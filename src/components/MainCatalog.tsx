import React from 'react';
import { College, FilterState } from '../types';
import { ThreeCollegeCard } from './ThreeCollegeCard';
import { SearchComponent } from './SearchComponent';
import { FilterComponent } from './FilterComponent';
import { Footer } from './Footer';
import { User, LogOut, ShieldCheck, Building2, RotateCcw } from 'lucide-react';

interface MainCatalogProps {
  colleges: College[];
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  onSelectCollege: (id: number) => void;
  onNavigateProfile: () => void;
  onNavigateAdmin: () => void;
  onOpenLogout: () => void;
  savedCollegeIds: number[];
  onToggleSave: (id: number) => void;
  isAdminLoggedIn?: boolean;
}

export const MainCatalog: React.FC<MainCatalogProps> = ({
  colleges,
  filters,
  onFilterChange,
  onResetFilters,
  onSelectCollege,
  onNavigateProfile,
  onNavigateAdmin,
  onOpenLogout,
  savedCollegeIds,
  onToggleSave,
  isAdminLoggedIn = false,
}) => {
  const collegeNames = colleges.map((c) => c.collage_name);

  return (
    <div className="min-h-screen bg-[#020617] text-[#f1f5f9] font-sans pb-24 relative">
      {/* Top Header Navigation */}
      <header className="bg-[#0f172a]/90 backdrop-blur-md border-b border-white/10 sticky top-0 z-40 shadow-xl transition-all">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          {/* Top Left: Student Profile Link */}
          <button
            onClick={onNavigateProfile}
            className="flex items-center gap-2 bg-[#1e293b] hover:bg-slate-800 text-[#38bdf8] border border-sky-500/30 px-4 py-2 rounded-xl font-extrabold text-xs sm:text-sm uppercase tracking-wider transition shadow-sm group shrink-0"
            title="Open Student Profile"
          >
            <div className="w-6 h-6 bg-[#38bdf8] text-[#020617] rounded-lg flex items-center justify-center text-xs font-black group-hover:scale-105 transition">
              <User className="w-3.5 h-3.5" />
            </div>
            <span>My Profile</span>
          </button>

          {/* Center-Left: Filter Drawer Button */}
          <FilterComponent
            filters={filters}
            onFilterChange={onFilterChange}
            onReset={onResetFilters}
            totalResultsCount={colleges.length}
          />

          {/* Center-Right: Search Bar */}
          <SearchComponent
            value={filters.searchQuery}
            onChange={(val) => onFilterChange({ ...filters, searchQuery: val })}
            collegeNames={collegeNames}
            placeholder="Search by college name, city, or branch..."
          />

          {/* Top Right Actions: Logout */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenLogout}
              className="flex items-center gap-1.5 bg-[#38bdf8] hover:bg-sky-400 text-[#020617] px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition shadow-md"
              title="Logout Session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container Area */}
      <main className="max-w-7xl mx-auto px-4 pt-8">
        {/* Banner Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="sky-tag">
                ACADEMIA_OS
              </span>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                Explore Top Engineering Colleges
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-none mt-1">
              Find Your Future.
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-[#0f172a] text-slate-200 text-xs font-extrabold uppercase tracking-wider px-4 py-2 rounded-xl border border-white/10 shadow-sm flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#38bdf8]" />
              <span>{colleges.length} Colleges Available</span>
            </span>
          </div>
        </div>

        {/* Active Filter Tags */}
        {(filters.selectedState ||
          filters.selectedDistrict ||
          filters.selectedBranch ||
          filters.universityType ||
          filters.isAutonomous ||
          filters.searchQuery) && (
          <div className="mb-6 bg-[#0f172a] p-3.5 rounded-2xl border border-white/10 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-extrabold text-slate-400 uppercase tracking-widest text-[10px]">
              Active Filters:
            </span>

            {filters.searchQuery && (
              <span className="sky-tag">
                Search: "{filters.searchQuery}"
              </span>
            )}
            {filters.selectedState && (
              <span className="sky-tag">
                State: {filters.selectedState}
              </span>
            )}
            {filters.selectedDistrict && (
              <span className="sky-tag">
                City: {filters.selectedDistrict}
              </span>
            )}
            {filters.selectedBranch && (
              <span className="sky-tag">
                Branch: {filters.selectedBranch}
              </span>
            )}
            {filters.universityType && (
              <span className="sky-tag">
                Type: {filters.universityType}
              </span>
            )}
            {filters.isAutonomous && (
              <span className="sky-tag">
                Autonomous: {filters.isAutonomous}
              </span>
            )}

            <button
              onClick={onResetFilters}
              className="ml-auto text-[#38bdf8] hover:text-sky-300 font-extrabold uppercase text-[11px] tracking-wider underline flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All
            </button>
          </div>
        )}

        {/* College Grid */}
        {colleges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {colleges.map((college) => (
              <ThreeCollegeCard
                key={college.id}
                college={college}
                onSelectCollege={onSelectCollege}
                isSaved={savedCollegeIds.includes(college.id)}
                onToggleSave={onToggleSave}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="bg-[#0f172a] rounded-3xl p-12 text-center border border-white/10 shadow-2xl max-w-lg mx-auto my-8 space-y-4">
            <div className="w-16 h-16 bg-[#1e293b] text-[#38bdf8] rounded-2xl border border-sky-500/30 flex items-center justify-center mx-auto text-2xl font-black">
              🔍
            </div>
            <h3 className="text-xl font-extrabold text-white">No Colleges Match Criteria</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Try removing filter conditions or clearing search terms to inspect available colleges.
            </p>
            <button
              onClick={onResetFilters}
              className="btn-sky-bold shadow-lg"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
