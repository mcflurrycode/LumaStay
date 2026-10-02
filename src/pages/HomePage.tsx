import React from 'react';
import { useHotel } from '../context/HotelContext';
import { HotelStructureView } from '../components/HotelStructureView';
import { RoomCard } from '../components/RoomCard';
import { 
  Building2, 
  Sparkles, 
  ArrowRight, 
  Star, 
  Waves, 
  Coffee, 
  HeartPulse, 
  Layers, 
  Eye, 
  Compass, 
  BedDouble,
  ChevronDown
} from 'lucide-react';
import { HOTEL_INFO, HOTEL_AMENITIES_LIST } from '../data/hotelData';

export const HomePage: React.FC = () => {
  const { rooms, setCurrentPage } = useHotel();

  // Curated showcase rooms (3 featured rooms)
  const featuredRooms = rooms.filter(r => r.featured).slice(0, 3);

  const scrollToStructure = () => {
    const el = document.getElementById('hotel-structure-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section - Pure Hotel Viewing (No check-in or check-out inputs) */}
      <section className="relative min-h-[82vh] flex items-center justify-center pt-10 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Architectural Background Image with dark slate gradient */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85" 
            alt="LumaStay Architecture"
            className="w-full h-full object-cover object-center filter brightness-[0.38]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950"></div>
          {/* Subtle warm glow orb */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Architecture Kicker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-amber-500/30 text-amber-300 text-xs font-semibold backdrop-blur-md shadow-lg shadow-amber-500/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Modern Architectural Hotel & Quiet Urban Living</span>
          </div>

          {/* Big Text Typography: Hotel Name & Hero Title */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] font-sans">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">LumaStay</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
              Explore the architectural design, light-filled spaces, and acoustic tranquility across 6 distinct vertical levels.
            </p>
          </div>

          {/* Hotel Viewing Quick Actions (Pure Viewing Experience) */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
            <button
              onClick={scrollToStructure}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Layers className="w-4 h-4 stroke-[2.5]" />
              <span>Explore Hotel Structure</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage('rooms')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-sm border border-slate-700/80 transition-all flex items-center justify-center gap-2"
            >
              <BedDouble className="w-4 h-4 text-amber-400" />
              <span>View All Rooms</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Architectural Viewing Highlights */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto text-left">
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm">
              <span className="text-xs font-mono font-bold text-amber-400 block">Level 6</span>
              <span className="text-xs font-bold text-white block mt-0.5">Sky Terrace & Pool</span>
              <span className="text-[11px] text-slate-400">Heated open-air pool</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm">
              <span className="text-xs font-mono font-bold text-amber-400 block">Level 3-5</span>
              <span className="text-xs font-bold text-white block mt-0.5">Acoustic Suites</span>
              <span className="text-[11px] text-slate-400">Soundproof sanctuaries</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm">
              <span className="text-xs font-mono font-bold text-amber-400 block">Level 2</span>
              <span className="text-xs font-bold text-white block mt-0.5">Hydrotherapy Spa</span>
              <span className="text-[11px] text-slate-400">Cedar sauna & pools</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm">
              <span className="text-xs font-mono font-bold text-amber-400 block">Level 1</span>
              <span className="text-xs font-bold text-white block mt-0.5">Grand Sun Atrium</span>
              <span className="text-[11px] text-slate-400">Artisan cafe & library</span>
            </div>
          </div>

        </div>
      </section>

      {/* Main Structural Showcase (Giving Major Space to the Hotel's Structure) */}
      <section id="hotel-structure-showcase" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <HotelStructureView />
      </section>

      {/* Featured Rooms Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
              Handpicked Selections
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Featured Rooms & Suites
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Thoughtfully proportioned sanctuaries designed with natural oak, organic linens, and noise isolation.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('rooms')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>View All Rooms</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>

      {/* Background About LumaStay Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="border-b border-slate-800 pb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Background & Architectural Heritage</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            The Story Behind LumaStay
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mt-2 leading-relaxed">
            Born from a desire to strip away cold corporate excess and exorbitant boutique pricing, LumaStay was founded on two essential human needs: natural daylight and acoustic peace.
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Origin Story & Philosophy */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <span className="text-xs font-mono font-bold text-amber-400">01 / The Origin</span>
                <h3 className="text-xl font-bold text-white">Why LumaStay Came to Be</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In 2024, our founding collective of urban architects and acoustic designers set out to rethink metropolitan hospitality. Too many modern hotels fall into two traps: sterile, echoing corporate towers or ostentatious luxury properties that charge exorbitant rates for gold-leaf vanity and noisy lobbies.
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  LumaStay was conceived as an antidote: an honest sanctuary in the Waterfront Arts District where refined architecture, warm organic oak, and soundproof serenity are delivered at an approachable price.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
                  <span className="text-xs font-mono font-bold text-amber-400">02 / "Luma" (Daylight)</span>
                  <h4 className="text-base font-bold text-white">Oriented to Solar Cycles</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Every floor is built around an 8-meter soaring glass atrium and open sky terraces, bathing common areas and rooms in natural, circadian-supportive light.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
                  <span className="text-xs font-mono font-bold text-sky-400">03 / "Stay" (Acoustic Calm)</span>
                  <h4 className="text-base font-bold text-white">Engineered for Deep Sleep</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Triple-insulated exterior glass, vibration dampeners between floor slabs, and sound-baffled guest wings maintain a 32-decibel library-quiet ambient atmosphere.
                  </p>
                </div>
              </div>
            </div>

            {/* Core Values Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
              <div>
                <span className="text-2xl font-extrabold text-amber-400 block font-mono">6</span>
                <span className="text-[11px] text-slate-400">Zoned Levels</span>
              </div>
              <div>
                <span className="text-2xl font-extrabold text-white block font-mono">32 dB</span>
                <span className="text-[11px] text-slate-400">In-Room Quiet</span>
              </div>
              <div>
                <span className="text-2xl font-extrabold text-emerald-400 block font-mono">100%</span>
                <span className="text-[11px] text-slate-400">Renewable Heated</span>
              </div>
              <div>
                <span className="text-2xl font-extrabold text-amber-400 block font-mono">$0</span>
                <span className="text-[11px] text-slate-400">Surprise Fees</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Architectural Showcase */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 flex-1 min-h-[320px] bg-slate-950">
              <img 
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80" 
                alt="LumaStay Architecture" 
                className="w-full h-full object-cover filter brightness-[0.75] hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  Material Palette
                </span>
                <h4 className="text-xl font-bold text-white leading-snug">
                  Natural Ash, Smoked Cedar, Raw Stone & Living Bamboo
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We hand-selected renewable timber and non-toxic mineral washes so the tactile feel of every room is grounding and effortless.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-300">Want to inspect technical specs and level layouts?</span>
              <button
                onClick={() => setCurrentPage('details')}
                className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center gap-1 transition-colors"
              >
                <span>Read Full Specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Property Experience Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Curated Living
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Designed for Rest, Focus & Recreation
          </h2>
          <p className="text-sm text-slate-300">
            From sunrise plunges on Level 6 to slow pour-over coffees in the Level 1 Grand Atrium.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {HOTEL_AMENITIES_LIST.map((item, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 px-2.5 py-1 rounded-md bg-amber-400/10 border border-amber-400/20">
                  {item.level}
                </span>
                <span className="text-[11px] text-slate-400">
                  {item.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">
                {item.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Architectural Concept Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-xl space-y-4 relative z-10">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              LumaStay Architectural Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Calm simplicity without excessive grandeur.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              We eliminated marble hallways and unnecessary formality in favor of human proportions, natural cross-ventilation, warm acoustic cedar, and architectural clarity.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => setCurrentPage('details')}
                className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center gap-2"
              >
                <span>Read Architectural Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage('rooms')}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors"
              >
                <span>Browse All Rooms</span>
              </button>
            </div>
          </div>

          {/* Decorative background visual */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80" 
              alt="Interiors"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Guest Reviews Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Guest Experiences
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              What Guests Say About Staying at LumaStay
            </h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-300 bg-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
              <strong className="text-white">4.92 / 5</strong>
            </div>
            <span>· 840+ verified stays</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex text-amber-400 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
              "The structural layout is brilliant. You can see exactly which floor you're booking and the acoustic isolation made it the quietest hotel sleep I've had all year."
            </p>
            <div className="pt-2 border-t border-slate-800/80">
              <span className="text-xs font-bold text-white block">Marcus Sterling</span>
              <span className="text-[11px] text-slate-400 block">Stayed in Suite 501 (Executive Wing)</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex text-amber-400 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
              "We loved the rooftop infinity plunge pool on Level 6 and the direct botanical courtyard on Level 3. Booking took under two minutes with complete transparency."
            </p>
            <div className="pt-2 border-t border-slate-800/80">
              <span className="text-xs font-bold text-white block">Sophia Chen</span>
              <span className="text-[11px] text-slate-400 block">Stayed in Deluxe Room 301</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex text-amber-400 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
              "No generic corporate hotel vibe. The architecture feels intentional, warm, and approachable. Also appreciate that reserved rooms show clean status without leaking info."
            </p>
            <div className="pt-2 border-t border-slate-800/80">
              <span className="text-xs font-bold text-white block">David & Chloe Miller</span>
              <span className="text-[11px] text-slate-400 block">Stayed in Family Studio 401</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
