import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { MenuItem, OrderStatus, ReservationStatus, PromoCode } from '../types/restaurant';
import {
  ShieldCheck,
  Lock,
  LogOut,
  Utensils,
  ShoppingBag,
  Calendar,
  Settings,
  BarChart3,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  EyeOff,
  Tag,
  Save,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    settings,
    updateSettings,
    resetSettingsToDefault,
    menuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleItemAvailability,
    orders,
    updateOrderStatus,
    reservations,
    updateReservationStatus,
    promos,
    addPromoCode,
    deletePromoCode,
    setActiveTab,
  } = useRestaurant();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Dashboard Tab
  const [adminTab, setAdminTab] = useState<'orders' | 'reservations' | 'menu' | 'settings' | 'promos' | 'stats'>('orders');

  // Menu item modal state
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAddingNewItem, setIsAddingNewItem] = useState(false);
  const [itemForm, setItemForm] = useState<{
    name: string;
    italianName: string;
    description: string;
    price: number;
    category: MenuItem['category'];
    image: string;
    isVegetarian: boolean;
    isBestseller: boolean;
    spiceLevel: MenuItem['spiceLevel'];
    isAvailable: boolean;
  }>({
    name: '',
    italianName: '',
    description: '',
    price: 300,
    category: 'pasta',
    image: '',
    isVegetarian: true,
    isBestseller: false,
    spiceLevel: 'mild',
    isAvailable: true,
  });

  // Settings form state
  const [settingsForm, setSettingsForm] = useState({ ...settings });

  // New Promo form state
  const [newPromoCode, setNewPromoCode] = useState('');
  const [newPromoType, setNewPromoType] = useState<'percentage' | 'fixed'>('percentage');
  const [newPromoVal, setNewPromoVal] = useState(10);
  const [newPromoMin, setNewPromoMin] = useState(399);
  const [newPromoDesc, setNewPromoDesc] = useState('');

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === settings.adminPin) {
      setIsAuthenticated(true);
      setAuthError('');
      setPinInput('');
    } else {
      setAuthError('Incorrect Staff Access PIN. (Default PIN is 1234)');
    }
  };

  // Open Edit Item
  const handleOpenEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setItemForm({
      name: item.name,
      italianName: item.italianName || '',
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
      isVegetarian: item.isVegetarian,
      isBestseller: !!item.isBestseller,
      spiceLevel: item.spiceLevel,
      isAvailable: item.isAvailable,
    });
    setIsAddingNewItem(true);
  };

  const handleOpenAddNewItem = () => {
    setEditingItem(null);
    setItemForm({
      name: '',
      italianName: '',
      description: '',
      price: 290,
      category: 'pasta',
      image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281729?auto=format&fit=crop&w=800&q=80',
      isVegetarian: true,
      isBestseller: false,
      spiceLevel: 'mild',
      isAvailable: true,
    });
    setIsAddingNewItem(true);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemForm.name.trim()) return;

    if (editingItem) {
      updateMenuItem(editingItem.id, itemForm);
    } else {
      addMenuItem({
        ...itemForm,
        preparationTimeMinutes: 20,
      });
    }
    setIsAddingNewItem(false);
    setEditingItem(null);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
  };

  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromoCode.trim()) return;
    addPromoCode({
      code: newPromoCode.trim().toUpperCase(),
      discountType: newPromoType,
      discountValue: Number(newPromoVal),
      minOrderValue: Number(newPromoMin),
      description: newPromoDesc.trim() || `${newPromoVal}${newPromoType === 'percentage' ? '%' : '₹'} off`,
      isActive: true,
    });
    setNewPromoCode('');
    setNewPromoDesc('');
  };

  // Analytics Metrics
  const totalRevenue = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  const pendingOrdersCount = orders.filter((o) => o.status === 'Order Received' || o.status === 'Preparing').length;
  const pendingReservationsCount = reservations.filter((r) => r.status === 'Pending Confirmation').length;

  if (!isAuthenticated) {
    return (
      <div className="py-20 bg-[#FAF7F2] min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl border border-[#E8E0D5] p-8 shadow-xl text-center">
          <div className="w-14 h-14 rounded-full bg-[#2D4030] text-white flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-[#C89B3C]" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#C0392B]">
            Authorized Staff Access Only
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#1C1917] mt-1 mb-2">
            Viva La Vida Staff Portal
          </h2>
          <p className="text-xs text-[#57534E] mb-6">
            Enter the restaurant owner/manager PIN to manage live orders, menu items, table reservations, and operating settings.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                maxLength={8}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter Staff PIN (Default: 1234)"
                className="w-full px-4 py-3 text-center text-lg tracking-widest rounded-lg border border-[#D5CBBF] bg-[#FAF7F2] text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#2D4030]"
              />
            </div>

            {authError && (
              <p className="text-xs text-rose-600 bg-rose-50 p-2 rounded border border-rose-200">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 text-xs font-bold uppercase tracking-wider bg-[#2D4030] text-white rounded-lg hover:bg-[#202E23] transition-colors shadow-sm"
            >
              Sign In to Dashboard
            </button>
          </form>

          <p className="text-[11px] text-[#78716C] mt-6">
            Tip: Default PIN is <code className="bg-stone-100 px-1 py-0.5 rounded font-mono">1234</code>. You can change this in Settings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="bg-white rounded-xl border border-[#E8E0D5] p-5 mb-8 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#2D4030] text-white flex items-center justify-center font-serif text-xl font-bold">
              V
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-xl font-bold text-[#1C1917]">
                  Viva La Vida · Management Portal
                </h1>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded uppercase">
                  Staff Live
                </span>
              </div>
              <p className="text-xs text-[#78716C]">
                Near Bus Stand, Gurdaspur, Punjab
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('home')}
              className="px-3 py-1.5 text-xs font-semibold text-[#57534E] hover:text-[#1C1917] bg-[#FAF7F2] border border-[#E8E0D5] rounded transition-colors"
            >
              View Public Website
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 hover:bg-rose-100 rounded border border-rose-200 transition-colors flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Quick Stat Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border border-[#E8E0D5] shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#78716C] block">
              Total Order Volume
            </span>
            <span className="font-serif text-2xl font-bold text-[#2D4030] mt-1 block">
              ₹{totalRevenue}
            </span>
            <span className="text-[11px] text-[#57534E]">{orders.length} orders recorded</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#E8E0D5] shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#78716C] block">
              Active Kitchen Orders
            </span>
            <span className="font-serif text-2xl font-bold text-[#C0392B] mt-1 block">
              {pendingOrdersCount}
            </span>
            <span className="text-[11px] text-[#57534E]">Need prep or delivery</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#E8E0D5] shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#78716C] block">
              Table Bookings
            </span>
            <span className="font-serif text-2xl font-bold text-[#C89B3C] mt-1 block">
              {reservations.length}
            </span>
            <span className="text-[11px] text-amber-700 font-semibold">{pendingReservationsCount} awaiting action</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#E8E0D5] shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#78716C] block">
              Active Dishes On Menu
            </span>
            <span className="font-serif text-2xl font-bold text-[#1C1917] mt-1 block">
              {menuItems.filter((m) => m.isAvailable).length} / {menuItems.length}
            </span>
            <span className="text-[11px] text-emerald-700 font-semibold">Available for ordering</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 border-b border-[#E8E0D5] mb-6 overflow-x-auto pb-1">
          {[
            { id: 'orders', label: 'Online Orders', count: pendingOrdersCount, icon: ShoppingBag },
            { id: 'reservations', label: 'Table Reservations', count: pendingReservationsCount, icon: Calendar },
            { id: 'menu', label: 'Menu & Prices', count: menuItems.length, icon: Utensils },
            { id: 'promos', label: 'Coupons & Discounts', count: promos.length, icon: Tag },
            { id: 'settings', label: 'Restaurant Settings', icon: Settings },
          ].map((tab) => {
            const isActive = adminTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setAdminTab(tab.id as any)}
                className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-t-lg transition-colors flex items-center gap-2 shrink-0 ${
                  isActive
                    ? 'bg-white text-[#2D4030] border-t-2 border-t-[#2D4030] border-x border-[#E8E0D5] shadow-2xs'
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-[#2D4030] text-white' : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: ORDERS */}
        {adminTab === 'orders' && (
          <div className="bg-white rounded-xl border border-[#E8E0D5] shadow-xs overflow-hidden">
            <div className="p-5 border-b border-[#E8E0D5] flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917]">
                  Incoming Online Orders ({orders.length})
                </h3>
                <p className="text-xs text-[#78716C]">
                  Update order preparation statuses to give customers live notifications.
                </p>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-12 text-[#78716C] text-xs">
                No orders have been placed yet. Test by placing an order from the website!
              </div>
            ) : (
              <div className="divide-y divide-[#E8E0D5]">
                {orders.map((ord) => (
                  <div key={ord.id} className="p-5 space-y-4 hover:bg-[#FAF7F2]/50 transition-colors">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#1C1917]">
                            #{ord.orderNumber}
                          </span>
                          <span className="text-xs font-bold uppercase tracking-wider text-[#2D4030] bg-[#2D4030]/10 px-2 py-0.5 rounded">
                            {ord.type}
                          </span>
                          <span className="text-[11px] text-[#78716C]">
                            {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-xs text-[#57534E] mt-1 font-medium">
                          Customer: {ord.customer.name} · Phone: <a href={`tel:${ord.customer.phone}`} className="text-[#2D4030] underline font-bold">{ord.customer.phone}</a>
                        </p>
                        {ord.type === 'delivery' ? (
                          <p className="text-xs text-[#78716C]">
                            Delivery: {ord.customer.address}, {ord.customer.locality} {ord.customer.landmark ? `(Landmark: ${ord.customer.landmark})` : ''}
                          </p>
                        ) : (
                          <p className="text-xs text-[#78716C]">
                            Takeaway Pickup: {ord.customer.pickupTime || 'Standard'}
                          </p>
                        )}
                        {ord.customer.deliveryInstructions && (
                          <p className="text-xs italic text-[#C0392B]">
                            Note: "{ord.customer.deliveryInstructions}"
                          </p>
                        )}
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#78716C]">Status:</span>
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                          className="text-xs font-bold px-3 py-1.5 rounded border border-[#D5CBBF] bg-white text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#2D4030]"
                        >
                          <option value="Order Received">Order Received</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Preparing">Preparing</option>
                          <option value="Ready for Pickup or Out for Delivery">
                            Ready / Out for Delivery
                          </option>
                          <option value="Delivered or Collected">Delivered or Collected</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    {/* Order Items List */}
                    <div className="bg-[#FAF7F2] p-3 rounded-lg border border-[#E8E0D5] text-xs">
                      <div className="font-bold text-[#1C1917] mb-1">Items ({ord.items.length}):</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between border-b border-[#E8E0D5]/50 pb-1">
                            <span>
                              <strong>{it.quantity}x</strong> {it.menuItem.name}
                              {it.customization?.sauce && (
                                <span className="text-[10px] text-[#78716C] block">
                                  Sauce: {it.customization.sauce}
                                </span>
                              )}
                            </span>
                            <span className="font-semibold text-[#1C1917]">₹{it.totalPrice}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-2 pt-2 border-t border-[#E8E0D5] flex justify-between font-bold text-[#1C1917]">
                        <span>Payment ({ord.paymentMethod.toUpperCase()}): {ord.paymentStatus}</span>
                        <span className="text-sm font-serif text-[#2D4030]">Total: ₹{ord.total}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: RESERVATIONS */}
        {adminTab === 'reservations' && (
          <div className="bg-white rounded-xl border border-[#E8E0D5] shadow-xs overflow-hidden">
            <div className="p-5 border-b border-[#E8E0D5] flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917]">
                  Dine-In Table Reservations ({reservations.length})
                </h3>
                <p className="text-xs text-[#78716C]">
                  Approve or confirm booking requests for tables near Gurdaspur Bus Stand.
                </p>
              </div>
            </div>

            {reservations.length === 0 ? (
              <div className="text-center py-12 text-[#78716C] text-xs">
                No table bookings received yet. Test by submitting a booking on the "Book a Table" page!
              </div>
            ) : (
              <div className="divide-y divide-[#E8E0D5]">
                {reservations.map((rsv) => (
                  <div key={rsv.id} className="p-5 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#1C1917]">
                          #{rsv.reservationNumber}
                        </span>
                        <span className="text-xs font-bold text-[#2D4030] bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E8E0D5]">
                          {rsv.guests} Guests · {rsv.seatingPreference}
                        </span>
                        <span className="text-xs text-[#C89B3C] font-semibold">
                          {rsv.occasion}
                        </span>
                      </div>
                      <p className="text-xs text-[#57534E] mt-1">
                        <strong>Guest:</strong> {rsv.name} · <strong>Phone:</strong>{' '}
                        <a href={`tel:${rsv.phone}`} className="text-[#2D4030] underline font-bold">
                          {rsv.phone}
                        </a>
                      </p>
                      <p className="text-xs text-[#78716C]">
                        <strong>Schedule:</strong> {rsv.date} at {rsv.time}
                      </p>
                      {rsv.specialRequests && (
                        <p className="text-xs italic text-[#57534E]">
                          Special request: "{rsv.specialRequests}"
                        </p>
                      )}
                    </div>

                    {/* Status & Actions */}
                    <div className="flex items-center gap-2">
                      <select
                        value={rsv.status}
                        onChange={(e) => updateReservationStatus(rsv.id, e.target.value as ReservationStatus)}
                        className="text-xs font-bold px-3 py-1.5 rounded border border-[#D5CBBF] bg-white text-[#1C1917]"
                      >
                        <option value="Pending Confirmation">Pending Confirmation</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>

                      {rsv.status === 'Pending Confirmation' && (
                        <button
                          onClick={() => updateReservationStatus(rsv.id, 'Confirmed')}
                          className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-emerald-700 text-white rounded hover:bg-emerald-800 transition-colors"
                        >
                          Confirm Booking
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: MENU & PRICES */}
        {adminTab === 'menu' && (
          <div className="bg-white rounded-xl border border-[#E8E0D5] shadow-xs overflow-hidden">
            <div className="p-5 border-b border-[#E8E0D5] flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917]">
                  Menu Management & Pricing ({menuItems.length} Dishes)
                </h3>
                <p className="text-xs text-[#78716C]">
                  Easily edit dish titles, prices, pictures, dietary options, or toggle in-stock / sold out.
                </p>
              </div>

              <button
                onClick={handleOpenAddNewItem}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#2D4030] text-white rounded hover:bg-[#202E23] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Dish</span>
              </button>
            </div>

            <div className="divide-y divide-[#E8E0D5]">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#FAF7F2]/40"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded object-cover bg-stone-200 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#1C1917]">{item.name}</span>
                        <span className="text-[10px] text-[#C0392B] uppercase font-semibold">
                          ({item.category})
                        </span>
                        {!item.isAvailable && (
                          <span className="text-[10px] font-bold bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded">
                            Sold Out
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#78716C] line-clamp-1">{item.description}</p>
                      <div className="text-xs font-bold text-[#2D4030] mt-0.5">
                        ₹{item.price}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleItemAvailability(item.id)}
                      className={`px-3 py-1 text-xs font-semibold rounded border transition-colors flex items-center gap-1 ${
                        item.isAvailable
                          ? 'border-emerald-300 text-emerald-800 bg-emerald-50 hover:bg-emerald-100'
                          : 'border-rose-300 text-rose-800 bg-rose-50 hover:bg-rose-100'
                      }`}
                      title="Toggle availability"
                    >
                      {item.isAvailable ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{item.isAvailable ? 'In Stock' : 'Mark Sold Out'}</span>
                    </button>

                    <button
                      onClick={() => handleOpenEditItem(item)}
                      className="p-1.5 text-[#57534E] hover:text-[#2D4030] bg-[#FAF7F2] rounded border border-[#E8E0D5]"
                      title="Edit dish"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to remove "${item.name}" from the menu?`)) {
                          deleteMenuItem(item.id);
                        }
                      }}
                      className="p-1.5 text-stone-400 hover:text-rose-700 bg-[#FAF7F2] rounded border border-[#E8E0D5]"
                      title="Delete dish"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PROMOS & DISCOUNTS */}
        {adminTab === 'promos' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-[#E8E0D5] p-5 shadow-xs">
              <h3 className="font-serif text-lg font-bold text-[#1C1917] mb-1">
                Active Promotional Coupons
              </h3>
              <p className="text-xs text-[#78716C] mb-4">
                Customers can apply these codes during checkout for instant discounts.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {promos.map((p) => (
                  <div
                    key={p.code}
                    className="p-4 rounded-lg border border-[#E8E0D5] bg-[#FAF7F2] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-bold text-sm text-[#2D4030]">{p.code}</span>
                        <span className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                          {p.discountType === 'percentage' ? `${p.discountValue}% OFF` : `₹${p.discountValue} FLAT`}
                        </span>
                      </div>
                      <p className="text-xs text-[#57534E]">{p.description}</p>
                      <p className="text-[11px] text-[#78716C] mt-1">Min Order: ₹{p.minOrderValue}</p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-[#E8E0D5] flex justify-end">
                      <button
                        onClick={() => deletePromoCode(p.code)}
                        className="text-xs font-semibold text-rose-700 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Promo Code Form */}
              <div className="p-4 bg-white border border-[#E8E0D5] rounded-lg">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-3">
                  Create New Coupon Code
                </h4>
                <form onSubmit={handleCreatePromo} className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  <input
                    type="text"
                    required
                    value={newPromoCode}
                    onChange={(e) => setNewPromoCode(e.target.value.toUpperCase())}
                    placeholder="CODE (e.g. FESTIVE20)"
                    className="px-3 py-1.5 text-xs rounded border border-[#D5CBBF] uppercase"
                  />
                  <select
                    value={newPromoType}
                    onChange={(e) => setNewPromoType(e.target.value as any)}
                    className="px-3 py-1.5 text-xs rounded border border-[#D5CBBF]"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Rupee (₹)</option>
                  </select>
                  <input
                    type="number"
                    required
                    value={newPromoVal}
                    onChange={(e) => setNewPromoVal(Number(e.target.value))}
                    placeholder="Discount Value"
                    className="px-3 py-1.5 text-xs rounded border border-[#D5CBBF]"
                  />
                  <input
                    type="number"
                    required
                    value={newPromoMin}
                    onChange={(e) => setNewPromoMin(Number(e.target.value))}
                    placeholder="Min Order Value (₹)"
                    className="px-3 py-1.5 text-xs rounded border border-[#D5CBBF]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-[#2D4030] text-white rounded hover:bg-[#202E23] transition-colors"
                  >
                    Save Coupon
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: RESTAURANT SETTINGS */}
        {adminTab === 'settings' && (
          <div className="bg-white rounded-xl border border-[#E8E0D5] p-6 shadow-xs">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E8E0D5]">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917]">
                  Restaurant Operating Settings
                </h3>
                <p className="text-xs text-[#78716C]">
                  Update address, contact numbers, delivery charges, opening hours, and staff PIN.
                </p>
              </div>

              <button
                type="button"
                onClick={resetSettingsToDefault}
                className="px-3 py-1.5 text-xs font-bold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All to Default</span>
              </button>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-1">
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    value={settingsForm.name}
                    onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-[#D5CBBF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-1">
                    Brand Slogan / Tagline
                  </label>
                  <input
                    type="text"
                    value={settingsForm.tagline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-[#D5CBBF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={settingsForm.phone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-[#D5CBBF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={settingsForm.whatsapp}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-[#D5CBBF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-1">
                    Opening Hours
                  </label>
                  <input
                    type="text"
                    value={settingsForm.openingHours}
                    onChange={(e) => setSettingsForm({ ...settingsForm, openingHours: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-[#D5CBBF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-1">
                    Staff Management PIN (4 digits)
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={settingsForm.adminPin}
                    onChange={(e) => setSettingsForm({ ...settingsForm, adminPin: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-[#D5CBBF] font-mono tracking-widest"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-1">
                    Delivery Fee (₹)
                  </label>
                  <input
                    type="number"
                    value={settingsForm.deliveryFee}
                    onChange={(e) => setSettingsForm({ ...settingsForm, deliveryFee: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs rounded border border-[#D5CBBF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-1">
                    Free Delivery Threshold (₹)
                  </label>
                  <input
                    type="number"
                    value={settingsForm.freeDeliveryThreshold}
                    onChange={(e) => setSettingsForm({ ...settingsForm, freeDeliveryThreshold: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs rounded border border-[#D5CBBF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-1">
                    Min Order Value for Delivery (₹)
                  </label>
                  <input
                    type="number"
                    value={settingsForm.minOrderValue}
                    onChange={(e) => setSettingsForm({ ...settingsForm, minOrderValue: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs rounded border border-[#D5CBBF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-1">
                    GST Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    value={settingsForm.taxRatePercent}
                    onChange={(e) => setSettingsForm({ ...settingsForm, taxRatePercent: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs rounded border border-[#D5CBBF]"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="pt-4 border-t border-[#E8E0D5] flex flex-wrap gap-6 text-xs">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-[#1C1917]">
                  <input
                    type="checkbox"
                    checked={settingsForm.isOnlineOrderingOpen}
                    onChange={(e) => setSettingsForm({ ...settingsForm, isOnlineOrderingOpen: e.target.checked })}
                    className="accent-[#2D4030] w-4 h-4 rounded"
                  />
                  <span>Online Food Ordering Open</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold text-[#1C1917]">
                  <input
                    type="checkbox"
                    checked={settingsForm.isTableBookingOpen}
                    onChange={(e) => setSettingsForm({ ...settingsForm, isTableBookingOpen: e.target.checked })}
                    className="accent-[#2D4030] w-4 h-4 rounded"
                  />
                  <span>Table Reservations Enabled</span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#E8E0D5] flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#2D4030] text-white rounded hover:bg-[#202E23] transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Restaurant Settings</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Modal: Add or Edit Dish */}
        {isAddingNewItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-xl max-w-lg w-full p-6 border border-[#E8E0D5] shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <h3 className="font-serif text-xl font-bold text-[#1C1917] mb-4">
                {editingItem ? `Edit: ${editingItem.name}` : 'Add New Italian Dish'}
              </h3>

              <form onSubmit={handleSaveItem} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#57534E] mb-1">Dish Name *</label>
                  <input
                    type="text"
                    required
                    value={itemForm.name}
                    onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-[#D5CBBF]"
                    placeholder="e.g. Creamy Truffle Fettuccine"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#57534E] mb-1">Italian Name (Subtext)</label>
                  <input
                    type="text"
                    value={itemForm.italianName}
                    onChange={(e) => setItemForm({ ...itemForm, italianName: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-[#D5CBBF]"
                    placeholder="e.g. Fettuccine al Tartufo"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#57534E] mb-1">Price (₹) *</label>
                    <input
                      type="number"
                      required
                      value={itemForm.price}
                      onChange={(e) => setItemForm({ ...itemForm, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-xs rounded border border-[#D5CBBF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#57534E] mb-1">Category *</label>
                    <select
                      value={itemForm.category}
                      onChange={(e) => setItemForm({ ...itemForm, category: e.target.value as any })}
                      className="w-full px-3 py-2 text-xs rounded border border-[#D5CBBF]"
                    >
                      <option value="pasta">Pasta</option>
                      <option value="pizza">Pizza</option>
                      <option value="starters">Starters</option>
                      <option value="sides">Sides</option>
                      <option value="desserts">Desserts</option>
                      <option value="beverages">Beverages</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#57534E] mb-1">Image URL</label>
                  <input
                    type="url"
                    value={itemForm.image}
                    onChange={(e) => setItemForm({ ...itemForm, image: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-[#D5CBBF]"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#57534E] mb-1">Description *</label>
                  <textarea
                    rows={3}
                    required
                    value={itemForm.description}
                    onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-[#D5CBBF]"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={itemForm.isVegetarian}
                      onChange={(e) => setItemForm({ ...itemForm, isVegetarian: e.target.checked })}
                      className="accent-emerald-600 w-4 h-4 rounded"
                    />
                    <span>Pure Vegetarian</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={itemForm.isBestseller}
                      onChange={(e) => setItemForm({ ...itemForm, isBestseller: e.target.checked })}
                      className="accent-[#C0392B] w-4 h-4 rounded"
                    />
                    <span>Feature as Bestseller</span>
                  </label>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8E0D5] flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingNewItem(false);
                      setEditingItem(null);
                    }}
                    className="px-4 py-2 text-xs font-semibold text-[#57534E]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-[#2D4030] text-white rounded hover:bg-[#202E23] transition-colors"
                  >
                    Save Dish
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
