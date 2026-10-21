import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { MenuItem, SpiceLevel } from '../types/restaurant';
import { X, Plus, Minus, Check, Flame } from 'lucide-react';

export const CustomizerModal: React.FC = () => {
  const { customizingItem, setCustomizingItem, addToCart } = useRestaurant();

  if (!customizingItem) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedSauce, setSelectedSauce] = useState<string>(
    customizingItem.availableSauces?.[0] || 'Default House Sauce'
  );
  const [spiceLevel, setSpiceLevel] = useState<SpiceLevel>(customizingItem.spiceLevel || 'mild');
  const [extraCheese, setExtraCheese] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  const addOnOptions = [
    { id: 'olives-jalapenos', label: 'Black Olives & Jalapeños', price: 35 },
    { id: 'grilled-mushrooms', label: 'Sautéed Garlic Mushrooms', price: 35 },
    { id: 'sun-dried-tomatoes', label: 'Sun-Dried Italian Tomatoes', price: 35 },
    { id: 'herb-garlic-butter', label: 'Confit Garlic Butter Drizzle', price: 30 },
  ];

  const toggleAddOn = (label: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  // Calculate unit price with add-ons
  let unitPrice = customizingItem.price;
  if (extraCheese) unitPrice += 50;
  unitPrice += selectedAddOns.length * 35;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(
      customizingItem,
      {
        sauce: selectedSauce,
        spiceLevel,
        extraCheese,
        selectedAddOns,
        specialInstructions: specialInstructions.trim() || undefined,
      },
      quantity
    );
    setCustomizingItem(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF7F2] rounded-xl max-w-lg w-full overflow-hidden border border-[#E8E0D5] shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header with Dish Image & Title */}
        <div className="relative h-44 w-full bg-[#EAE2D5] shrink-0">
          <img
            src={customizingItem.image}
            alt={customizingItem.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <button
            onClick={() => setCustomizingItem(null)}
            className="absolute top-3 right-3 p-1.5 bg-black/50 text-white hover:bg-black/75 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C89B3C]">
              Customize Your Order
            </span>
            <h3 className="font-serif text-xl font-bold leading-tight">
              {customizingItem.name}
            </h3>
            <p className="text-xs text-white/80 line-clamp-1">{customizingItem.description}</p>
          </div>
        </div>

        {/* Scrollable Customization Options */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 text-[#1C1917]">
          {/* Sauce Selection (if pasta or configured sauces) */}
          {customizingItem.availableSauces && customizingItem.availableSauces.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-2">
                1. Select Pasta Sauce
              </h4>
              <div className="space-y-1.5">
                {customizingItem.availableSauces.map((sauce) => (
                  <label
                    key={sauce}
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                      selectedSauce === sauce
                        ? 'border-[#2D4030] bg-[#2D4030]/5 font-semibold text-[#2D4030]'
                        : 'border-[#E8E0D5] bg-white text-[#57534E] hover:bg-[#F3EDE2]'
                    }`}
                  >
                    <span>{sauce}</span>
                    <input
                      type="radio"
                      name="sauceOption"
                      checked={selectedSauce === sauce}
                      onChange={() => setSelectedSauce(sauce)}
                      className="accent-[#2D4030]"
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Spice Level */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-2 flex items-center justify-between">
              <span>2. Spice Preference</span>
              <span className="text-[11px] text-[#78716C] lowercase capitalize font-normal">
                {spiceLevel}
              </span>
            </h4>
            <div className="grid grid-cols-4 gap-2">
              {(['none', 'mild', 'medium', 'hot'] as SpiceLevel[]).map((level) => (
                <button
                  type="button"
                  key={level}
                  onClick={() => setSpiceLevel(level)}
                  className={`py-2 px-1 text-center rounded-lg border text-xs capitalize transition-colors ${
                    spiceLevel === level
                      ? 'border-[#C0392B] bg-[#C0392B]/10 font-bold text-[#C0392B]'
                      : 'border-[#E8E0D5] bg-white text-[#57534E] hover:bg-[#F3EDE2]'
                  }`}
                >
                  {level === 'none' && 'Mild (0)'}
                  {level === 'mild' && 'Mild (1🌶)'}
                  {level === 'medium' && 'Med (2🌶)'}
                  {level === 'hot' && 'Fiery (3🌶)'}
                </button>
              ))}
            </div>
          </div>

          {/* Extra Mozzarella Cheese */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-2">
              3. Cheese Indulgence
            </h4>
            <label
              className={`flex items-center justify-between p-3 rounded-lg border text-xs cursor-pointer transition-colors ${
                extraCheese
                  ? 'border-[#C89B3C] bg-amber-50/50 font-semibold text-[#1C1917]'
                  : 'border-[#E8E0D5] bg-white text-[#57534E] hover:bg-[#F3EDE2]'
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={extraCheese}
                  onChange={(e) => setExtraCheese(e.target.checked)}
                  className="accent-[#2D4030] w-4 h-4 rounded"
                />
                <span>Extra Melted Mozzarella & Parmesan</span>
              </div>
              <span className="font-bold text-[#2D4030]">+₹50</span>
            </label>
          </div>

          {/* Additional Gourmet Toppings */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-2">
              4. Extra Gourmet Toppings (+₹35 each)
            </h4>
            <div className="space-y-1.5">
              {addOnOptions.map((addon) => {
                const isSelected = selectedAddOns.includes(addon.label);
                return (
                  <label
                    key={addon.id}
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                      isSelected
                        ? 'border-[#2D4030] bg-[#2D4030]/5 font-semibold text-[#1C1917]'
                        : 'border-[#E8E0D5] bg-white text-[#57534E] hover:bg-[#F3EDE2]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleAddOn(addon.label)}
                        className="accent-[#2D4030] w-4 h-4 rounded"
                      />
                      <span>{addon.label}</span>
                    </div>
                    <span className="text-[#78716C]">+₹{addon.price}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Cooking Instructions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-1.5">
              Special Cooking Instructions (Optional)
            </h4>
            <textarea
              rows={2}
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Less garlic, no onion, separate sauce container..."
              className="w-full px-3 py-2 text-xs rounded-md border border-[#D5CBBF] bg-white text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#2D4030]"
            />
          </div>
        </div>

        {/* Footer with Quantity & Add Button */}
        <div className="p-4 bg-white border-t border-[#E8E0D5] flex items-center justify-between gap-4 shrink-0">
          {/* Quantity Controls */}
          <div className="flex items-center border border-[#D5CBBF] rounded-md overflow-hidden bg-[#FAF7F2]">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-2 text-[#57534E] hover:bg-[#EAE2D5] transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-3 text-xs font-bold text-[#1C1917]">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="p-2 text-[#57534E] hover:bg-[#EAE2D5] transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Cart Submit */}
          <button
            onClick={handleAddToCart}
            className="flex-1 py-3 px-4 text-xs font-bold uppercase tracking-wider bg-[#2D4030] hover:bg-[#202E23] text-white rounded-md shadow-sm transition-transform active:scale-95 flex items-center justify-between"
          >
            <span>Add Customized Item</span>
            <span className="font-serif text-sm">₹{totalPrice}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
