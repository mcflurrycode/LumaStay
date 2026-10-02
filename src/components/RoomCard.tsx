import React from 'react';
import { useHotel } from '../context/HotelContext';
import { 
  Users, 
  Bed, 
  Maximize2, 
  Star, 
  CheckCircle2, 
  Eye, 
  ArrowRight,
  Wifi,
  Sparkles,
  Lock
} from 'lucide-react';
import { Room } from '../types/hotel';

interface RoomCardProps {
  room: Room;
  onSelect?: () => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, onSelect }) => {
  const { setSelectedRoomForBooking, setPreviewModalRoom, setCurrentPage } = useHotel();
  const isAvailable = room.status === 'available';

  const handleBookClick = () => {
    if (!isAvailable) return;
    setSelectedRoomForBooking(room);
    if (onSelect) {
      onSelect();
    } else {
      setCurrentPage('booking');
    }
  };

  return (
    <div 
      className={`rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden relative ${
        isAvailable
          ? 'bg-slate-900 border-slate-800 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/5 group'
          : 'bg-slate-950/70 border-slate-800/80 opacity-85'
      }`}
    >
      {/* Top Image Section */}
      <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-950">
        <img 
          src={room.images[0]} 
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/30"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-amber-300 border border-slate-700/80 text-xs font-mono font-bold">
              Room {room.number}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-slate-300 border border-slate-700/80 text-xs font-medium">
              Lvl {room.floor}
            </span>
          </div>

          {/* Availability Status Badge */}
          {isAvailable ? (
            <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Available
            </span>
          ) : (
            // CRITICAL PRIVACY CONSTRAINT: Just show that it's reserved, NO personal info of person booked it
            <span className="px-2.5 py-1 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-slate-400" />
              Reserved
            </span>
          )}
        </div>

        {/* Bottom Image Overlay Tag: View type & Rating */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
          <span className="text-slate-200 font-medium bg-slate-950/70 backdrop-blur-sm px-2.5 py-1 rounded-md border border-slate-800">
            {room.viewType}
          </span>
          <div className="flex items-center gap-1 bg-slate-950/70 backdrop-blur-sm px-2.5 py-1 rounded-md border border-slate-800 text-amber-400 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{room.rating.toFixed(2)}</span>
            <span className="text-slate-400 font-normal">({room.reviewsCount})</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Category & Wing Subtitle */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="capitalize text-amber-400/90 font-semibold">{room.category}</span>
            <span>·</span>
            <span>{room.wing}</span>
          </div>

          {/* Medium text: Room Name */}
          <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
            {room.name}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {room.description}
          </p>

          {/* Specs grid */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800/80 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span className="truncate">{room.capacity} Guests</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span className="truncate">{room.bedType}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>{room.sizeSqm} m²</span>
            </div>
          </div>

          {/* Key Amenities Snippet */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {room.amenities.slice(0, 3).map((amenity, i) => (
              <span 
                key={i}
                className="text-[11px] px-2 py-0.5 rounded bg-slate-800/60 text-slate-300 border border-slate-700/50"
              >
                {amenity}
              </span>
            ))}
            {room.amenities.length > 3 && (
              <span className="text-[11px] px-1.5 py-0.5 text-slate-400">
                +{room.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Footer: Pricing & Action Buttons */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-white">
                ${room.pricePerNight}
              </span>
              <span className="text-xs text-slate-400 font-medium">/ night</span>
            </div>
            {room.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                ${room.originalPrice}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPreviewModalRoom(room)}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1"
              title="Inspect details and gallery"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Details</span>
            </button>

            {isAvailable ? (
              <button
                onClick={handleBookClick}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all active:scale-95 flex items-center gap-1.5"
              >
                <span>Book Stay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              // Disabled for reserved rooms with clean notice
              <button
                disabled
                className="px-3.5 py-2 rounded-lg bg-slate-800/80 text-slate-400 text-xs font-medium cursor-not-allowed border border-slate-700/50"
                title="This room is currently reserved."
              >
                Reserved
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
