import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { 
  Building2, 
  Calendar, 
  Users, 
  Bed, 
  ShieldCheck, 
  CreditCard, 
  Sparkles, 
  ArrowLeft, 
  Check, 
  Coffee, 
  Clock, 
  Car, 
  HeartPulse, 
  Lock,
  ChevronRight
} from 'lucide-react';
import { Room } from '../types/hotel';

export const BookingCheckoutPage: React.FC = () => {
  const { 
    selectedRoomForBooking, 
    setCurrentPage, 
    filters, 
    createBooking, 
    currentUser,
    openAuthModal,
    rooms
  } = useHotel();

  // If no room selected, fallback to the first available room or redirect
  const room: Room = selectedRoomForBooking || rooms.find(r => r.status === 'available') || rooms[0];

  // Stay Dates
  const [checkIn, setCheckIn] = useState(filters.checkIn);
  const [checkOut, setCheckOut] = useState(filters.checkOut);
  const [guestsCount, setGuestsCount] = useState(filters.guests || 2);

  // Guest details (pre-fill if logged in)
  const [guestName, setGuestName] = useState(currentUser?.name || 'Alex Morgan');
  const [guestEmail, setGuestEmail] = useState(currentUser?.email || 'alex.morgan@lumastay.com');
  const [guestPhone, setGuestPhone] = useState(currentUser?.phone || '+1 (555) 234-8901');
  const [specialRequests, setSpecialRequests] = useState('');

  // Add-ons
  const [addOns, setAddOns] = useState({
    breakfast: true,
    airportShuttle: false,
    lateCheckout: false,
    spaPass: true,
  });

  // Payment simulated state
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pay_at_hotel' | 'digital_wallet'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 9842');
  const [cardExpiry, setCardExpiry] = useState('09/28');
  const [cardCvc, setCardCvc] = useState('382');
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate nights
  const calculateNights = () => {
    try {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 1;
    } catch {
      return 1;
    }
  };

  const nights = calculateNights();

  // Prices
  const roomTotal = room.pricePerNight * nights;
  
  // Addon costs
  const breakfastCost = addOns.breakfast ? 20 * nights * guestsCount : 0;
  const shuttleCost = addOns.airportShuttle ? 35 : 0;
  const lateCheckoutCost = addOns.lateCheckout ? 30 : 0;
  const spaPassCost = addOns.spaPass ? 25 * nights : 0;
  
  const addOnsTotal = breakfastCost + shuttleCost + lateCheckoutCost + spaPassCost;
  const taxTotal = Math.round((roomTotal + addOnsTotal) * 0.12 * 100) / 100;
  const totalAmount = Math.round((roomTotal + addOnsTotal + taxTotal) * 100) / 100;

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      await createBooking({
        roomId: room.id,
        roomNumber: room.number,
        roomName: room.name,
        roomCategory: room.category,
        roomImage: room.images[0],
        floor: room.floor,
        checkIn,
        checkOut,
        nights,
        guestsCount,
        guestName,
        guestEmail,
        guestPhone,
        specialRequests,
        addOns,
        roomTotal,
        taxTotal,
        addOnsTotal,
        totalAmount,
        paymentMethod,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Navigation Back */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentPage('rooms')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Rooms Catalog</span>
        </button>

        {!currentUser && (
          <div className="text-xs text-slate-400">
            Have an account?{' '}
            <button
              onClick={() => openAuthModal('login')}
              className="text-amber-400 font-bold hover:underline"
            >
              Sign In to prefill info
            </button>
          </div>
        )}
      </div>

      {/* Main Grid: Form on Left, Summary on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Guest info, Stay Dates, Addons & Payment */}
        <div className="lg:col-span-7 space-y-8">
          
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
              Reservation Checkout
            </span>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Complete Your Reservation
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Instant confirmation. When finalized, your room is marked as reserved for these dates.
            </p>
          </div>

          <form onSubmit={handleSubmitBooking} className="space-y-8">
            
            {/* 1. Stay Schedule Verification */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                1. Stay Schedule
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Check-in Date</label>
                  <input
                    type="date"
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Check-out Date</label>
                  <input
                    type="date"
                    required
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Total Guests</label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400"
                  >
                    {[...Array(room.capacity)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? 'Guest' : 'Guests'} (Max {room.capacity})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="text-[11px] text-amber-400 font-medium">
                {nights} {nights === 1 ? 'Night' : 'Nights'} stay selected
              </div>
            </div>

            {/* 2. Guest Information */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" />
                2. Guest Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300">Full Name</label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Enter guest full name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Email Address (for Confirmation)</label>
                  <input
                    type="email"
                    required
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300">
                    Special Requests or Arrival Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="E.g., High quiet floor preference, late arrival after 8 PM, extra hypoallergenic pillows..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* 3. Add-on Services */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  3. Enhance Your Stay (Add-ons)
                </h2>
                <span className="text-[11px] text-slate-400">Optional</span>
              </div>

              <div className="space-y-3">
                {/* Breakfast */}
                <label className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  addOns.breakfast 
                    ? 'bg-amber-950/20 border-amber-500/40 text-white' 
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={addOns.breakfast}
                      onChange={(e) => setAddOns({ ...addOns, breakfast: e.target.checked })}
                      className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                    />
                    <div>
                      <div className="text-xs font-bold flex items-center gap-2">
                        <Coffee className="w-3.5 h-3.5 text-amber-400" />
                        <span>Daily Artisan Breakfast Buffet</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Fresh pastries, warm sourdough, eggs to order & single-origin coffee on Level 1.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-400 whitespace-nowrap ml-4">
                    +$20 / guest / day
                  </span>
                </label>

                {/* Hydrotherapy Spa Pass */}
                <label className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  addOns.spaPass 
                    ? 'bg-amber-950/20 border-amber-500/40 text-white' 
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={addOns.spaPass}
                      onChange={(e) => setAddOns({ ...addOns, spaPass: e.target.checked })}
                      className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                    />
                    <div>
                      <div className="text-xs font-bold flex items-center gap-2">
                        <HeartPulse className="w-3.5 h-3.5 text-amber-400" />
                        <span>Unlimited Hydrotherapy & Cedar Sauna Pass</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Full access to thermal dipping pools, eucalyptus steam and herbal relaxation lounge on Level 2.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-400 whitespace-nowrap ml-4">
                    +$25 / day
                  </span>
                </label>

                {/* Late 2PM Checkout */}
                <label className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  addOns.lateCheckout 
                    ? 'bg-amber-950/20 border-amber-500/40 text-white' 
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={addOns.lateCheckout}
                      onChange={(e) => setAddOns({ ...addOns, lateCheckout: e.target.checked })}
                      className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                    />
                    <div>
                      <div className="text-xs font-bold flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>Guaranteed Late 2:00 PM Check-Out</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Standard checkout is 11:00 AM. Sleep in or enjoy an extra swim before leaving.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-400 whitespace-nowrap ml-4">
                    +$30 flat
                  </span>
                </label>

                {/* Airport Shuttle Express */}
                <label className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  addOns.airportShuttle 
                    ? 'bg-amber-950/20 border-amber-500/40 text-white' 
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={addOns.airportShuttle}
                      onChange={(e) => setAddOns({ ...addOns, airportShuttle: e.target.checked })}
                      className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                    />
                    <div>
                      <div className="text-xs font-bold flex items-center gap-2">
                        <Car className="w-3.5 h-3.5 text-amber-400" />
                        <span>Airport Shuttle Express (Private Transfer)</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Direct EV executive vehicle transfer between LumaStay and International Airport.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-400 whitespace-nowrap ml-4">
                    +$35 flat
                  </span>
                </label>
              </div>
            </div>

            {/* 4. Payment Selection */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-amber-400" />
                4. Payment Method
              </h2>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-slate-800 text-amber-300 border-amber-500/50 shadow-sm'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Credit / Debit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('digital_wallet')}
                  className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                    paymentMethod === 'digital_wallet'
                      ? 'bg-slate-800 text-amber-300 border-amber-500/50 shadow-sm'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Apple / Google Pay
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('pay_at_hotel')}
                  className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                    paymentMethod === 'pay_at_hotel'
                      ? 'bg-slate-800 text-amber-300 border-amber-500/50 shadow-sm'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Pay on Arrival
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-3 pt-2">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300 font-semibold">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4242 4242 4242 4242"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-300 font-semibold">Expiry Date</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-slate-300 font-semibold">Security CVC</label>
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="CVC"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'digital_wallet' && (
                <div className="p-4 rounded-xl bg-slate-950 text-center text-xs text-slate-300 border border-slate-800">
                  Quick touch payment will be requested upon clicking Complete Reservation below.
                </div>
              )}

              {paymentMethod === 'pay_at_hotel' && (
                <div className="p-4 rounded-xl bg-slate-950 text-xs text-slate-300 border border-slate-800 space-y-1">
                  <p className="font-semibold text-white">No advance charge required today.</p>
                  <p className="text-slate-400">Payment will be settled at the Level 1 reception concierge during your check-in.</p>
                </div>
              )}
            </div>

            {/* Privacy note & Submit button */}
            <div className="space-y-4">
              <div className="flex items-start gap-2.5 text-xs text-slate-400 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p>
                  By completing this reservation, your room ({room.number}) will immediately become <strong>Reserved</strong> on LumaStay. For privacy protection, other visitors will only see that it is reserved, without any personal guest names or contact information exposed.
                </p>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-base shadow-xl shadow-amber-500/20 transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Securing Reservation...</span>
                ) : (
                  <>
                    <span>Confirm & Book Stay · ${totalAmount}</span>
                    <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

        {/* Right Column: Sticky Room & Price Breakdown Summary */}
        <div className="lg:col-span-5 sticky top-28 space-y-4">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl">
            
            {/* Room Image */}
            <div className="relative h-48 w-full bg-slate-950">
              <img 
                src={room.images[0]} 
                alt={room.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/20"></div>

              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-950/80 text-amber-300 border border-slate-700">
                    Room {room.number}
                  </span>
                  <span className="text-xs text-slate-300 ml-2">
                    Level {room.floor} · {room.wing}
                  </span>
                </div>
                <span className="text-xs font-bold text-white bg-slate-950/80 px-2 py-0.5 rounded border border-slate-700">
                  {room.viewType}
                </span>
              </div>
            </div>

            {/* Room Info */}
            <div className="p-6 space-y-5">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {room.name}
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                  <span>{room.bedType}</span>
                  <span>·</span>
                  <span>{room.capacity} Guests Max</span>
                  <span>·</span>
                  <span>{room.sizeSqm} m²</span>
                </div>
              </div>

              {/* Price Breakdown Matrix */}
              <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>${room.pricePerNight} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
                  <span className="font-semibold text-white">${roomTotal}</span>
                </div>

                {addOns.breakfast && (
                  <div className="flex justify-between text-slate-400">
                    <span>Artisan Breakfast ({nights} nights × {guestsCount} guests)</span>
                    <span className="text-slate-200">+${breakfastCost}</span>
                  </div>
                )}

                {addOns.spaPass && (
                  <div className="flex justify-between text-slate-400">
                    <span>Level 2 Hydrotherapy Pass ({nights} nights)</span>
                    <span className="text-slate-200">+${spaPassCost}</span>
                  </div>
                )}

                {addOns.lateCheckout && (
                  <div className="flex justify-between text-slate-400">
                    <span>Late 2:00 PM Check-Out</span>
                    <span className="text-slate-200">+${lateCheckoutCost}</span>
                  </div>
                )}

                {addOns.airportShuttle && (
                  <div className="flex justify-between text-slate-400">
                    <span>Airport Transfer Shuttle</span>
                    <span className="text-slate-200">+${shuttleCost}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-400">
                  <span>Taxes, Tourism Fee & Resort Service (12%)</span>
                  <span className="text-slate-200">${taxTotal}</span>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-bold text-white block">Total Stay Price</span>
                    <span className="text-[11px] text-slate-400">All fees & taxes included</span>
                  </div>
                  <span className="text-2xl font-extrabold text-amber-400">
                    ${totalAmount}
                  </span>
                </div>
              </div>

              {/* Inclusions summary */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5 text-[11px] text-slate-400">
                <div className="flex items-center gap-2 text-slate-300 font-semibold">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Complimentary with your reservation:</span>
                </div>
                <p>• Ultra-high speed 500 Mbps Wi-Fi</p>
                <p>• Rooftop heated infinity splash pool access (Level 6)</p>
                <p>• 24/7 TechnoGym & wellness studio access</p>
              </div>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
