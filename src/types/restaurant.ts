export type MenuCategory = 'all' | 'pasta' | 'pizza' | 'starters' | 'sides' | 'desserts' | 'beverages';

export type SpiceLevel = 'none' | 'mild' | 'medium' | 'hot';

export interface MenuItemCustomizationOption {
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  italianName?: string;
  description: string;
  price: number;
  category: 'pasta' | 'pizza' | 'starters' | 'sides' | 'desserts' | 'beverages';
  image: string;
  isVegetarian: boolean;
  isSpecialty?: boolean;
  isBestseller?: boolean;
  spiceLevel: SpiceLevel;
  isAvailable: boolean;
  allergens?: string[];
  preparationTimeMinutes?: number;
  availableSauces?: string[];
}

export interface CartCustomization {
  sauce?: string;
  spiceLevel?: SpiceLevel;
  extraCheese?: boolean;
  selectedAddOns?: string[];
  specialInstructions?: string;
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  quantity: number;
  customization?: CartCustomization;
  unitPrice: number;
  totalPrice: number;
}

export type OrderType = 'delivery' | 'takeaway';

export type OrderStatus =
  | 'Order Received'
  | 'Confirmed'
  | 'Preparing'
  | 'Ready for Pickup or Out for Delivery'
  | 'Delivered or Collected'
  | 'Cancelled';

export type PaymentMethod = 'cod' | 'upi';

export interface OrderCustomerInfo {
  name: string;
  phone: string;
  email?: string;
  address?: string;
  locality?: string;
  landmark?: string;
  deliveryInstructions?: string;
  pickupTime?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  type: OrderType;
  status: OrderStatus;
  items: CartItem[];
  customer: OrderCustomerInfo;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Pending' | 'Paid' | 'Collected on Delivery';
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  promoCodeApplied?: string;
  total: number;
  estimatedTime: string;
  adminNotes?: string;
}

export type ReservationStatus = 'Pending Confirmation' | 'Confirmed' | 'Completed' | 'Cancelled';

export type SeatingPreference = 'Main Dining Hall' | 'Window Garden View' | 'Romantic Veranda' | 'Family Booth' | 'Private Alcove';

export type DiningOccasion = 'Casual Dining' | 'Birthday Celebration' | 'Anniversary' | 'Romantic Date' | 'Family Gathering' | 'Business Meeting';

export interface Reservation {
  id: string;
  reservationNumber: string;
  createdAt: string;
  name: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  guests: number;
  seatingPreference: SeatingPreference;
  occasion: DiningOccasion;
  specialRequests?: string;
  status: ReservationStatus;
  tableNumber?: string;
}

export interface RestaurantReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  comment: string;
  date: string;
  isVerifiedGuest: boolean;
}

export interface PromoCode {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  description: string;
  isActive: boolean;
}

export interface RestaurantSettings {
  name: string;
  tagline: string;
  address: string;
  locality: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  whatsapp: string;
  email: string;
  openingHours: string;
  openingDays: string;
  isOnlineOrderingOpen: boolean;
  isTableBookingOpen: boolean;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  taxRatePercent: number; // e.g. 5% GST
  minOrderValue: number;
  estimatedDeliveryMins: string;
  estimatedPreparationMins: string;
  maxTableCapacity: number;
  adminPin: string; // for staff access
  instagramUrl: string;
  facebookUrl: string;
}
