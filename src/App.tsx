import React from 'react';
import { HotelProvider, useHotel } from './context/HotelContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { HotelSearchPage } from './pages/HotelSearchPage';
import { HotelDetailsPage } from './pages/HotelDetailsPage';
import { RoomSelectionPage } from './pages/RoomSelectionPage';
import { BookingCheckoutPage } from './pages/BookingCheckoutPage';
import { BookingConfirmationPage } from './pages/BookingConfirmationPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { RoomModal } from './components/RoomModal';
import { AuthModal } from './components/AuthModal';

const AppContent: React.FC = () => {
  const { currentPage } = useHotel();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'search' && <HotelSearchPage />}
        {currentPage === 'details' && <HotelDetailsPage />}
        {currentPage === 'rooms' && <RoomSelectionPage />}
        {currentPage === 'booking' && <BookingCheckoutPage />}
        {currentPage === 'confirmation' && <BookingConfirmationPage />}
        {currentPage === 'profile' && <UserProfilePage />}
      </main>

      {/* Global Modals */}
      <RoomModal />
      <AuthModal />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <HotelProvider>
      <AppContent />
    </HotelProvider>
  );
}
