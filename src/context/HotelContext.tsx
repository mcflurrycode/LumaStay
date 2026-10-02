import React, { createContext, useContext, useState, useEffect } from 'react';
import { Room, HotelFloor, Booking, UserProfile, SearchFilters, PageView } from '../types/hotel';
import { HOTEL_FLOORS, INITIAL_ROOMS, INITIAL_BOOKINGS, INITIAL_USER } from '../data/hotelData';

interface HotelContextType {
  // Navigation
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  navigateTo: (page: PageView, options?: { floor?: number; roomId?: string }) => void;

  // Data
  rooms: Room[];
  floors: HotelFloor[];
  
  // Selection & Modals
  selectedRoomForBooking: Room | null;
  setSelectedRoomForBooking: (room: Room | null) => void;
  previewModalRoom: Room | null;
  setPreviewModalRoom: (room: Room | null) => void;
  selectedFloorForHighlight: number | null;
  setSelectedFloorForHighlight: (floor: number | null) => void;

  // Search & Filtering
  filters: SearchFilters;
  updateFilters: (updates: Partial<SearchFilters>) => void;
  resetFilters: () => void;
  filteredRooms: Room[];

  // Bookings
  bookings: Booking[];
  activeConfirmedBooking: Booking | null;
  createBooking: (bookingData: Omit<Booking, 'id' | 'bookingCode' | 'createdAt' | 'status'>) => Promise<Booking>;
  cancelBooking: (bookingId: string) => void;
  getRoomById: (id: string) => Room | undefined;

