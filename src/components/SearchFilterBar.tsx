import React from 'react';
import { useHotel } from '../context/HotelContext';
import { 
  Calendar, 
  Users, 
  Filter, 
  Search, 
  Layers, 
  CheckCircle2, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface SearchFilterBarProps {
  onSearchSubmit?: () => void;
  showFloorFilter?: boolean;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({ 
  onSearchSubmit,
  showFloorFilter = true 
}) => {
  const { filters, updateFilters, resetFilters, setCurrentPage } = useHotel();

  const handleSearchAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit();
    } else {
      setCurrentPage('search');
    }
  };

  return (
    <form 
      onSubmit={handleSearchAction}
      className="w-full bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-4"
    >
      {/* Primary Search Inputs Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Check In Date */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            Check-In
          </label>
          <input
            type="date"
            value={filters.checkIn}
            onChange={(e) => updateFilters({ checkIn: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        {/* Check Out Date */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            Check-Out
          </label>
          <input
            type="date"
            value={filters.checkOut}
            onChange={(e) => updateFilters({ checkOut: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        {/* Guests Count */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            Guests
          </label>
          <select
            value={filters.guests}
            onChange={(e) => updateFilters({ guests: parseInt(e.target.value) || 1 })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
          >
            <option value={1}>1 Guest (Solo)</option>
            <option value={2}>2 Guests (Couple / Pair)</option>
            <option value={3}>3 Guests</option>
            <option value={4}>4+ Guests (Family)</option>
          </select>
        </div>

        {/* Room Category */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => updateFilters({ category: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
          >
            <option value="all">All Room Categories</option>
            <option value="studio">Studio & Quiet Retreat</option>
            <option value="deluxe">Deluxe King & Balcony</option>
            <option value="suite">Executive Suite</option>
            <option value="family">Family Panorama</option>
            <option value="penthouse">Skyline Penthouse</option>
          </select>
        </div>
      </div>

      {/* Secondary Quick Filter & Controls Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
        
        {/* Left: Quick Availability Toggle & Floor filter */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Availability only toggle */}
          <button
            type="button"
            onClick={() => updateFilters({ onlyAvailable: !filters.onlyAvailable })}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 border transition-all ${
              filters.onlyAvailable
                ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/50 shadow-sm'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${filters.onlyAvailable ? 'text-emerald-400' : 'text-slate-500'}`} />
            <span>Available Rooms Only</span>
          </button>

          {/* Floor Level Filter */}
          {showFloorFilter && (
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <select
                value={filters.floor}
                onChange={(e) => updateFilters({ 
                  floor: e.target.value === 'all' ? 'all' : parseInt(e.target.value) 
                })}
                aria-label="Floor selection"
                className="bg-slate-950 border border-slate-800 text-slate-200 text-xs px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-amber-400"
              >
                <option value="all">All Floors (Levels 1-6)</option>
                <option value={6}>Level 6 · Penthouse</option>
                <option value={5}>Level 5 · Executive</option>
                <option value={4}>Level 4 · Family Wing</option>
                <option value={3}>Level 3 · Deluxe Wing</option>
                <option value={2}>Level 2 · Wellness Deck</option>
                <option value={1}>Level 1 · Ground Atrium</option>
              </select>
            </div>
          )}

          {/* Reset Filters button */}
          {(filters.category !== 'all' || filters.floor !== 'all' || filters.onlyAvailable) && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors px-2 py-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}
        </div>

        {/* Right: Submit Button */}
        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Search className="w-4 h-4 stroke-[2.5]" />
          <span>Check Availability & Rates</span>
        </button>
      </div>
    </form>
  );
};
