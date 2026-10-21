import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MenuItem,
  CartItem,
  CartCustomization,
  Order,
  OrderType,
  PaymentMethod,
  OrderCustomerInfo,
  OrderStatus,
  Reservation,
  ReservationStatus,
  RestaurantSettings,
  PromoCode,
  RestaurantReview,
} from '../types/restaurant';
import {
  INITIAL_MENU_ITEMS,
  INITIAL_SETTINGS,
  INITIAL_PROMO_CODES,
  INITIAL_REVIEWS,
} from '../data/initialData';

interface RestaurantContextType {
  settings: RestaurantSettings;
  updateSettings: (newSettings: Partial<RestaurantSettings>) => void;
  resetSettingsToDefault: () => void;
  
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  toggleItemAvailability: (id: string) => void;

  cart: CartItem[];
  addToCart: (item: MenuItem, customization?: CartCustomization, quantity?: number) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  taxAmount: number;
  deliveryFee: number;
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  appliedPromo: PromoCode | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  discountAmount: number;
  cartTotal: number;

  orders: Order[];
  placeOrder: (
    customer: OrderCustomerInfo,
    paymentMethod: PaymentMethod
  ) => Promise<{ success: boolean; orderId: string; orderNumber: string; error?: string }>;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  getOrderById: (orderIdOrNumber: string) => Order | undefined;

  reservations: Reservation[];
  bookTable: (
    reservationData: Omit<Reservation, 'id' | 'reservationNumber' | 'createdAt' | 'status'>
  ) => Promise<{ success: boolean; reservationNumber: string; reservation: Reservation }>;
  updateReservationStatus: (id: string, newStatus: ReservationStatus) => void;
  getReservationByNumber: (num: string) => Reservation | undefined;

  reviews: RestaurantReview[];
  addReview: (review: Omit<RestaurantReview, 'id' | 'date'>) => void;

  promos: PromoCode[];
  addPromoCode: (promo: PromoCode) => void;
  deletePromoCode: (code: string) => void;

