import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { RoomCard } from '../components/RoomCard';
import { 
  BedDouble, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Search, 
  SlidersHorizontal,
  Lock,
  ArrowUpDown
} from 'lucide-react';
import { RoomCategory } from '../types/hotel';

export const RoomSelectionPage: React.FC = () => {
  const { 
    rooms, 
    filters, 
    updateFilters, 
    filteredRooms 
  } = useHotel();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'floor'>('recommended');

  const categories = [
    { id: 'all', label: 'All Rooms & Suites' },
    { id: 'studio', label: 'Studios (Levels 1-2)' },
    { id: 'deluxe', label: 'Deluxe (Level 3)' },
    { id: 'family', label: 'Family (Level 4)' },
    { id: 'suite', label: 'Suites (Level 5)' },
    { id: 'penthouse', label: 'Penthouse (Level 6)' },
  ];

  // Apply category and sort
  const displayRooms = [...filteredRooms]
    .filter(r => activeCategory === 'all' || r.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePerNight - b.pricePerNight;
      if (sortBy === 'price-desc') return b.pricePerNight - a.pricePerNight;
      if (sortBy === 'floor') return b.floor - a.floor;
      // Default: available first, then featured
      if (a.status !== b.status) {
        return a.status === 'available' ? -1 : 1;
      }
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

  const availableCount = displayRooms.filter(r => r.status === 'available').length;
  const reservedCount = displayRooms.filter(r => r.status === 'reserved').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
          <BedDouble className="w-4 h-4" />
          <span>Room Inventory & Reservation Selection</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Select Your Room or Suite
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          Compare specifications, floor locations, and live availability. When a room is reserved, it will show as unavailable for the selected dates.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto gap-2 border-b border-slate-800 pb-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeCategory === cat.id
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Controls Bar: Search Filter, Floor Selector, Available Only & Sorter */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        
        {/* Left: Text Search & Availability Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search by room name or bed..."
              value={filters.searchQuery}
              onChange={(e) => updateFilters({ searchQuery: e.target.value })}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Only Available Toggle */}
          <button
            onClick={() => updateFilters({ onlyAvailable: !filters.onlyAvailable })}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              filters.onlyAvailable
                ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/50'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${filters.onlyAvailable ? 'text-emerald-400' : 'text-slate-500'}`} />
            <span>Only Show Available</span>
          </button>

          {/* Floor Level Filter */}
          <div className="flex items-center gap-1 text-xs text-slate-400 bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={filters.floor}
              onChange={(e) => updateFilters({ 
                floor: e.target.value === 'all' ? 'all' : parseInt(e.target.value) 
              })}
              aria-label="Filter by floor"
              className="bg-transparent text-slate-200 focus:outline-none text-xs"
            >
              <option value="all">All Levels</option>
              <option value={6}>Level 6 (Penthouse)</option>
              <option value={5}>Level 5 (Executive)</option>
              <option value={4}>Level 4 (Family)</option>
              <option value={3}>Level 3 (Deluxe)</option>
              <option value={2}>Level 2 (Wellness)</option>
              <option value={1}>Level 1 (Atrium)</option>
            </select>
          </div>
        </div>

        {/* Right: Availability Metrics & Sorter */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              {availableCount} Available
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400 flex items-center gap-1">
              <Lock className="w-3 h-3 text-slate-400" />
              {reservedCount} Reserved
            </span>
          </div>

          <div className="h-4 w-px bg-slate-800 hidden sm:block"></div>

          {/* Sort selector */}
          <div className="flex items-center gap-1.5 text-slate-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="Sort rooms"
              className="bg-slate-950 border border-slate-800 text-slate-200 text-xs px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-amber-400"
            >
              <option value="recommended">Sort: Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="floor">Floor: High to Low</option>
            </select>
          </div>
        </div>

      </div>

      {/* Rooms Grid */}
      {displayRooms.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
          <p className="text-sm font-semibold text-white">No rooms meet this filter criteria.</p>
          <p className="text-xs text-slate-400">Try switching categories or disabling "Only Show Available".</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}

      {/* Clarification banner */}
      <div className="rounded-2xl p-4 bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400 text-center">
        All room bookings include complimentary high-speed Wi-Fi, 24-hour access to the Level 2 TechnoGym, and Level 6 heated plunge pool.
      </div>

    </div>
  );
};
