export type RoomCategory = 'studio' | 'deluxe' | 'suite' | 'family' | 'penthouse';

export type RoomStatus = 'available' | 'reserved';

export interface Room {
  id: string;
  number: string;
  name: string;
  category: RoomCategory;
  floor: number;
  wing: 'North Wing' | 'South Wing' | 'Sky Deck' | 'Atrium Wing';
  pricePerNight: number;
  originalPrice?: number;
  capacity: number;
  bedType: string;
  sizeSqm: number;
  viewType: 'Skyline City' | 'Courtyard Zen Garden' | 'Atrium Sunset' | 'Panoramic Horizon';
  description: string;
  amenities: string[];
  images: string[];
  status: RoomStatus;
  rating: number;
  reviewsCount: number;
  featured?: boolean;
}

export interface HotelFloor {
  floorNumber: number;
  name: string;
  subtitle: string;
  description: string;
  facilities: string[];
  noiseLevel: 'Ultra Quiet' | 'Quiet & Serene' | 'Lively & Social';
  elevation: string;
  roomIds: string[];
  colorHex: string;
  image: string;
}

export interface BookingAddOn {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  selected: boolean;
}

export interface Booking {
  id: string;
  bookingCode: string; // e.g. LMS-4921
  roomId: string;
  roomNumber: string;
  roomName: string;
  roomCategory: RoomCategory;
  roomImage: string;
  floor: number;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  nights: number;
  guestsCount: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
  addOns: {
    breakfast: boolean;
    airportShuttle: boolean;
    lateCheckout: boolean;
    spaPass: boolean;
  };
  roomTotal: number;
  taxTotal: number;
  addOnsTotal: number;
  totalAmount: number;
  status: 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  paymentMethod: 'card' | 'pay_at_hotel' | 'digital_wallet';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipTier: 'Luma Standard' | 'Luma Silver' | 'Luma Gold Privileged';
  points: number;
  avatarUrl?: string;
  preferredFloor?: string;
  dietaryPreferences?: string;
}

export interface SearchFilters {
  checkIn: string;
  checkOut: string;
  guests: number;
  category: string;
  floor: number | 'all';
  maxPrice: number;
  view: string;
  onlyAvailable: boolean;
  searchQuery: string;
}

export type PageView = 
  | 'home' 
  | 'search' 
  | 'details' 
  | 'rooms' 
  | 'booking' 
  | 'confirmation' 
  | 'profile';
