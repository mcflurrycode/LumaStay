import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { 
  User, 
  CalendarDays, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  AlertCircle, 
  CheckCircle2, 
  X, 
  ArrowRight, 
  Building2, 
  Edit3, 
  Trash2, 
  RotateCcw,
  Sliders,
  Award
} from 'lucide-react';
import { Booking } from '../types/hotel';

export const UserProfilePage: React.FC = () => {
  const { 
    currentUser, 
    bookings, 
    cancelBooking, 
    setCurrentPage, 
    openAuthModal, 
    loginUser,
    updateUserProfile
  } = useHotel();

  const [activeTab, setActiveTab] = useState<'bookings' | 'profile' | 'preferences'>('bookings');
  const [bookingFilter, setBookingFilter] = useState<'all' | 'active' | 'cancelled'>('active');
  const [cancellingBookingId, setCancellingBookingId] = useState<string | null>(null);

  // Edit profile state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editEmail, setEditEmail] = useState(currentUser?.email || '');
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '');
  const [editFloor, setEditFloor] = useState(currentUser?.preferredFloor || 'Floor 5 (High View)');

  if (!currentUser) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 text-amber-400 flex items-center justify-center mx-auto">
          <User className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-white">Guest Access Required</h1>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Please sign in or create an account to view your active room reservations, digital keycard, and guest preferences.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => openAuthModal('login')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20"
          >
            Sign In to Existing Account
          </button>
          <button
            onClick={() => loginUser('alex.morgan@lumastay.com', 'Alex Morgan')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-semibold text-xs"
          >
            One-Click Demo Guest (Alex Morgan)
          </button>
        </div>
      </div>
    );
  }

  // Filter bookings
  const filteredBookings = bookings.filter((b) => {
    if (bookingFilter === 'active') return b.status === 'confirmed';
    if (bookingFilter === 'cancelled') return b.status === 'cancelled';
    return true;
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: editName,
      email: editEmail,
      phone: editPhone,
      preferredFloor: editFloor,
    });
    setIsEditingProfile(false);
  };

  const confirmCancel = () => {
    if (!cancellingBookingId) return;
    cancelBooking(cancellingBookingId);
    setCancellingBookingId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* User Header Profile Banner */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {currentUser.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[11px] font-bold">
                {currentUser.membershipTier}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {currentUser.email} · {currentUser.phone}
            </p>
          </div>
        </div>

        {/* Loyalty Balance & Quick Stats */}
        <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
          <div className="space-y-0.5">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
              LumaStay Points
            </span>
            <span className="text-xl font-extrabold text-amber-400">
              {currentUser.points} pts
            </span>
          </div>
          <div className="h-8 w-px bg-slate-800"></div>
          <div className="space-y-0.5">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
              Active Stays
            </span>
            <span className="text-xl font-extrabold text-white">
              {bookings.filter(b => b.status === 'confirmed').length}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'bookings'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'bg-slate-900 text-slate-300 hover:text-white'
          }`}
        >
          <CalendarDays className="w-3.5 h-3.5" />
          <span>My Reservations ({bookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('preferences')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'preferences'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'bg-slate-900 text-slate-300 hover:text-white'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Stay Preferences</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'profile'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'bg-slate-900 text-slate-300 hover:text-white'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Profile Details</span>
        </button>
      </div>

      {/* Tab Content: Bookings */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          {/* Sub-filter chips */}
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setBookingFilter('active')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                bookingFilter === 'active'
                  ? 'bg-slate-800 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white'
              }`}
            >
              Upcoming & Active ({bookings.filter(b => b.status === 'confirmed').length})
            </button>
            <button
              onClick={() => setBookingFilter('cancelled')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                bookingFilter === 'cancelled'
                  ? 'bg-slate-800 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white'
              }`}
            >
              Cancelled Stays ({bookings.filter(b => b.status === 'cancelled').length})
            </button>
            <button
              onClick={() => setBookingFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                bookingFilter === 'all'
                  ? 'bg-slate-800 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white'
              }`}
            >
              All History ({bookings.length})
            </button>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <CalendarDays className="w-10 h-10 text-slate-500 mx-auto" />
              <h3 className="text-lg font-bold text-white">No Reservations In This View</h3>
              <p className="text-xs text-slate-400">
                You don't have any bookings matching this status.
              </p>
              <button
                onClick={() => setCurrentPage('rooms')}
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
              >
                Browse Available Rooms
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((b) => {
                const isConfirmed = b.status === 'confirmed';

                return (
                  <div 
                    key={b.id}
                    className={`rounded-2xl border p-5 sm:p-6 transition-all ${
                      isConfirmed
                        ? 'bg-slate-900 border-slate-800 shadow-md'
                        : 'bg-slate-950/60 border-slate-900 text-slate-400 opacity-75'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
                      
                      <div className="flex items-center gap-3">
                        <img 
                          src={b.roomImage} 
                          alt={b.roomName}
                          className="w-16 h-16 rounded-xl object-cover border border-slate-800"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                              {b.bookingCode}
                            </span>
                            <span className="text-xs text-slate-400">
                              Room {b.roomNumber} · Level {b.floor}
                            </span>
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                            {b.roomName}
                          </h3>
                        </div>
                      </div>

                      {/* Status indicator */}
                      <div>
                        {isConfirmed ? (
                          <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            Confirmed Reservation
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-xs font-semibold">
                            Cancelled (Room Released)
                          </span>
                        )}
                      </div>

                    </div>

                    {/* Schedule Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 text-xs">
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Check-in</span>
                        <span className="text-slate-200 font-bold">{b.checkIn}</span>
                        <span className="text-slate-400 block text-[10px]">3:00 PM</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Check-out</span>
                        <span className="text-slate-200 font-bold">{b.checkOut}</span>
                        <span className="text-slate-400 block text-[10px]">11:00 AM</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Duration</span>
                        <span className="text-slate-200 font-bold">{b.nights} Nights</span>
                        <span className="text-slate-400 block text-[10px]">{b.guestsCount} Guests</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Total</span>
                        <span className="text-amber-400 font-bold text-sm">${b.totalAmount}</span>
                        <span className="text-slate-400 block text-[10px]">Taxes incl.</span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="text-slate-400 text-[11px]">
                        Reserved under: <strong className="text-slate-200">{b.guestName}</strong>
                      </div>

                      <div className="flex items-center gap-2">
                        {isConfirmed && (
                          <button
                            onClick={() => setCancellingBookingId(b.id)}
                            className="px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/60 text-xs font-semibold flex items-center gap-1 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Cancel Stay</span>
                          </button>
                        )}

                        <button
                          onClick={() => {
                            setCurrentPage('confirmation');
                          }}
                          className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
                        >
                          View Receipt
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab Content: Preferences */}
      {activeTab === 'preferences' && (
        <div className="max-w-2xl rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white">Your Stay Preferences</h2>
            <p className="text-xs text-slate-400">
              These preferences will be automatically applied to your future room bookings.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Floor Level Preference</label>
              <select
                value={editFloor}
                onChange={(e) => setEditFloor(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400"
              >
                <option value="Floor 5 or 6 (Executive / Penthouse Skyline)">High Elevation (Level 5 or 6 Skyline)</option>
                <option value="Floor 3 (Botanical Garden View)">Mid Floor (Level 3 Botanical Courtyard)</option>
                <option value="Floor 1 or 2 (Quick Wellness & Atrium Access)">Ground / Low Elevation (Level 1 or 2)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Pillow & Bedding Setup</label>
              <select
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400"
              >
                <option>Hypoallergenic Natural Goose Down</option>
                <option>Acoustic Memory Foam Contour</option>
                <option>Organic Buckwheat Firm Pillow</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Quiet Zone Setting</label>
              <p className="text-[11px] text-slate-400">
                Prioritize rooms located farthest from elevator banks.
              </p>
              <div className="flex items-center gap-2 pt-1 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Ultra-Quiet Wing placement enabled</span>
              </div>
            </div>

            <button
              onClick={() => alert('Preferences saved!')}
              className="mt-4 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}

      {/* Tab Content: Profile details */}
      {activeTab === 'profile' && (
        <div className="max-w-2xl rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Account Information</h2>
              <p className="text-xs text-slate-400">Personal details stored safely</p>
            </div>
            {!isEditingProfile && (
              <button
                onClick={() => setIsEditingProfile(true)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            )}
          </div>

          {isEditingProfile ? (
            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Email Address</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Phone Number</label>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Full Name</span>
                <span className="text-white font-bold text-sm">{currentUser.name}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Email Address</span>
                <span className="text-white font-bold text-sm">{currentUser.email}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Contact Phone</span>
                <span className="text-white font-bold text-sm">{currentUser.phone}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Cancellation Safety Confirmation Modal */}
      {cancellingBookingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-800 text-red-400 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Cancel This Reservation?</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cancelling will release your reserved room back to <strong>Available</strong> status on the hotel's architectural floor map for other guests to book.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <button
                onClick={() => setCancellingBookingId(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
              >
                Keep Reservation
              </button>
              <button
                onClick={confirmCancel}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md shadow-red-600/20"
              >
                Yes, Cancel Stay
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
