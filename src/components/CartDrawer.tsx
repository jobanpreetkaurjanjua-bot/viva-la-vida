import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Tag,
  ArrowRight,
  Truck,
  ShoppingBag as BagIcon,
  Check,
  AlertCircle,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    cartSubtotal,
    deliveryFee,
    taxAmount,
    cartTotal,
    discountAmount,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    orderType,
    setOrderType,
    settings,
    setIsCheckoutOpen,
    setActiveTab,
  } = useRestaurant();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput.trim()) return;

    const res = applyPromoCode(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput('');
    }
  };

  // Amount needed for free delivery
  const remainingForFreeDelivery = Math.max(0, settings.freeDeliveryThreshold - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col border-l border-[#E8E0D5]">
          {/* Header */}
          <div className="p-4 sm:p-5 bg-white border-b border-[#E8E0D5] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#2D4030] text-white flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-[#C89B3C]" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917]">Your Italian Order</h3>
                <p className="text-[11px] text-[#78716C]">{cartCount} items selected</p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#57534E] hover:text-[#1C1917] rounded-full hover:bg-[#F3EDE2] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery vs Takeaway Selector */}
          <div className="p-3 bg-[#F3EDE2] border-b border-[#E8E0D5] shrink-0">
            <div className="grid grid-cols-2 p-1 bg-white rounded-lg border border-[#E8E0D5] text-xs font-semibold">
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`py-2 rounded-md flex items-center justify-center gap-1.5 transition-all ${
                  orderType === 'delivery'
                    ? 'bg-[#2D4030] text-white shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Doorstep Delivery</span>
              </button>
              <button
                type="button"
                onClick={() => setOrderType('takeaway')}
                className={`py-2 rounded-md flex items-center justify-center gap-1.5 transition-all ${
                  orderType === 'takeaway'
                    ? 'bg-[#2D4030] text-white shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                <BagIcon className="w-3.5 h-3.5" />
                <span>Self Takeaway</span>
              </button>
            </div>

            {/* Free delivery tracker */}
            {orderType === 'delivery' && (
              <div className="mt-2 text-[11px] text-[#57534E]">
                {remainingForFreeDelivery > 0 ? (
                  <div className="flex items-center justify-between text-[#78716C]">
                    <span>
                      Add <strong>₹{remainingForFreeDelivery}</strong> more for Free Delivery
                    </span>
                    <span className="text-emerald-700 font-semibold">₹{settings.freeDeliveryThreshold} threshold</span>
                  </div>
                ) : (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    You unlocked FREE Delivery in Gurdaspur!
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-[#EAE2D5] flex items-center justify-center mx-auto mb-4 text-[#78716C]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#1C1917]">Your Cart is Empty</h4>
                <p className="text-xs text-[#57534E] mt-1 max-w-xs mx-auto">
                  Explore our handcrafted pastas, stone-baked pizzas, and Venetian desserts.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActiveTab('menu');
                  }}
                  className="mt-5 px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#2D4030] text-white rounded hover:bg-[#202E23] transition-colors"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="bg-white p-3.5 rounded-lg border border-[#E8E0D5] shadow-2xs flex gap-3"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    className="w-16 h-16 object-cover rounded-md bg-[#EAE2D5] shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-[#1C1917] leading-snug">
                          {item.menuItem.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-stone-400 hover:text-[#C0392B] p-0.5 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Customizations summary */}
                      {item.customization && (
                        <div className="mt-1 text-[10px] text-[#78716C] space-y-0.5">
                          {item.customization.sauce && (
                            <div>Sauce: {item.customization.sauce}</div>
                          )}
                          {item.customization.spiceLevel && (
                            <div>Spice: {item.customization.spiceLevel}</div>
                          )}
                          {item.customization.extraCheese && (
                            <div className="text-amber-800 font-medium">+ Extra Mozzarella</div>
                          )}
                          {item.customization.selectedAddOns && item.customization.selectedAddOns.length > 0 && (
                            <div>Add-ons: {item.customization.selectedAddOns.join(', ')}</div>
                          )}
                          {item.customization.specialInstructions && (
                            <div className="italic text-[#57534E]">
                              Note: "{item.customization.specialInstructions}"
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Quantity controls and price */}
                    <div className="mt-2.5 pt-2 border-t border-[#F3EDE2] flex items-center justify-between">
                      <div className="flex items-center border border-[#D5CBBF] rounded bg-[#FAF7F2]">
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, -1)}
                          className="px-2 py-0.5 text-xs text-[#57534E] hover:bg-[#EAE2D5]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#1C1917]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, 1)}
                          className="px-2 py-0.5 text-xs text-[#57534E] hover:bg-[#EAE2D5]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-[#1C1917]">
                        ₹{item.totalPrice}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Coupon Code Section */}
          {cart.length > 0 && (
            <div className="p-3 bg-white border-t border-[#E8E0D5] shrink-0 space-y-2">
              {appliedPromo ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <div>
                      <span className="font-bold text-emerald-800">
                        {appliedPromo.code} applied!
                      </span>
                      <p className="text-[10px] text-emerald-700">{appliedPromo.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-[11px] font-bold text-rose-700 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                      placeholder="Coupon Code (try VIVA10)"
                      className="flex-1 px-3 py-1.5 text-xs rounded border border-[#D5CBBF] bg-[#FAF7F2] uppercase focus:outline-none focus:ring-1 focus:ring-[#2D4030]"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider bg-[#2D4030] text-white rounded hover:bg-[#202E23] transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[10px] text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {promoError}
                    </p>
                  )}
                  <p className="text-[10px] text-[#78716C]">
                    Available coupons: <span className="font-semibold text-[#2D4030]">VIVA10</span> (10% off), <span className="font-semibold text-[#2D4030]">BENVENUTI</span> (₹100 off on ₹599+)
                  </p>
                </form>
              )}
            </div>
          )}

          {/* Pricing Summary & Checkout Button */}
          {cart.length > 0 && (
            <div className="p-4 bg-white border-t border-[#E8E0D5] shrink-0 space-y-3">
              <div className="space-y-1.5 text-xs text-[#57534E]">
                <div className="flex justify-between">
                  <span>Item Subtotal</span>
                  <span className="font-medium text-[#1C1917]">₹{cartSubtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Coupon Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>
                    Delivery Fee ({orderType === 'delivery' ? 'Gurdaspur' : 'Self Pickup'})
                  </span>
                  <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                </div>

                <div className="flex justify-between">
                  <span>GST ({settings.taxRatePercent}%)</span>
                  <span>₹{taxAmount}</span>
                </div>

                <div className="pt-2 border-t border-[#E8E0D5] flex justify-between text-sm font-bold text-[#1C1917]">
                  <span>Total Amount</span>
                  <span className="font-serif text-base text-[#2D4030]">₹{cartTotal}</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider bg-[#C0392B] hover:bg-[#A93226] text-white rounded-md shadow-md transition-transform active:scale-95 flex items-center justify-between"
              >
                <span>Proceed to Checkout</span>
                <span className="flex items-center gap-1">
                  <span>₹{cartTotal}</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
