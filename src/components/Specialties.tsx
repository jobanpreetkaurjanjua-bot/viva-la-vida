import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { MenuItem } from '../types/restaurant';
import { Plus, SlidersHorizontal, Info } from 'lucide-react';

export const Specialties: React.FC = () => {
  const { menuItems, addToCart, setCustomizingItem, setActiveTab } = useRestaurant();

  // Filter out the specialties matching prompt items
  const specialtyIds = [
    'pasta-alfredo',
    'pasta-arrabbiata',
    'pasta-pink-sauce',
    'pasta-lasagna',
    'starter-garlic-bread',
    'pizza-margherita',
    'pasta-macaroni',
    'dessert-tiramisu',
  ];

  const specialtyItems = specialtyIds
    .map((id) => menuItems.find((item) => item.id === id))
    .filter(Boolean) as MenuItem[];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C0392B]">
            Chef’s Curated Creations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] mt-2 mb-4">
            Our Signature Specialties
          </h2>
          <p className="text-[#57534E] text-sm sm:text-base leading-relaxed">
            From slow-cooked San Marzano pomodoro to velvety parmesan creams and bubbly wood-fired crusts, taste what makes Viva La Vida special.
          </p>

          {/* Sample Pricing Disclaimer / Editable Note */}
          <div className="inline-flex items-center gap-1.5 mt-3 text-xs text-[#78716C] bg-[#F3EDE2] px-3 py-1.5 rounded-md border border-[#E8E0D5]">
            <Info className="w-3.5 h-3.5 text-[#2D4030]" />
            <span>Sample menu & prices shown · Fully editable by the owner in the Staff Portal</span>
          </div>
        </div>

        {/* 8 Specialties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {specialtyItems.map((item) => {
            const hasCustomization =
              item.category === 'pasta' || (item.availableSauces && item.availableSauces.length > 0);

            return (
              <div
                key={item.id}
                className="group bg-white rounded-lg border border-[#E8E0D5] overflow-hidden flex flex-col hover:border-[#2D4030]/40 hover:shadow-md transition-all duration-300"
              >
                {/* Image Container with Veg Indicator */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#EAE2D5]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Veg Indicator Badge in standard Indian green square */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-1 rounded border border-emerald-600/30 shadow-xs">
                    <span className="block w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  </div>

                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-3 right-3 bg-[#1C1917]/85 backdrop-blur-sm text-white px-2.5 py-1 rounded text-xs font-semibold tracking-wide shadow-sm">
                    ₹{item.price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {item.italianName && (
                      <p className="text-[11px] font-serif italic text-[#C0392B] mb-0.5">
                        {item.italianName}
                      </p>
                    )}
                    <h3 className="font-serif text-lg font-bold text-[#1C1917] group-hover:text-[#2D4030] transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#57534E] mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 pt-3 border-t border-[#F3EDE2] flex items-center justify-between gap-2">
                    <div className="text-xs text-[#78716C]">
                      {item.preparationTimeMinutes ? `${item.preparationTimeMinutes} mins prep` : 'Made fresh'}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {hasCustomization && (
                        <button
                          onClick={() => setCustomizingItem(item)}
                          className="p-2 text-xs font-medium text-[#2D4030] bg-[#FAF7F2] hover:bg-[#EAE2D5] rounded border border-[#E8E0D5] transition-colors"
                          title="Customize sauce & spice"
                        >
                          <SlidersHorizontal className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={() => {
                          if (hasCustomization) {
                            setCustomizingItem(item);
                          } else {
                            addToCart(item);
                          }
                        }}
                        disabled={!item.isAvailable}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-colors ${
                          item.isAvailable
                            ? 'bg-[#2D4030] hover:bg-[#202E23] text-white active:scale-95'
                            : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{item.isAvailable ? 'Add' : 'Sold Out'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Full Menu CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => {
              setActiveTab('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#2D4030] border-2 border-[#2D4030] rounded-md hover:bg-[#2D4030] hover:text-white transition-all shadow-sm"
          >
            <span>Explore All Pasta, Pizzas & Desserts</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};