  // Navigation & Modals UI state
  activeTab: 'home' | 'menu' | 'book' | 'gallery' | 'about' | 'track' | 'admin';
  setActiveTab: (tab: 'home' | 'menu' | 'book' | 'gallery' | 'about' | 'track' | 'admin') => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  customizingItem: MenuItem | null;
  setCustomizingItem: (item: MenuItem | null) => void;
  trackingOrderId: string | null;
  setTrackingOrderId: (id: string | null) => void;
  
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SETTINGS: 'vlv_restaurant_settings_v1',
  MENU: 'vlv_restaurant_menu_v1',
  ORDERS: 'vlv_restaurant_orders_v1',
  RESERVATIONS: 'vlv_restaurant_reservations_v1',
  REVIEWS: 'vlv_restaurant_reviews_v1',
  PROMOS: 'vlv_restaurant_promos_v1',
};

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Settings State
  const [settings, setSettings] = useState<RestaurantSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  // Menu Items State
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MENU);
      return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
    } catch {
      return INITIAL_MENU_ITEMS;
    }
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Reservations State
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Reviews State
  const [reviews, setReviews] = useState<RestaurantReview[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // Promos State
  const [promos, setPromos] = useState<PromoCode[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROMOS);
      return saved ? JSON.parse(saved) : INITIAL_PROMO_CODES;
    } catch {
      return INITIAL_PROMO_CODES;
    }
  });

  // Cart & Order Flow State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);

  // UI State
  const [activeTab, setActiveTab] = useState<'home' | 'menu' | 'book' | 'gallery' | 'about' | 'track' | 'admin'>('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Auto-save state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save settings to localStorage', e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(menuItems));
    } catch (e) {
      console.warn('Failed to save menu to localStorage', e);
    }
  }, [menuItems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.warn('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
    } catch (e) {
      console.warn('Failed to save reservations to localStorage', e);
    }
  }, [reservations]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    } catch (e) {
      console.warn('Failed to save reviews to localStorage', e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROMOS, JSON.stringify(promos));
    } catch (e) {
      console.warn('Failed to save promos to localStorage', e);
    }
  }, [promos]);

  // Toast Helper
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Settings Actions
  const updateSettings = (newSettings: Partial<RestaurantSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Restaurant settings updated successfully!');
  };

  const resetSettingsToDefault = () => {
    setSettings(INITIAL_SETTINGS);
    setMenuItems(INITIAL_MENU_ITEMS);
    setPromos(INITIAL_PROMO_CODES);
    showToast('Settings & menu reset to official default');
  };

  // Menu Actions
  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: `dish-${Date.now()}`,
    };
    setMenuItems((prev) => [newItem, ...prev]);
    showToast(`Added ${item.name} to the menu!`);
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
    showToast('Menu item updated');
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Menu item removed');
  };

  const toggleItemAvailability = (id: string) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
      )
    );
  };

  // Cart Actions
  const addToCart = (
    item: MenuItem,
    customization?: CartCustomization,
    quantity: number = 1
  ) => {
    if (!item.isAvailable) {
      showToast(`${item.name} is currently sold out!`, 'error');
      return;
    }

    // Calculate customization price delta
    let unitPrice = item.price;
    if (customization?.extraCheese) unitPrice += 50;
    if (customization?.selectedAddOns && customization.selectedAddOns.length > 0) {
      unitPrice += customization.selectedAddOns.length * 35;
    }

    const cartItemId = `${item.id}-${customization?.sauce || 'default'}-${customization?.spiceLevel || 'normal'}-${customization?.extraCheese ? 'cheese' : 'nocheese'}-${(customization?.selectedAddOns || []).join('_')}`;

    setCart((prev) => {
      const existing = prev.find((ci) => ci.cartItemId === cartItemId);
      if (existing) {
        return prev.map((ci) =>
          ci.cartItemId === cartItemId
            ? {
                ...ci,
                quantity: ci.quantity + quantity,
                totalPrice: (ci.quantity + quantity) * unitPrice,
              }
            : ci
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          menuItem: item,
          quantity,
          customization,
          unitPrice,
          totalPrice: unitPrice * quantity,
        },
      ];
    });

    showToast(`Added ${item.name} to cart`);
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              totalPrice: newQty * item.unitPrice,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  // Cart Calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  const applyPromoCode = (codeText: string) => {
    const cleanCode = codeText.trim().toUpperCase();
    const found = promos.find((p) => p.code.toUpperCase() === cleanCode && p.isActive);

    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code' };
    }

    if (cartSubtotal < found.minOrderValue) {
      return {
        success: false,
        message: `Minimum order value for ${found.code} is ₹${found.minOrderValue}`,
      };
    }

    setAppliedPromo(found);
    return { success: true, message: `Promo code ${found.code} applied successfully!` };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Promo code removed', 'info');
  };

  let discountAmount = 0;
  if (appliedPromo && cartSubtotal >= appliedPromo.minOrderValue) {
    if (appliedPromo.discountType === 'percentage') {
      discountAmount = Math.round((cartSubtotal * appliedPromo.discountValue) / 100);
    } else {
      discountAmount = appliedPromo.discountValue;
    }
  }

  // Delivery fee logic
  const isDeliveryFree = orderType === 'takeaway' || cartSubtotal >= settings.freeDeliveryThreshold;
  const deliveryFee = orderType === 'delivery' ? (isDeliveryFree ? 0 : settings.deliveryFee) : 0;

  // Tax (GST)
  const taxableAmount = Math.max(0, cartSubtotal - discountAmount);
  const taxAmount = Math.round((taxableAmount * settings.taxRatePercent) / 100);

  const cartTotal = Math.max(0, taxableAmount + deliveryFee + taxAmount);

  // Place Order
  const placeOrder = async (
    customer: OrderCustomerInfo,
    paymentMethod: PaymentMethod
  ): Promise<{ success: boolean; orderId: string; orderNumber: string; error?: string }> => {
    if (!settings.isOnlineOrderingOpen) {
      return {
        success: false,
        orderId: '',
        orderNumber: '',
        error: 'Viva La Vida is currently closed for online orders. Please call us directly.',
      };
    }

    if (cart.length === 0) {
      return { success: false, orderId: '', orderNumber: '', error: 'Your cart is empty' };
    }

    if (cartSubtotal < settings.minOrderValue && orderType === 'delivery') {
      return {
        success: false,
        orderId: '',
        orderNumber: '',
        error: `Minimum order value for delivery in Gurdaspur is ₹${settings.minOrderValue}`,
      };
    }

    const orderId = `ord-${Date.now()}`;
    const orderNumber = `VLV-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder: Order = {
      id: orderId,
      orderNumber,
      createdAt: new Date().toISOString(),
      type: orderType,
      status: 'Order Received',
      items: [...cart],
      customer,
      paymentMethod,
      paymentStatus: paymentMethod === 'upi' ? 'Paid' : 'Collected on Delivery',
      subtotal: cartSubtotal,
      tax: taxAmount,
      deliveryFee,
      discount: discountAmount,
      promoCodeApplied: appliedPromo?.code,
      total: cartTotal,
      estimatedTime: orderType === 'delivery' ? settings.estimatedDeliveryMins : settings.estimatedPreparationMins,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setIsCheckoutOpen(false);
    setTrackingOrderId(orderId);
    showToast(`Order #${orderNumber} placed successfully!`, 'success');

    // Simulate order progress in background so the user can see live status updates
    setTimeout(() => {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: 'Confirmed' } : o))
      );
    }, 15000);

    setTimeout(() => {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: 'Preparing' } : o))
      );
    }, 45000);

    return { success: true, orderId, orderNumber };
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast(`Order status updated to "${newStatus}"`);
  };

  const getOrderById = (orderIdOrNumber: string) => {
    const term = orderIdOrNumber.trim().toUpperCase();
    return orders.find(
      (o) => o.id === orderIdOrNumber || o.orderNumber.toUpperCase() === term
    );
  };

  // Table Reservations
  const bookTable = async (
    reservationData: Omit<Reservation, 'id' | 'reservationNumber' | 'createdAt' | 'status'>
  ) => {
    const id = `rsv-${Date.now()}`;
    const reservationNumber = `RSV-${Math.floor(10000 + Math.random() * 90000)}`;

    const newReservation: Reservation = {
      ...reservationData,
      id,
      reservationNumber,
      createdAt: new Date().toISOString(),
      status: 'Pending Confirmation',
    };

    setReservations((prev) => [newReservation, ...prev]);
    showToast(`Table reservation request #${reservationNumber} received!`, 'success');

    return { success: true, reservationNumber, reservation: newReservation };
  };

  const updateReservationStatus = (id: string, newStatus: ReservationStatus) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    showToast(`Reservation #${id} is now ${newStatus}`);
  };

  const getReservationByNumber = (num: string) => {
    const term = num.trim().toUpperCase();
    return reservations.find(
      (r) => r.reservationNumber.toUpperCase() === term || r.id === num
    );
  };

  // Reviews
  const addReview = (newReview: Omit<RestaurantReview, 'id' | 'date'>) => {
    const review: RestaurantReview = {
      ...newReview,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setReviews((prev) => [review, ...prev]);
    showToast('Grazie mille! Thank you for sharing your review.');
  };

  // Promos
  const addPromoCode = (promo: PromoCode) => {
    setPromos((prev) => [...prev.filter((p) => p.code !== promo.code), promo]);
    showToast(`Promo ${promo.code} saved`);
  };

  const deletePromoCode = (code: string) => {
    setPromos((prev) => prev.filter((p) => p.code !== code));
    showToast(`Promo ${code} deleted`, 'info');
  };

  return (
    <RestaurantContext.Provider
      value={{
        settings,
        updateSettings,
        resetSettingsToDefault,
        menuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        toggleItemAvailability,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        taxAmount,
        deliveryFee,
        orderType,
        setOrderType,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        discountAmount,
        cartTotal,
        orders,
        placeOrder,
        updateOrderStatus,
        getOrderById,
        reservations,
        bookTable,
        updateReservationStatus,
        getReservationByNumber,
        reviews,
        addReview,
        promos,
        addPromoCode,
        deletePromoCode,
        activeTab,
        setActiveTab,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        customizingItem,
        setCustomizingItem,
        trackingOrderId,
        setTrackingOrderId,
        toast,
        showToast,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
