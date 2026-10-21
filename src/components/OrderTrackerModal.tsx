import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { OrderStatus } from '../types/restaurant';
import {
  X,
  CheckCircle2,
  Clock,
  ChefHat,
  Bike,
  PackageCheck,
  Printer,
  Search,
  Phone,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

export const OrderTrackerModal: React.FC = () => {
  const {
    trackingOrderId,
    setTrackingOrderId,
    orders,
    getOrderById,
    updateOrderStatus,
    settings,
  } = useRestaurant();

  const [searchId, setSearchId] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<any>(null);

  const activeOrder = trackingOrderId
    ? orders.find((o) => o.id === trackingOrderId || o.orderNumber === trackingOrderId)
    : searchedOrder;

  const steps: { label: OrderStatus; icon: any; desc: string }[] = [
    { label: 'Order Received', icon: Clock, desc: 'Your order was sent to the kitchen.' },
    { label: 'Confirmed', icon: CheckCircle2, desc: 'Restaurant confirmed your order.' },
    { label: 'Preparing', icon: ChefHat, desc: 'Chef is handcrafting your Italian meal.' },
    {
      label: 'Ready for Pickup or Out for Delivery',
      icon: Bike,
      desc: 'On the way to your doorstep or ready at counter.',
    },
    {
      label: 'Delivered or Collected',
      icon: PackageCheck,
      desc: 'Buon Appetito! Enjoy your Italian feast.',
    },
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'Order Received':
        return 0;
      case 'Confirmed':
        return 1;
      case 'Preparing':
        return 2;
      case 'Ready for Pickup or Out for Delivery':
        return 3;
      case 'Delivered or Collected':
        return 4;
      case 'Cancelled':
        return -1;
      default:
        return 0;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    const found = getOrderById(searchId.trim());
    if (found) {
      setSearchedOrder(found);
    } else {
      alert(`No order found matching "${searchId.trim()}". Please verify your Order Reference.`);
    }
  };

  return (
    <div className="py-12 sm:py-16 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C0392B]">
            Real-Time Kitchen Updates
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] mt-1 mb-2">
            Track Your Viva La Vida Order
          </h1>
          <p className="text-sm text-[#57534E]">
            Follow every stage from kitchen prep to hot delivery in Gurdaspur.
          </p>
        </div>

        {/* Search Order Bar */}
        <div className="bg-white p-4 rounded-xl border border-[#E8E0D5] shadow-xs mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter your Order Reference (e.g. VLV-12345)"
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-lg border border-[#D5CBBF] bg-[#FAF7F2] focus:outline-none focus:ring-1 focus:ring-[#2D4030] uppercase"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#2D4030] text-white rounded-lg hover:bg-[#202E23] transition-colors"
            >
              Track Order
            </button>
          </form>
        </div>

        {/* Active Order Display */}
        {activeOrder ? (
          <div
            id="printable-voucher"
            className="bg-white rounded-xl border border-[#E8E0D5] shadow-md overflow-hidden"
          >
            {/* Header with Order Status */}
            <div className="p-6 bg-[#2D4030] text-[#FAF7F2] flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#C89B3C] font-semibold uppercase tracking-widest block">
                  Viva La Vida · Gurdaspur
                </span>
                <h2 className="font-serif text-2xl font-bold text-white mt-0.5">
                  Order #{activeOrder.orderNumber}
                </h2>
                <p className="text-xs text-white/80 mt-1">
                  Placed on {new Date(activeOrder.createdAt).toLocaleDateString()} at{' '}
                  {new Date(activeOrder.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 text-xs font-semibold rounded bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-colors"
                  title="Print official receipt"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>

                <div className="px-3.5 py-1.5 rounded-full bg-[#C89B3C] text-[#1C1917] text-xs font-bold uppercase tracking-wider shadow-xs">
                  {activeOrder.status}
                </div>
              </div>
            </div>

            {/* Stepper Progress Bar */}
            {activeOrder.status !== 'Cancelled' ? (
              <div className="p-6 sm:p-8 border-b border-[#E8E0D5] bg-[#FDFBF7]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-6">
                  Live Preparation Status
                </h3>
                <div className="relative">
                  {/* Background Track Line */}
                  <div className="hidden sm:block absolute top-5 left-6 right-6 h-1 bg-[#E8E0D5] -z-0" />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-2 relative z-10">
                    {steps.map((step, idx) => {
                      const currentStepIdx = getStepIndex(activeOrder.status);
                      const isComplete = idx <= currentStepIdx;
                      const isCurrent = idx === currentStepIdx;
                      const IconComp = step.icon;

                      return (
                        <div key={idx} className="flex sm:flex-col items-center gap-3 sm:gap-2 text-left sm:text-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                              isComplete
                                ? 'bg-[#2D4030] border-[#2D4030] text-white'
                                : 'bg-white border-[#D5CBBF] text-stone-400'
                            } ${isCurrent ? 'ring-4 ring-[#C89B3C]/30 scale-110' : ''}`}
                          >
                            <IconComp className="w-5 h-5" />
                          </div>
                          <div>
                            <p
                              className={`text-xs font-bold leading-tight ${
                                isComplete ? 'text-[#1C1917]' : 'text-stone-400'
                              }`}
                            >
                              {step.label}
                            </p>
                            <p className="text-[10px] text-[#78716C] mt-0.5 leading-snug sm:max-w-[120px] sm:mx-auto">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8 p-3.5 bg-[#FAF7F2] rounded-lg border border-[#E8E0D5] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-[#57534E]">
                    <Clock className="w-4 h-4 text-[#2D4030]" />
                    <span>
                      Estimated time:{' '}
                      <strong className="text-[#1C1917]">{activeOrder.estimatedTime}</strong>
                    </span>
                  </div>
                  <div className="text-[11px] text-[#78716C]">
                    Payment: <strong className="text-emerald-700">{activeOrder.paymentStatus}</strong> ({activeOrder.paymentMethod.toUpperCase()})
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-rose-50 border-b border-rose-200 text-rose-800 flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <div>
                  <h4 className="font-bold text-sm">Order Cancelled</h4>
                  <p className="text-xs">This order was cancelled. If you need assistance, please contact the restaurant.</p>
                </div>
              </div>
            )}

            {/* Order Items & Customer Details */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Items List */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-4">
                  Dishes in this Order
                </h4>
                <div className="space-y-3">
                  {activeOrder.items.map((item: any, i: number) => (
                    <div
                      key={i}
                      className="flex items-start justify-between gap-3 text-xs pb-3 border-b border-[#F3EDE2]"
                    >
                      <div>
                        <span className="font-bold text-[#1C1917]">
                          {item.quantity}x {item.menuItem.name}
                        </span>
                        {item.customization && (
                          <p className="text-[10px] text-[#78716C] mt-0.5">
                            {item.customization.sauce && `Sauce: ${item.customization.sauce} `}
                            {item.customization.spiceLevel && `· Spice: ${item.customization.spiceLevel} `}
                            {item.customization.extraCheese && '· Extra Cheese '}
                            {item.customization.selectedAddOns?.length > 0 &&
                              `· Add-ons: ${item.customization.selectedAddOns.join(', ')}`}
                          </p>
                        )}
                      </div>
                      <span className="font-semibold text-[#1C1917]">₹{item.totalPrice}</span>
                    </div>
                  ))}
                </div>

                {/* Subtotals */}
                <div className="mt-4 space-y-1.5 text-xs text-[#57534E]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{activeOrder.subtotal}</span>
                  </div>
                  {activeOrder.discount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Discount ({activeOrder.promoCodeApplied})</span>
                      <span>-₹{activeOrder.discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>{activeOrder.deliveryFee === 0 ? 'FREE' : `₹${activeOrder.deliveryFee}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & GST</span>
                    <span>₹{activeOrder.tax}</span>
                  </div>
                  <div className="pt-2 border-t border-[#E8E0D5] flex justify-between text-sm font-bold text-[#1C1917]">
                    <span>Total Paid / Payable</span>
                    <span className="font-serif text-[#2D4030]">₹{activeOrder.total}</span>
                  </div>
                </div>
              </div>

              {/* Destination & Contact */}
              <div className="bg-[#FAF7F2] p-5 rounded-lg border border-[#E8E0D5] flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-3">
                    {activeOrder.type === 'delivery' ? 'Delivery Details' : 'Takeaway Details'}
                  </h4>

                  <div className="text-xs space-y-2 text-[#57534E]">
                    <p>
                      <strong>Recipient:</strong> {activeOrder.customer.name}
                    </p>
                    <p>
                      <strong>Contact Phone:</strong> {activeOrder.customer.phone}
                    </p>

                    {activeOrder.type === 'delivery' ? (
                      <>
                        <p>
                          <strong>Street Address:</strong> {activeOrder.customer.address}
                        </p>
                        <p>
                          <strong>Locality:</strong> {activeOrder.customer.locality}
                        </p>
                        {activeOrder.customer.landmark && (
                          <p>
                            <strong>Landmark:</strong> {activeOrder.customer.landmark}
                          </p>
                        )}
                        {activeOrder.customer.deliveryInstructions && (
                          <p className="italic text-[#78716C]">
                            <strong>Instructions:</strong> "{activeOrder.customer.deliveryInstructions}"
                          </p>
                        )}
                      </>
                    ) : (
                      <p>
                        <strong>Pickup Slot:</strong> {activeOrder.customer.pickupTime || 'In 20 mins'}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8E0D5] flex items-center justify-between">
                  <div className="text-[11px] text-[#78716C]">
                    Need help with this order?
                  </div>
                  <a
                    href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#2D4030] hover:underline"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call Viva La Vida</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-[#E8E0D5] p-10 text-center">
            <Clock className="w-12 h-12 text-[#2D4030]/30 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-[#1C1917]">No Order Selected</h3>
            <p className="text-xs text-[#57534E] mt-1 max-w-sm mx-auto">
              Please enter your Order Reference (such as VLV-12345) in the search box above to track live status, or browse past orders in the Staff Portal.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
