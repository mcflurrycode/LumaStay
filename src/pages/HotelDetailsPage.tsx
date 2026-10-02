import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { HotelStructureView } from '../components/HotelStructureView';
import { 
  Building2, 
  Layers, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Waves, 
  Coffee, 
  Dumbbell, 
  HeartPulse, 
  Compass, 
  Car, 
  Wifi, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { HOTEL_INFO, HOTEL_FLOORS } from '../data/hotelData';

export const HotelDetailsPage: React.FC = () => {
  const { setCurrentPage, navigateTo } = useHotel();
  const [activeTab, setActiveTab] = useState<'architecture' | 'story' | 'amenities' | 'policies' | 'location'>('architecture');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
          <Building2 className="w-4 h-4" />
          <span>The Property & Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Hotel Details & Structural Design
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          LumaStay was conceived from the ground up to reconsider modern hospitality. Discover our 6-floor structural zoning, acoustic buffering, and wellness amenities.
        </p>

        {/* Tab Switcher */}
        <div className="flex overflow-x-auto gap-2 pt-4 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'architecture'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white'
            }`}
          >
            Hotel Structure (6 Levels)
          </button>
          <button
            onClick={() => setActiveTab('story')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'story'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white'
            }`}
          >
            Background & Origin Story
          </button>
          <button
            onClick={() => setActiveTab('amenities')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'amenities'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white'
            }`}
          >
            Amenities & Wellness
          </button>
          <button
            onClick={() => setActiveTab('policies')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'policies'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white'
            }`}
          >
            Policies & Quiet Hours
          </button>
          <button
            onClick={() => setActiveTab('location')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'location'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white'
            }`}
          >
            Location & Access
          </button>
        </div>
      </div>

      {/* Tab 1: Architecture & Hotel Structure (Giving major space to structure) */}
      {activeTab === 'architecture' && (
        <div className="space-y-12">
          {/* Interactive Structural Explorer */}
          <HotelStructureView />

          {/* Architectural Blueprint Matrix */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              Structural Specifications & Elevation Matrix
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {HOTEL_FLOORS.map((floor) => (
                <div 
                  key={floor.floorNumber}
                  className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      Level {floor.floorNumber}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {floor.elevation}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    {floor.name.split('·')[1]?.trim() || floor.name}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {floor.description}
                  </p>
                  <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Acoustics:</span>
                    <span className="text-slate-200 font-semibold">{floor.noiseLevel}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Background & Origin Story */}
      {activeTab === 'story' && (
        <div className="space-y-12">
          {/* Main Story Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-10">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Our Foundation & Vision
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Architectural Integrity Meets Accessible Urban Calm
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                LumaStay was founded by a team of studio architects, environmental planners, and sound engineers who believed that true luxury is not about velvet ropes or crystal chandeliers — it is about pure acoustic silence, abundant daylight, and effortless transparency.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Located in the Waterfront Arts District, every square meter of LumaStay was intentionally scaled to human proportions: no sterile echoing hallways, no artificial perfumes, and no hidden resort fees.
              </p>
            </div>

            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-72 border border-slate-800">
              <img 
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80" 
                alt="LumaStay Architecture"
                className="w-full h-full object-cover filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-xs text-white">
                <span className="font-bold block">142 Lumina Way, Waterfront Arts District</span>
                <span className="text-slate-300 text-[11px]">Completed in 2024 · Designed for Living</span>
              </div>
            </div>
          </div>

          {/* The 4 Architectural Pillars */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">The Four Guiding Principles of LumaStay</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold text-sm">
                  01
                </div>
                <h4 className="text-lg font-bold text-white">Solar Luma & Natural Circadian Light</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  The name "Luma" reflects our commitment to natural illumination. Our building envelope incorporates an 8-meter high central glass atrium, open sky-decks, and plant-draped balconies to optimize natural circadian rhythms for sound sleep and refreshing mornings.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-400/10 text-sky-400 flex items-center justify-center font-bold text-sm">
                  02
                </div>
                <h4 className="text-lg font-bold text-white">Acoustic Shielding & Decibel Sanity</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  We insulated every floor with vibration-dampening acoustic subfloors and triple-paned exterior glazing. Guest suites average an ambient sound level under 32 decibels — quieter than a residential library.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-400/10 text-emerald-400 flex items-center justify-center font-bold text-sm">
                  03
                </div>
                <h4 className="text-lg font-bold text-white">Transparent, Unpretentious Hospitality</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  High design does not have to be expensive or snobbish. We eliminated opaque booking policies, arbitrary facility charges, and hidden resort taxes. What you see is exactly what you get.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-400/10 text-teal-400 flex items-center justify-center font-bold text-sm">
                  04
                </div>
                <h4 className="text-lg font-bold text-white">Guest Privacy by Architecture</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  When you reserve a room at LumaStay, our public inventory marks it as reserved for transparency to other travelers, but never exposes your personal name, itinerary, or contact information.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Amenities */}
      {activeTab === 'amenities' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Waves className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white">Level 6 Sky Terrace & Infinity Plunge Pool</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Situated 24 meters above the boulevard, our open-air heated pool offers sweeping city vistas. Cushioned daybeds, complimentary sun towels, and sunset mocktails served until 10:00 PM.
            </p>
            <ul className="text-xs text-slate-400 space-y-2 pt-2">
              <li>• Heated year-round to a soothing 29°C (84°F)</li>
              <li>• Quiet adult swim hours: 7:00 AM – 9:00 AM & 8:00 PM – 10:00 PM</li>
              <li>• Acoustic wind-baffle glass keeps the terrace tranquil</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
              <HeartPulse className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white">Level 2 Hydrotherapy & Finnish Cedar Sauna</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Designed according to traditional Nordic thermal cycles. Alternate between the 85°C dry cedar sauna, eucalyptus steam bath, and refreshing cold rainfall plunge showers.
            </p>
            <ul className="text-xs text-slate-400 space-y-2 pt-2">
              <li>• Complimentary for all resident hotel guests</li>
              <li>• Organic herbal tea infusion station</li>
              <li>• Lockers, robes, and shower amenities provided</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Coffee className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white">Level 1 Luma Artisan Bistro & Coffee Lab</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Our ground-floor community hub serves single-origin pour-overs, fresh butter croissants, seasonal harvest bowls, and craft evening aperitifs.
            </p>
            <ul className="text-xs text-slate-400 space-y-2 pt-2">
              <li>• Breakfast Buffet: 7:00 AM – 10:30 AM</li>
              <li>• All-day Coffee & Light Fare: 7:00 AM – 8:00 PM</li>
              <li>• In-room breakfast delivery available via your booking add-ons</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <Dumbbell className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white">24/7 TechnoGym Conditioning Studio</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Equipped with connected cardio rowers, treadmills, dumbbell racks up to 30kg, kettlebells, and dedicated stretching and yoga mats.
            </p>
            <ul className="text-xs text-slate-400 space-y-2 pt-2">
              <li>• 24-hour secure digital key access</li>
              <li>• Chilled filtered water and sanitizing stations</li>
              <li>• Natural morning light through bamboo courtyard windows</li>
            </ul>
          </div>
        </div>
      )}

      {/* Tab 3: Policies */}
      {activeTab === 'policies' && (
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 space-y-6 max-w-4xl">
          <h3 className="text-2xl font-bold text-white">LumaStay Policies & House Harmony</h3>
          
          <div className="space-y-4 text-xs sm:text-sm text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <h4 className="font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                Check-In & Check-Out Times
              </h4>
              <p className="text-slate-400">
                Check-in begins at <strong>3:00 PM</strong>. Check-out is by <strong>11:00 AM</strong>. Need more time? Late 2:00 PM checkout can be requested during reservation.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <h4 className="font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Acoustic Quiet Hours (10:00 PM – 7:00 AM)
              </h4>
              <p className="text-slate-400">
                To guarantee restful sleep for all travelers, Levels 3, 4, 5, and 6 observe designated quiet hours. Hallway noise is strictly monitored.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <h4 className="font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Transparent Cancellation Policy
              </h4>
              <p className="text-slate-400">
                Reservations can be freely cancelled up to 24 hours prior to check-in directly through your "My Bookings" portal, instantly returning the room to the public inventory.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <h4 className="font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Non-Smoking Sanctuary
              </h4>
              <p className="text-slate-400">
                LumaStay is a 100% smoke-free property across all rooms, indoor corridors, and balconies. Designated outdoor garden points are available at ground level.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Location */}
      {activeTab === 'location' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white">In the Heart of the Waterfront District</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Positioned on Lumina Way, just 4 minutes from the shoreline promenade and surrounded by contemporary art galleries, artisan bakeries, and transport links.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold block">Waterfront Arts Promenade</span>
                <span className="text-slate-400">350 meters · 4 min walk</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold block">Central Light Rail Station</span>
                <span className="text-slate-400">600 meters · 7 min walk (Direct to Airport)</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold block">Metropolitan International Airport</span>
                <span className="text-slate-400">18 km · 25 min drive via express shuttle</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-3xl border border-slate-800 bg-slate-900 overflow-hidden p-6 space-y-4">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Car className="w-4 h-4 text-amber-400" />
              Arrival & EV Charging Valet
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Underground secure parking is available for guests with Level 2 EV charging stations. Complimentary luggage drop-off is open 24 hours at the Level 1 Grand Atrium concierge.
            </p>
            <div className="h-48 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center p-4">
              <MapPin className="w-8 h-8 text-amber-400 mb-2" />
              <span className="text-sm font-bold text-white">{HOTEL_INFO.address}</span>
              <span className="text-xs text-slate-400 mt-1">Latitude: 37.7749° N · Longitude: 122.4194° W</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA to Rooms */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-white">Ready to choose your room level?</h3>
          <p className="text-xs text-slate-400 mt-1">Browse our real-time availability across all 6 architectural floors.</p>
        </div>
        <button
          onClick={() => setCurrentPage('rooms')}
          className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md shadow-amber-500/20 transition-all flex items-center gap-2"
        >
          <span>Select a Room</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
