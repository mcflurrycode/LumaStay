import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { SearchFilterBar } from '../components/SearchFilterBar';
import { RoomCard } from '../components/RoomCard';
import { HotelStructureView } from '../components/HotelStructureView';
import { 
  Filter, 
  Layers, 
  LayoutGrid, 
  CheckCircle2, 
  XCircle, 
  RotateCcw,
  Sparkles,
  SlidersHorizontal,
  Calendar,
  Users
} from 'lucide-react';

export const HotelSearchPage: React.FC = () => {
  const { 
    filteredRooms, 
    rooms, 
    filters, 
    updateFilters, 
    resetFilters 
  } = useHotel();

  // View mode: 'grid' or 'structure'
  const [viewMode, setViewMode] = useState<'grid' | 'structure'>('grid');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const availableCount = filteredRooms.filter(r => r.status === 'available').length;
  const reservedCount = filteredRooms.filter(r => r.status === 'reserved').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header with Title */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Real-Time Inventory & Reservation Engine
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Hotel Search & Room Results
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          Find matching rooms across LumaStay's 6 architectural levels. Filter by your travel dates, preferred floor elevation, or capacity.
        </p>
      </div>

      {/* Main Search Filter Bar */}
      <SearchFilterBar />

      {/* Control Bar: View Toggle, Live Counters & Quick Filter Chips */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        
        {/* Left: Results Count & Availability Breakdown */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="font-bold text-white text-sm">
            {filteredRooms.length} {filteredRooms.length === 1 ? 'Room' : 'Rooms'} Matched
          </span>
          <span className="text-slate-500">·</span>
          <span className="px-2.5 py-1 rounded-md bg-emerald-950/70 border border-emerald-700/40 text-emerald-300 font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            {availableCount} Available to Book
          </span>
          {reservedCount > 0 && (
            <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-400 font-medium">
              {reservedCount} Reserved
            </span>
          )}
        </div>

        {/* Right: View Mode Toggle & Price Slider */}
        <div className="flex items-center gap-3">
          {/* Max Price quick slider */}
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span className="text-slate-400">Max Nightly:</span>
            <span className="font-bold text-amber-400">${filters.maxPrice}</span>
            <input 
              type="range" 
              min={100} 
              max={450} 
              step={20}
              value={filters.maxPrice}
              onChange={(e) => updateFilters({ maxPrice: parseInt(e.target.value) })}
              className="w-24 accent-amber-400 cursor-pointer"
            />
          </div>

          <div className="h-5 w-px bg-slate-800 hidden sm:block"></div>

          {/* View Mode Toggle: Grid vs Interactive Hotel Structure */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                viewMode === 'grid'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
            <button
              onClick={() => setViewMode('structure')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                viewMode === 'structure'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Floor Structure View</span>
            </button>
          </div>
        </div>

      </div>

      {/* Main Results View */}
      {viewMode === 'structure' ? (
        <div className="pt-2">
          <HotelStructureView />
        </div>
      ) : (
        <div className="space-y-6">
          {filteredRooms.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 space-y-4 max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center mx-auto">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">No Matching Rooms Found</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Try loosening your filters or increasing your maximum price slider to reveal rooms on other floors.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Privacy Notice Box - per prompt requirements */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-slate-500"></span>
          <span>
            <strong>Reservation Privacy Guarantee:</strong> When a room is marked as "Reserved", only occupancy status is displayed. All guest identities remain strictly confidential.
          </span>
        </div>
      </div>

    </div>
  );
};
