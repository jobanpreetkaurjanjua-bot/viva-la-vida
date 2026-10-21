import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { PaymentMethod } from '../types/restaurant';
import {
  X,
  Truck,
  ShoppingBag,
  CreditCard,
  QrCode,
  Banknote,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    cartSubtotal,
    deliveryFee,
    taxAmount,
    discountAmount,
    orderType,
    setOrderType,
    placeOrder,
    settings,
  } = useRestaurant();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [locality, setLocality] = useState('');
  const [landmark, setLandmark] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [pickupTime, setPickupTime] = useState('In 20-25 mins');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Simulated UPI QR display state
  const [showUpiSimulator, setShowUpiSimulator] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    if (!name.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number');
      return;
    }

    if (orderType === 'delivery') {
      if (!address.trim()) {
        setErrorMessage('Please provide your complete delivery street address in Gurdaspur');
        return;
      }
      if (!locality.trim()) {
        setErrorMessage('Please specify your locality or area near Gurdaspur Bus Stand');
        return;
      }
    }

    // If UPI selected and not yet confirmed on simulator
    if (paymentMethod === 'upi' && !showUpiSimulator) {
      setShowUpiSimulator(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await placeOrder(
        {
          name: name.trim(),
          phone: cleanPhone,
          email: email.trim() || undefined,
          address: orderType === 'delivery' ? address.trim() : undefined,
          locality: orderType === 'delivery' ? locality.trim() : undefined,
          landmark: orderType === 'delivery' ? landmark.trim() : undefined,
          deliveryInstructions: deliveryInstructions.trim() || undefined,
          pickupTime: orderType === 'takeaway' ? pickupTime : undefined,
        },
        paymentMethod
      );

      if (!res.success) {
        setErrorMessage(res.error || 'Unable to place order at this moment');
        setIsSubmitting(false);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error occurred while processing order');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-[#FAF7F2] rounded-xl max-w-2xl w-full my-8 border border-[#E8E0D5] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 bg-white border-b border-[#E8E0D5] flex items-center justify-between shrink-0">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C0392B]">
              Final Step · Secure Checkout
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#1C1917]">
              Complete Your Viva La Vida Order
            </h3>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 text-[#57534E] hover:text-[#1C1917] rounded-full hover:bg-[#F3EDE2] transition-colors"
            aria-label="Close Checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-[#1C1917]">
          {/* Order Type Selector */}
          <div className="grid grid-cols-2 p-1 bg-white rounded-lg border border-[#E8E0D5] text-xs font-bold">
            <button
              type="button"
              onClick={() => setOrderType('delivery')}
              className={`py-2.5 rounded-md flex items-center justify-center gap-2 transition-all ${
                orderType === 'delivery'
                  ? 'bg-[#2D4030] text-white shadow-xs'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Doorstep Delivery (Gurdaspur)</span>
            </button>
            <button
              type="button"
              onClick={() => setOrderType('takeaway')}
              className={`py-2.5 rounded-md flex items-center justify-center gap-2 transition-all ${
                orderType === 'takeaway'
                  ? 'bg-[#2D4030] text-white shadow-xs'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Self Takeaway (Near Bus Stand)</span>
            </button>
          </div>

          {/* Form */}
          <form id="checkout-form" onSubmit={handleSubmitOrder} className="space-y-5">
            {/* Contact details */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-3">
                1. Customer Contact Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#57534E] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Navjot Singh"
                    className="w-full px-3.5 py-2 text-xs rounded-md border border-[#D5CBBF] bg-white focus:outline-none focus:ring-1 focus:ring-[#2D4030]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#57534E] mb-1">
                    Mobile Number (10 digits) *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full px-3.5 py-2 text-xs rounded-md border border-[#D5CBBF] bg-white focus:outline-none focus:ring-1 focus:ring-[#2D4030]"
                  />
                </div>
              </div>
            </div>

            {/* Address or Pickup selection */}
            {orderType === 'delivery' ? (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-3">
                  2. Delivery Destination in Gurdaspur
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#57534E] mb-1">
                      Street Address / House / Flat *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. House No. 42, Green Avenue, near Bus Stand"
                      className="w-full px-3.5 py-2 text-xs rounded-md border border-[#D5CBBF] bg-white focus:outline-none focus:ring-1 focus:ring-[#2D4030]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#57534E] mb-1">
                        Locality / Colony *
                      </label>
                      <input
                        type="text"
                        required
                        value={locality}
                        onChange={(e) => setLocality(e.target.value)}
                        placeholder="e.g. Civil Lines / Bus Stand Road"
                        className="w-full px-3.5 py-2 text-xs rounded-md border border-[#D5CBBF] bg-white focus:outline-none focus:ring-1 focus:ring-[#2D4030]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#57534E] mb-1">
                        Nearest Landmark
                      </label>
                      <input
                        type="text"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        placeholder="e.g. Opposite Post Office / Near Water Tank"
                        className="w-full px-3.5 py-2 text-xs rounded-md border border-[#D5CBBF] bg-white focus:outline-none focus:ring-1 focus:ring-[#2D4030]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#57534E] mb-1">
                      Delivery Rider Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      value={deliveryInstructions}
                      onChange={(e) => setDeliveryInstructions(e.target.value)}
                      placeholder="e.g. Ring the doorbell, avoid horn, call on arrival..."
                      className="w-full px-3.5 py-2 text-xs rounded-md border border-[#D5CBBF] bg-white focus:outline-none focus:ring-1 focus:ring-[#2D4030]"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-3">
                  2. Self-Pickup Time Slot
                </h4>
                <div className="p-4 bg-white rounded-lg border border-[#E8E0D5]">
                  <p className="text-xs text-[#57534E] mb-3">
                    Your food will be prepared fresh and packed hot for collection at{' '}
                    <strong>Viva La Vida, Near Bus Stand, Gurdaspur</strong>.
                  </p>
                  <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                    Select Estimated Pickup Time
                  </label>
                  <select
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-md border border-[#D5CBBF] bg-[#FAF7F2] font-semibold text-[#1C1917]"
                  >
                    <option value="In 15-20 mins (Earliest Available)">
                      In 15-20 mins (Earliest Available)
                    </option>
                    <option value="In 30-35 mins">In 30-35 mins</option>
                    <option value="In 45-50 mins">In 45-50 mins</option>
                    <option value="Later this evening (mention in note)">
                      Later this evening
                    </option>
                  </select>
                </div>
              </div>
            )}

            {/* Payment Method Selector */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-3">
                3. Payment Method
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`p-3.5 rounded-lg border cursor-pointer flex items-center justify-between transition-colors ${
                    paymentMethod === 'cod'
                      ? 'border-[#2D4030] bg-[#2D4030]/5 text-[#1C1917]'
                      : 'border-[#E8E0D5] bg-white text-[#57534E]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Banknote className="w-5 h-5 text-emerald-700" />
                    <div>
                      <span className="text-xs font-bold block">
                        {orderType === 'delivery' ? 'Cash on Delivery (COD)' : 'Pay at Restaurant Counter'}
                      </span>
                      <span className="text-[10px] text-[#78716C]">Pay cash or UPI upon delivery</span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="paymethod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => {
                      setPaymentMethod('cod');
                      setShowUpiSimulator(false);
                    }}
                    className="accent-[#2D4030]"
                  />
                </label>

                <label
                  className={`p-3.5 rounded-lg border cursor-pointer flex items-center justify-between transition-colors ${
                    paymentMethod === 'upi'
                      ? 'border-[#2D4030] bg-[#2D4030]/5 text-[#1C1917]'
                      : 'border-[#E8E0D5] bg-white text-[#57534E]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <QrCode className="w-5 h-5 text-[#C0392B]" />
                    <div>
                      <span className="text-xs font-bold block">Instant UPI / QR Payment</span>
                      <span className="text-[10px] text-[#78716C]">Google Pay, PhonePe, Paytm QR</span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="paymethod"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="accent-[#2D4030]"
                  />
                </label>
              </div>

              {/* UPI Simulator Modal Box if selected */}
              {paymentMethod === 'upi' && (
                <div className="mt-3 p-4 bg-white rounded-lg border border-[#C89B3C]/50 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1C1917]">
                    <QrCode className="w-4 h-4 text-[#C0392B]" />
                    <span>Scan Viva La Vida Official Restaurant UPI QR</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#FAF7F2] p-3 rounded-md border border-[#E8E0D5]">
                    <div className="w-28 h-28 bg-white p-2 border border-stone-300 rounded-md flex items-center justify-center shrink-0 shadow-xs">
                      {/* Generative QR Code display */}
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=upi://pay?pa=vivalavida@okhdfcbank%26pn=VivaLaVida%26cu=INR"
                        alt="UPI Payment QR Code for Viva La Vida"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="text-xs space-y-1 text-center sm:text-left">
                      <p className="font-semibold text-[#1C1917]">
                        UPI ID: <span className="text-[#2D4030] font-mono">vivalavida@okhdfcbank</span>
                      </p>
                      <p className="text-[11px] text-[#57534E]">
                        Total Amount Payable: <strong className="text-[#C0392B]">₹{cartTotal}</strong>
                      </p>
                      <p className="text-[10px] text-[#78716C]">
                        Open GPay, PhonePe, or Paytm, scan QR code, or proceed to simulated test payment below.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-md text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </form>

          {/* Bill summary recap */}
          <div className="p-4 bg-white rounded-lg border border-[#E8E0D5] text-xs space-y-1.5 text-[#57534E]">
            <div className="flex justify-between">
              <span>Subtotal ({cart.length} items)</span>
              <span>₹{cartSubtotal}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Coupon Savings</span>
                <span>-₹{discountAmount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery Fee ({orderType === 'delivery' ? 'Gurdaspur' : 'Pickup'})</span>
              <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
            </div>
            <div className="flex justify-between">
              <span>GST ({settings.taxRatePercent}%)</span>
              <span>₹{taxAmount}</span>
            </div>
            <div className="pt-2 border-t border-[#E8E0D5] flex justify-between text-sm font-bold text-[#1C1917]">
              <span>Grand Total</span>
              <span className="font-serif text-[#2D4030]">₹{cartTotal}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#E8E0D5] flex items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-[#78716C] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted checkout</span>
          </div>

          <button
            type="submit"
            form="checkout-form"
            disabled={isSubmitting}
            className={`px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-md text-white transition-all shadow-sm ${
              isSubmitting
                ? 'bg-stone-400 cursor-wait'
                : 'bg-[#C0392B] hover:bg-[#A93226] active:scale-95'
            }`}
          >
            {isSubmitting ? 'Placing Order...' : `Confirm & Place Order · ₹${cartTotal}`}
          </button>
        </div>
      </div>
    </div>
  );
};
