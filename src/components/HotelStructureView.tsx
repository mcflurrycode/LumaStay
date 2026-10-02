import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { 
  Layers, 
  Bed, 
  Sparkles, 
  Volume2, 
  ArrowUpRight, 
  CheckCircle2, 
  XCircle, 
  ChevronRight,
  Maximize2,
  Building,
  Info,
  Waves,
  Coffee,
  HeartPulse,
  Sun
} from 'lucide-react';
import { HotelFloor, Room } from '../types/hotel';

interface HotelStructureViewProps {
  showAllFloorsToggle?: boolean;
  compactMode?: boolean;
}

export const HotelStructureView: React.FC<HotelStructureViewProps> = ({ 
  compactMode = false 
}) => {
  const { 
    floors, 
    rooms, 
    setSelectedRoomForBooking, 
    setPreviewModalRoom, 
    setCurrentPage, 
    selectedFloorForHighlight,
    setSelectedFloorForHighlight 
  } = useHotel();

  // Selected floor state (defaults to top floor 6 or current highlighted)
  const [activeFloorNumber, setActiveFloorNumber] = useState<number>(
    selectedFloorForHighlight || 6
  );

  const activeFloor = floors.find(f => f.floorNumber === activeFloorNumber) || floors[0];
  const roomsOnActiveFloor = rooms.filter(r => r.floor === activeFloorNumber);

  // Stats for the active floor
  const availableCount = roomsOnActiveFloor.filter(r => r.status === 'available').length;
  const reservedCount = roomsOnActiveFloor.filter(r => r.status === 'reserved').length;

  const handleSelectRoom = (room: Room) => {
    if (room.status === 'reserved') return; // Cannot book reserved
    setSelectedRoomForBooking(room);
    setCurrentPage('booking');
  };

  const getFloorIcon = (floorNum: number) => {
    switch (floorNum) {
      case 6: return <Sun className="w-4 h-4 text-amber-400" />;
      case 5: return <Layers className="w-4 h-4 text-sky-400" />;
      case 4: return <Building className="w-4 h-4 text-purple-400" />;
      case 3: return <Sparkles className="w-4 h-4 text-emerald-400" />;
      case 2: return <HeartPulse className="w-4 h-4 text-teal-400" />;
      case 1: return <Coffee className="w-4 h-4 text-amber-500" />;
      default: return <Layers className="w-4 h-4" />;
    }
  };

  return (
    <section className="w-full space-y-8">
      {/* Header section with typography rules */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1.5">
            <Layers className="w-4 h-4" />
            <span>Architectural Layout & Spatial Distribution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Hotel Structure & Vertical Wings
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl mt-1.5 leading-relaxed">
            Explore LumaStay floor by floor. Select any architectural elevation to inspect dedicated amenities, acoustic ratings, and real-time room availability.
          </p>
        </div>

        {/* Global Hotel Structural Status */}
        <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl text-xs">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{rooms.filter(r => r.status === 'available').length} Rooms Available</span>
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/50 text-slate-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-slate-500"></span>
            <span>{rooms.filter(r => r.status === 'reserved').length} Reserved</span>
          </div>
        </div>
      </div>

      {/* Main Structural Interactive Workspace - Spatially Generous */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Vertical Floor Selector Stack (Architectural Cross Section) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1 mb-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Vertical Cross-Section (6 Levels)
            </span>
            <span className="text-[11px] text-slate-500">Tap floor to inspect</span>
          </div>

          <div className="space-y-2 relative">
            {/* Elevation line running along the left */}
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-amber-500 via-sky-500 to-slate-700 -z-0 hidden sm:block opacity-40"></div>

            {floors.map((floor) => {
              const isSelected = floor.floorNumber === activeFloorNumber;
              const floorRooms = rooms.filter(r => r.floor === floor.floorNumber);
              const floorAvailable = floorRooms.filter(r => r.status === 'available').length;
              const floorReserved = floorRooms.filter(r => r.status === 'reserved').length;

              return (
                <button
                  key={floor.floorNumber}
                  onClick={() => {
                    setActiveFloorNumber(floor.floorNumber);
                    setSelectedFloorForHighlight?.(floor.floorNumber);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 relative z-10 flex items-center justify-between group ${
                    isSelected
                      ? 'bg-slate-900 border-amber-500/80 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/40 translate-x-1'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    {/* Floor Number Badge */}
                    <div 
                      className={`w-10 h-10 rounded-lg flex flex-col items-center justify-center font-bold transition-transform ${
                        isSelected 
                          ? 'bg-amber-500 text-slate-950 scale-105 shadow-md shadow-amber-500/20' 
                          : 'bg-slate-800 text-slate-300 group-hover:bg-slate-700 group-hover:text-white'
                      }`}
                    >
                      <span className="text-[10px] uppercase tracking-tighter leading-none text-slate-900/70 font-semibold">
                        Lvl
                      </span>
                      <span className="text-base leading-none">
                        {floor.floorNumber}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className={`text-sm font-bold transition-colors ${
                          isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'
                        }`}>
                          {floor.name.split('·')[1]?.trim() || floor.name}
                        </h3>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {floor.elevation} · {floor.noiseLevel}
                      </p>
                    </div>
                  </div>

                  {/* Floor Room Availability Mini Pills */}
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1.5 text-[11px]">
                      {floorAvailable > 0 ? (
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          {floorAvailable} avail
                        </span>
                      ) : (
                        <span className="text-slate-400 font-medium">Full</span>
                      )}
                    </div>
                    {floorReserved > 0 && (
                      <span className="text-[10px] text-slate-400">
                        {floorReserved} reserved
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Architecture Concept Callout */}
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 mt-4 text-xs space-y-2">
            <div className="flex items-center gap-2 text-slate-300 font-semibold">
              <Info className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Acoustic & Spatial Engineering</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Levels 1 & 2 isolate all community bistro, gym, and pool activities. Levels 3 to 6 are acoustic quiet zones with vibration dampening and sound-baffled suites.
            </p>
          </div>
        </div>

        {/* Right Column: Selected Floor Showcase & Real-Time Room Grid */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Floor Architectural Hero Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden relative shadow-xl">
            {/* Floor Image with Dark Overlay */}
            <div className="relative h-56 sm:h-64 w-full overflow-hidden">
              <img 
                src={activeFloor.image} 
                alt={activeFloor.name}
                className="w-full h-full object-cover object-center filter brightness-[0.75] transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

              {/* Floor Header Tag Overlay */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-xs font-bold text-amber-300 shadow-md">
                  {getFloorIcon(activeFloor.floorNumber)}
                  Level {activeFloor.floorNumber} Architectural Wing
                </span>

                <span className="px-3 py-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-xs text-slate-300 font-medium">
                  Elevation: <strong className="text-white">{activeFloor.elevation}</strong>
                </span>
              </div>

              {/* Bottom Hero Information */}
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {activeFloor.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                  {activeFloor.description}
                </p>
              </div>
            </div>

            {/* Facilities Bar */}
            <div className="p-4 sm:p-5 bg-slate-900/90 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Floor Amenities:
              </span>
              {activeFloor.facilities.map((fac, idx) => (
                <span 
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-xs text-slate-200"
                >
                  {fac}
                </span>
              ))}
            </div>
          </div>

          {/* Rooms on this Floor: Room Availability & Reservation Area */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Bed className="w-5 h-5 text-amber-400" />
                  Rooms Located on Level {activeFloor.floorNumber}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Real-time status for room reservations on this level
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  {availableCount} Available
                </span>
                <span className="flex items-center gap-1 text-slate-400 font-medium">
                  <XCircle className="w-4 h-4 text-slate-400" />
                  {reservedCount} Reserved
                </span>
              </div>
            </div>

            {/* Rooms Cards List for Active Floor */}
            {roomsOnActiveFloor.length === 0 ? (
              <div className="p-8 text-center rounded-xl bg-slate-900/40 border border-slate-800 text-slate-400 text-sm">
                This floor is primarily dedicated to communal wellness and social amenities.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roomsOnActiveFloor.map((room) => {
                  const isAvailable = room.status === 'available';

                  return (
                    <div 
                      key={room.id}
                      className={`p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                        isAvailable
                          ? 'bg-slate-900/90 border-slate-800 hover:border-amber-500/50 shadow-md group'
                          : 'bg-slate-950/60 border-slate-900/80 opacity-80'
                      }`}
                    >
                      {/* Room Header & Thumbnail */}
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                                Room {room.number}
                              </span>
                              <span className="text-xs text-slate-400">
                                {room.wing}
                              </span>
                            </div>
                            <h5 className="text-base font-bold text-white mt-1 group-hover:text-amber-300 transition-colors">
                              {room.name}
                            </h5>
                          </div>

                          {/* Real-time Status Badge */}
                          {isAvailable ? (
                            <span className="px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-600/40 text-emerald-300 text-[11px] font-bold flex items-center gap-1 flex-shrink-0">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                              Available
                            </span>
                          ) : (
                            // CRITICAL CONSTRAINT: Reserved already -> just show that it's already reserved, no personal info!
                            <span className="px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-400 text-[11px] font-semibold flex items-center gap-1 flex-shrink-0">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                              Reserved
                            </span>
                          )}
                        </div>

                        {/* Room Image Preview */}
                        <div className="relative h-36 rounded-lg overflow-hidden border border-slate-800/80">
                          <img 
                            src={room.images[0]} 
                            alt={room.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-slate-950/80 backdrop-blur-sm text-[11px] text-slate-200">
                            {room.viewType}
                          </div>
                        </div>

                        {/* Room Key Specs */}
                        <div className="grid grid-cols-3 gap-1 text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
                          <div>
                            <span className="text-slate-500 block text-[10px]">Bed</span>
                            <span className="text-slate-200 font-medium truncate block">{room.bedType}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px]">Capacity</span>
                            <span className="text-slate-200 font-medium">{room.capacity} Guests</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px]">Area</span>
                            <span className="text-slate-200 font-medium">{room.sizeSqm} m²</span>
                          </div>
                        </div>
                      </div>

                      {/* Pricing and Action Buttons */}
                      <div className="pt-4 mt-3 border-t border-slate-800/60 flex items-center justify-between gap-3">
                        <div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-lg font-extrabold text-white">
                              ${room.pricePerNight}
                            </span>
                            <span className="text-xs text-slate-400">/ night</span>
                          </div>
                          <span className="text-[10px] text-slate-400 block">
                            Includes Wi-Fi & spa access
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setPreviewModalRoom(room)}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs font-semibold"
                            title="Quick View Details"
                          >
                            <Maximize2 className="w-4 h-4" />
                          </button>

                          {/* Reservation button: if available, book it. If reserved, disabled notice */}
                          {isAvailable ? (
                            <button
                              onClick={() => handleSelectRoom(room)}
                              className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all active:scale-95 flex items-center gap-1.5"
                            >
                              <span>Reserve</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <button
                              disabled
                              className="px-3 py-2 rounded-lg bg-slate-800/60 text-slate-400 text-xs font-semibold cursor-not-allowed border border-slate-700/50"
                              title="This room is currently reserved for the selected dates."
                            >
                              Reserved
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
