import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { 
  X, 
  Users, 
  Bed, 
  Maximize2, 
  Star, 
  Check, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronRight, 
  ChevronLeft,
  ArrowRight,
  Clock,
  Sparkles,
  Lock
} from 'lucide-react';

export const RoomModal: React.FC = () => {
  const { 
    previewModalRoom, 
    setPreviewModalRoom, 
    setSelectedRoomForBooking, 
    setCurrentPage 
  } = useHotel();

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!previewModalRoom) return null;

  const room = previewModalRoom;
  const isAvailable = room.status === 'available';

  const handleBookNow = () => {
    if (!isAvailable) return;
    setSelectedRoomForBooking(room);
    setPreviewModalRoom(null);
    setCurrentPage('booking');
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Button */}
        <button
          onClick={() => setPreviewModalRoom(null)}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-950/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Image Carousel */}
          <div className="lg:col-span-7 bg-slate-950 flex flex-col justify-between p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-slate-800">
            <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden group">
              <img 
                src={room.images[activeImageIndex]} 
                alt={`${room.name} photo ${activeImageIndex + 1}`}
                className="w-full h-full object-cover transition-transform duration-500"
              />

              {/* Status Banner */}
              <div className="absolute top-3 left-3">
                {isAvailable ? (
                  <span className="px-3 py-1.5 rounded-lg bg-emerald-950/90 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5 shadow-md">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Available for Reservation
                  </span>
                ) : (
                  // PRIVACY: Show that room is reserved, without any personal info
                  <span className="px-3 py-1.5 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 shadow-md">
                    <Lock className="w-4 h-4 text-slate-400" />
                    Currently Reserved
                  </span>
                )}
              </div>

              {/* Carousel navigation controls if multiple images */}
              {room.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-950/70 border border-slate-700 text-white flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-950/70 border border-slate-700 text-white flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail dots / previews */}
            {room.images.length > 1 && (
              <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
                {room.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImageIndex === idx 
                        ? 'border-amber-400 scale-105' 
                        : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Room Details & Action */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category, Floor & Room Number */}
              <div className="flex items-center gap-2 text-xs">
                <span className="font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  Room {room.number}
                </span>
                <span className="text-slate-400 font-medium">
                  Level {room.floor} · {room.wing}
                </span>
              </div>

              {/* Big Text Title */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {room.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{room.rating.toFixed(2)}</span>
                </div>
                <span>·</span>
                <span>{room.reviewsCount} verified guest reviews</span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {room.description}
              </p>

              {/* Key Specs Card */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Occupancy</span>
                  <span className="text-slate-200 font-semibold">{room.capacity} Guests</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Bed Setup</span>
                  <span className="text-slate-200 font-semibold">{room.bedType}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Room Area</span>
                  <span className="text-slate-200 font-semibold">{room.sizeSqm} m² ({Math.round(room.sizeSqm * 10.76)} sq ft)</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Outlook</span>
                  <span className="text-slate-200 font-semibold">{room.viewType}</span>
                </div>
              </div>

              {/* Amenities Checklist */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Included In-Room Amenities
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                  {room.amenities.map((am, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span className="truncate">{am}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stay policies reminder */}
              <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Check-in: 3:00 PM · Check-out: 11:00 AM · Free Wi-Fi included</span>
              </div>
            </div>

            {/* Bottom Booking Action Box */}
            <div className="pt-6 border-t border-slate-800 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-extrabold text-white">
                      ${room.pricePerNight}
                    </span>
                    <span className="text-sm text-slate-400">/ night</span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Transparent pricing, all resort fees included
                  </span>
                </div>
              </div>

              {isAvailable ? (
                <button
                  onClick={handleBookNow}
                  className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <span>Proceed to Reservation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="space-y-2">
                  <button
                    disabled
                    className="w-full py-3 px-4 rounded-xl bg-slate-800 text-slate-400 font-semibold text-sm cursor-not-allowed border border-slate-700"
                  >
                    Room Currently Reserved
                  </button>
                  <p className="text-[11px] text-center text-slate-400">
                    This specific room is occupied for the current schedule. Please choose another available room or check alternate dates.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