  // Auth & User
  currentUser: UserProfile | null;
  loginUser: (email: string, name?: string) => void;
  registerUser: (name: string, email: string, phone: string) => void;
  logoutUser: () => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalTab: 'login' | 'register' | 'forgot';
  setAuthModalTab: (tab: 'login' | 'register' | 'forgot') => void;
  openAuthModal: (tab?: 'login' | 'register' | 'forgot') => void;
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

// Helper for default search dates (Check in tomorrow, checkout 3 days later)
const getDefaultDates = () => {
  const checkIn = new Date();
  checkIn.setDate(checkIn.getDate() + 3);
  const checkOut = new Date(checkIn);
  checkOut.setDate(checkOut.getDate() + 2);
  
  return {
    checkIn: checkIn.toISOString().split('T')[0],
    checkOut: checkOut.toISOString().split('T')[0],
  };
};

const defaultDates = getDefaultDates();

const initialFilters: SearchFilters = {
  checkIn: defaultDates.checkIn,
  checkOut: defaultDates.checkOut,
  guests: 2,
  category: 'all',
  floor: 'all',
  maxPrice: 450,
  view: 'all',
  onlyAvailable: false,
  searchQuery: '',
};

export const HotelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPageRaw] = useState<PageView>('home');
  const [floors] = useState<HotelFloor[]>(HOTEL_FLOORS);
  
  // Persistent rooms state
  const [rooms, setRooms] = useState<Room[]>(() => {
    try {
      const saved = localStorage.getItem('lumastay_rooms_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_ROOMS;
  });

  // Persistent bookings state
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('lumastay_bookings_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_BOOKINGS;
  });

  // User state
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('lumastay_user_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_USER;
  });

  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<Room | null>(null);
  const [previewModalRoom, setPreviewModalRoom] = useState<Room | null>(null);
  const [selectedFloorForHighlight, setSelectedFloorForHighlight] = useState<number | null>(null);
  const [activeConfirmedBooking, setActiveConfirmedBooking] = useState<Booking | null>(null);

  // Auth modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register' | 'forgot'>('login');

  // Search Filters
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);

  // Sync rooms to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('lumastay_rooms_v1', JSON.stringify(rooms));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [rooms]);

  // Sync bookings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('lumastay_bookings_v1', JSON.stringify(bookings));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [bookings]);

  // Sync user to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('lumastay_user_v1', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('lumastay_user_v1');
      }
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [currentUser]);

  const setCurrentPage = (page: PageView) => {
    setCurrentPageRaw(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (page: PageView, options?: { floor?: number; roomId?: string }) => {
    if (options?.floor !== undefined) {
      setSelectedFloorForHighlight(options.floor);
      setFilters(prev => ({ ...prev, floor: options.floor! }));
    }
    if (options?.roomId) {
      const r = rooms.find(item => item.id === options.roomId);
      if (r) setPreviewModalRoom(r);
    }
    setCurrentPage(page);
  };

  const updateFilters = (updates: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...updates }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const openAuthModal = (tab: 'login' | 'register' | 'forgot' = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const loginUser = (email: string, name?: string) => {
    const newUser: UserProfile = {
      id: 'usr-' + Date.now(),
      name: name || (email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)),
      email: email,
      phone: '+1 (555) 912-3841',
      membershipTier: 'Luma Standard',
      points: 250,
      preferredFloor: 'Floor 4 or 5',
    };
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
  };

  const registerUser = (name: string, email: string, phone: string) => {
    const newUser: UserProfile = {
      id: 'usr-' + Date.now(),
      name,
      email,
      phone: phone || '+1 (555) 000-0000',
      membershipTier: 'Luma Standard',
      points: 500,
      preferredFloor: 'Any Level',
    };
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    if (!currentUser) return;
    setCurrentUser(prev => prev ? ({ ...prev, ...updates }) : null);
  };

  // Create booking: mark room reserved, persist booking, navigate to confirmation
  const createBooking = async (
    bookingData: Omit<Booking, 'id' | 'bookingCode' | 'createdAt' | 'status'>
  ): Promise<Booking> => {
    const randomCode = 'LMS-' + Math.floor(10000 + Math.random() * 90000);
    const newBooking: Booking = {
      ...bookingData,
      id: 'bkg-' + Date.now(),
      bookingCode: randomCode,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'confirmed',
    };

    // Update room status to "reserved"
    setRooms(prevRooms =>
      prevRooms.map(room =>
        room.id === bookingData.roomId ? { ...room, status: 'reserved' } : room
      )
    );

    // Append to bookings
    setBookings(prev => [newBooking, ...prev]);
    setActiveConfirmedBooking(newBooking);

    // If user is logged in, reward loyalty points
    if (currentUser) {
      setCurrentUser(prev => prev ? ({
        ...prev,
        points: prev.points + Math.round(newBooking.totalAmount / 10),
      }) : null);
    }

    setCurrentPage('confirmation');
    return newBooking;
  };

  // Cancel booking: mark booking cancelled & free room status back to "available"
  const cancelBooking = (bookingId: string) => {
    const targetBooking = bookings.find(b => b.id === bookingId);
    if (!targetBooking) return;

    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
    );

    // Reopen room availability!
    setRooms(prevRooms =>
      prevRooms.map(room =>
        room.id === targetBooking.roomId ? { ...room, status: 'available' } : room
      )
    );
  };

  const getRoomById = (id: string) => {
    return rooms.find(r => r.id === id);
  };

  // Filtered rooms calculation
  const filteredRooms = rooms.filter(room => {
    // Only available filter
    if (filters.onlyAvailable && room.status !== 'available') return false;

    // Floor filter
    if (filters.floor !== 'all' && room.floor !== filters.floor) return false;

    // Category filter
    if (filters.category !== 'all' && room.category !== filters.category) return false;

    // Guests capacity
    if (room.capacity < filters.guests) return false;

    // Price
    if (room.pricePerNight > filters.maxPrice) return false;

    // View filter
    if (filters.view !== 'all' && !room.viewType.toLowerCase().includes(filters.view.toLowerCase())) {
      return false;
    }

    // Text search
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const matchName = room.name.toLowerCase().includes(q);
      const matchNumber = room.number.toLowerCase().includes(q);
      const matchDesc = room.description.toLowerCase().includes(q);
      const matchWing = room.wing.toLowerCase().includes(q);
      if (!matchName && !matchNumber && !matchDesc && !matchWing) return false;
    }

    return true;
  });

  return (
    <HotelContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        navigateTo,
        rooms,
        floors,
        selectedRoomForBooking,
        setSelectedRoomForBooking,
        previewModalRoom,
        setPreviewModalRoom,
        selectedFloorForHighlight,
        setSelectedFloorForHighlight,
        filters,
        updateFilters,
        resetFilters,
        filteredRooms,
        bookings,
        activeConfirmedBooking,
        createBooking,
        cancelBooking,
        getRoomById,
        currentUser,
        loginUser,
        registerUser,
        logoutUser,
        updateUserProfile,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        openAuthModal,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};
