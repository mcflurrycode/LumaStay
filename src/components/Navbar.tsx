import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { 
  Building2, 
  CalendarDays, 
  User, 
  Menu, 
  X, 
  Layers, 
  DoorOpen, 
  Sparkles, 
  Compass, 
  LogOut, 
  ChevronDown,
  BedDouble
} from 'lucide-react';
import { PageView } from '../types/hotel';

export const Navbar: React.FC = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    currentUser, 
    logoutUser, 
    openAuthModal, 
    bookings 
  } = useHotel();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Active bookings count
  const activeBookingsCount = bookings.filter(b => b.status === 'confirmed').length;

  const handleNavClick = (page: PageView) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo - Typography hierarchy: Big hotel name */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans flex items-center gap-1.5">
                LumaStay
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block animate-pulse"></span>
              </span>
              <span className="text-[11px] font-medium tracking-widest uppercase text-slate-400">
                Architectural Hotel & Suites
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${
                currentPage === 'home'
                  ? 'text-amber-400 bg-amber-400/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              Overview
            </button>

            <button
              onClick={() => handleNavClick('rooms')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-1.5 ${
                currentPage === 'rooms'
                  ? 'text-amber-400 bg-amber-400/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <BedDouble className="w-4 h-4 text-amber-400" />
              Rooms & Rates
            </button>

            <button
              onClick={() => handleNavClick('details')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-1.5 ${
                currentPage === 'details'
                  ? 'text-amber-400 bg-amber-400/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Layers className="w-4 h-4 text-amber-400" />
              Hotel Structure
            </button>

            <button
              onClick={() => handleNavClick('search')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-1.5 ${
                currentPage === 'search'
                  ? 'text-amber-400 bg-amber-400/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Compass className="w-4 h-4 text-amber-400" />
              Find Room
            </button>
          </nav>

          {/* Right Action: Bookings & Auth */}
          <div className="hidden md:flex items-center gap-3">
            {/* My Bookings Button */}
            <button
              onClick={() => handleNavClick('profile')}
              className={`relative px-3.5 py-2 rounded-lg text-sm font-medium border flex items-center gap-2 transition-all ${
                currentPage === 'profile'
                  ? 'bg-slate-800 text-amber-300 border-amber-500/40 shadow-sm'
                  : 'bg-slate-900/80 text-slate-200 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <CalendarDays className="w-4 h-4 text-amber-400" />
              <span>My Bookings</span>
              {activeBookingsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center">
                  {activeBookingsCount}
                </span>
              )}
            </button>

            {/* User Profile or Login Trigger */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-left transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center font-bold text-sm">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="hidden lg:flex flex-col">
                    <span className="text-xs font-semibold text-white leading-tight">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] text-amber-400/90 font-medium leading-none">
                      {currentUser.membershipTier}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3 py-2 border-b border-slate-800/80 mb-1">
                      <p className="text-xs font-semibold text-white">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                      <p className="text-[10px] text-amber-400 mt-1 font-medium">
                        {currentUser.points} Loyalty Points
                      </p>
                    </div>

                    <button
                      onClick={() => handleNavClick('profile')}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:bg-slate-800 hover:text-white flex items-center gap-2"
                    >
                      <User className="w-3.5 h-3.5 text-amber-400" />
                      Manage Account & Preferences
                    </button>

                    <button
                      onClick={() => handleNavClick('profile')}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:bg-slate-800 hover:text-white flex items-center gap-2"
                    >
                      <CalendarDays className="w-3.5 h-3.5 text-amber-400" />
                      Reservation History
                    </button>

                    <div className="my-1 border-t border-slate-800"></div>

                    <button
                      onClick={() => {
                        logoutUser();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-red-400 hover:bg-red-950/40 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => openAuthModal('register')}
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 transition-all active:scale-95"
                >
                  Create Account
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('profile')}
              className="relative p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg"
              title="My Bookings"
            >
              <CalendarDays className="w-5 h-5 text-amber-400" />
              {activeBookingsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                  {activeBookingsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`p-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
                currentPage === 'home'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-slate-900 text-slate-300 border border-slate-800'
              }`}
            >
              <Building2 className="w-4 h-4 text-amber-400" />
              Overview
            </button>

            <button
              onClick={() => handleNavClick('rooms')}
              className={`p-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
                currentPage === 'rooms'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-slate-900 text-slate-300 border border-slate-800'
              }`}
            >
              <BedDouble className="w-4 h-4 text-amber-400" />
              Rooms & Rates
            </button>

            <button
              onClick={() => handleNavClick('details')}
              className={`p-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
                currentPage === 'details'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-slate-900 text-slate-300 border border-slate-800'
              }`}
            >
              <Layers className="w-4 h-4 text-amber-400" />
              Hotel Structure
            </button>

            <button
              onClick={() => handleNavClick('search')}
              className={`p-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
                currentPage === 'search'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-slate-900 text-slate-300 border border-slate-800'
              }`}
            >
              <Compass className="w-4 h-4 text-amber-400" />
              Find Room
            </button>
          </div>

          <div className="pt-2 border-t border-slate-800">
            {currentUser ? (
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-white">{currentUser.name}</p>
                    <p className="text-xs text-amber-400">{currentUser.membershipTier} · {currentUser.points} pts</p>
                  </div>
                  <button
                    onClick={() => handleNavClick('profile')}
                    className="text-xs font-semibold px-3 py-1.5 rounded-md bg-slate-800 text-slate-200"
                  >
                    View Account
                  </button>
                </div>
                <button
                  onClick={() => {
                    logoutUser();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2 text-xs font-semibold text-red-400 hover:text-red-300"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('login');
                  }}
                  className="w-full py-2.5 rounded-lg text-xs font-bold bg-slate-900 border border-slate-800 text-white"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('register');
                  }}
                  className="w-full py-2.5 rounded-lg text-xs font-bold bg-amber-500 text-slate-950"
                >
                  Create Account
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
