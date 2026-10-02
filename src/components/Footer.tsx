import React from 'react';
import { useHotel } from '../context/HotelContext';
import { Building2, MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export const Footer: React.FC = () => {
  const { setCurrentPage } = useHotel();

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand & Architecture Story */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">
                LumaStay
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              {HOTEL_INFO.description}
            </p>

            <div className="space-y-2 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{HOTEL_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{HOTEL_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{HOTEL_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Explore Hotel
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setCurrentPage('home')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Overview & Highlights
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('details')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Architectural Structure
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('rooms')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Available Rooms & Suites
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('search')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Live Reservation Finder
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('details')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Amenities & Facilities
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Guest Services & Policies */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Hospitality & Stay
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-200 font-medium block">Check-in: 3:00 PM</span>
                  <span className="text-slate-400 block">Check-out: 11:00 AM</span>
                </div>
              </div>
              <p className="text-slate-400 pt-1">
                24/7 Front desk concierge, complimentary high-speed Wi-Fi throughout, and soundproof rooms.
              </p>
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium pt-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Encrypted Guest Privacy</span>
              </div>
            </div>
          </div>

          {/* Col 5: Architectural Levels Summary */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Vertical Layout
            </h4>
            <div className="space-y-1.5 text-xs text-slate-400">
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span>Lvl 6</span>
                <span className="text-slate-300">Sky Terrace & Pool</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span>Lvl 5</span>
                <span className="text-slate-300">Executive Suites</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span>Lvl 4</span>
                <span className="text-slate-300">Panorama & Family</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span>Lvl 3</span>
                <span className="text-slate-300">Botanical Deluxe</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span>Lvl 2</span>
                <span className="text-slate-300">Hydrotherapy Spa</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Lvl 1</span>
                <span className="text-slate-300">Grand Glass Atrium</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} LumaStay Hotels & Residences. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Occupancy privacy respected: reserved rooms disclose zero guest identities.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
