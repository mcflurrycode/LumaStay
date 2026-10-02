import React from 'react';
import { useHotel } from '../context/HotelContext';
import { 
  CheckCircle2, 
  Building2, 
  Calendar, 
  Clock, 
  MapPin, 
  Printer, 
  CalendarPlus, 
  ShieldCheck, 
  ArrowRight,
  QrCode,
  Sparkles,
  BedDouble,
  Layers,
  Phone
} from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export const BookingConfirmationPage: React.FC = () => {
  const { activeConfirmedBooking, bookings, setCurrentPage } = useHotel();

  // If no active confirmed booking, take the most recent one
  const booking = activeConfirmedBooking || bookings[0];

  if (!booking) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">No Active Reservation Found</h2>
        <p className="text-slate-400 text-sm">Please select a room to create a reservation.</p>
        <button
          onClick={() => setCurrentPage('rooms')}
          className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
        >
          Browse Available Rooms
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`LumaStay Hotel Stay - Room ${booking.roomNumber}`);
    const details = encodeURIComponent(`Booking Reference: ${booking.bookingCode}\nRoom: ${booking.roomName}\nLevel: ${booking.floor}\nAddress: ${HOTEL_INFO.address}`);
    const location = encodeURIComponent(HOTEL_INFO.address);
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Success Celebration Header */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
          <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
        </div>
        <div className="space-y-1">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            Reservation Secured
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            You're All Set for LumaStay!
          </h1>
          <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Your booking confirmation has been issued. A receipt has been dispatched to <strong>{booking.guestEmail}</strong>.
          </p>
        </div>
      </div>

      {/* Main Reservation Voucher Card */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl relative">
        
        {/* Top Voucher Header */}
        <div className="p-6 sm:p-8 bg-slate-950/80 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Booking Confirmation Reference
            </span>
            <span className="text-2xl sm:text-3xl font-mono font-extrabold text-amber-400 tracking-wider">
              {booking.bookingCode}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Print Receipt</span>
            </button>
            <button
              onClick={handleAddToCalendar}
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <CalendarPlus className="w-4 h-4 text-amber-400" />
              <span>Add to Calendar</span>
            </button>
          </div>
        </div>

        {/* Voucher Body Details */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Room & Floor Highlight Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <img 
              src={booking.roomImage} 
              alt={booking.roomName}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover border border-slate-800 flex-shrink-0"
            />
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20 text-xs font-mono font-bold">
                  Room {booking.roomNumber}
                </span>
                <span className="text-xs text-slate-400">
                  Level {booking.floor}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white">
                {booking.roomName}
              </h2>
              <p className="text-xs text-slate-400">
                LumaStay Waterfront · {HOTEL_INFO.address}
              </p>
            </div>

            {/* Simulated Digital Key Check-in QR */}
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-900 border border-slate-800 self-stretch sm:self-auto">
              <QrCode className="w-12 h-12 text-amber-400" />
              <span className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">
                Fast Check-in
              </span>
            </div>
          </div>

          {/* Schedule & Guest Data Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 space-y-1">
              <span className="text-slate-500 uppercase tracking-wider text-[10px] block">Check-In</span>
              <span className="text-sm font-bold text-white block">{booking.checkIn}</span>
              <span className="text-slate-400">From 3:00 PM</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 space-y-1">
              <span className="text-slate-500 uppercase tracking-wider text-[10px] block">Check-Out</span>
              <span className="text-sm font-bold text-white block">{booking.checkOut}</span>
              <span className="text-slate-400">{booking.addOns.lateCheckout ? 'Late 2:00 PM' : 'By 11:00 AM'}</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 space-y-1">
              <span className="text-slate-500 uppercase tracking-wider text-[10px] block">Duration</span>
              <span className="text-sm font-bold text-white block">{booking.nights} {booking.nights === 1 ? 'Night' : 'Nights'}</span>
              <span className="text-slate-400">{booking.guestsCount} {booking.guestsCount === 1 ? 'Guest' : 'Guests'}</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 space-y-1">
              <span className="text-slate-500 uppercase tracking-wider text-[10px] block">Total Amount</span>
              <span className="text-base font-extrabold text-amber-400 block">${booking.totalAmount}</span>
              <span className="text-emerald-400 font-medium">Guaranteed Rate</span>
            </div>
          </div>

          {/* Add-ons & Inclusions */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Confirmed Package Perks & Inclusions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Level 6 Sky Terrace & Heated Plunge Pool Access</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>24/7 TechnoGym & Conditioning Studio</span>
              </div>
              {booking.addOns.breakfast && (
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/60">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>Daily Artisan Breakfast Buffet (Level 1)</span>
                </div>
              )}
              {booking.addOns.spaPass && (
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/60">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>Unlimited Hydrotherapy & Cedar Sauna Access</span>
                </div>
              )}
              {booking.addOns.lateCheckout && (
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/60">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>Extended 2:00 PM Check-Out</span>
                </div>
              )}
              {booking.addOns.airportShuttle && (
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/60">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>Executive Airport Express Transfer</span>
                </div>
              )}
            </div>
          </div>

          {/* Privacy Confirmation Notice */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3 text-xs text-slate-400">
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-white font-semibold block">
                Public Inventory Updated
              </span>
              <p>
                Room {booking.roomNumber} is now marked as <strong>Reserved</strong> on the LumaStay public architectural plan. Your name ({booking.guestName}), contact email, and booking rates remain completely private and will never be shown to other visitors.
              </p>
            </div>
          </div>

        </div>

        {/* Voucher Footer Action */}
        <div className="p-6 sm:p-8 bg-slate-950/80 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Questions? Contact our 24/7 Concierge at <strong className="text-white">{HOTEL_INFO.phone}</strong>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage('home')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
            >
              Back to Homepage
            </button>
            <button
              onClick={() => setCurrentPage('profile')}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5"
            >
              <span>View in My Bookings</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
