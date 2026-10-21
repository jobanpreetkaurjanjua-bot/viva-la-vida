import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { MenuItem } from '../types/restaurant';
import { ChevronLeft, ChevronRight, Plus, SlidersHorizontal, Flame } from 'lucide-react';

export const BestsellersCarousel: React.FC = () => {
  const { menuItems, addToCart, setCustomizingItem } = useRestaurant();

  // Dynamically pull items marked as isBestseller or fallback to high rated
  const bestsellers = menuItems.filter((i) => i.isBestseller && i.isAvailable);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Visible items count based on standard responsive breakpoints: 1 (mobile), 2 (tablet), 3 (desktop)
  const itemsPerView = 3;
  const maxIndex = Math.max(0, bestsellers.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const getSpiceBadge = (level: string) => {
    if (level === 'mild') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] text-amber-700 font-medium">
          <Flame className="w-3 h-3 text-amber-500" />
          Mild
        </span>
      );
    }
    if (level === 'medium') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] text-orange-700 font-medium">
          <Flame className="w-3 h-3 text-orange-500" />
          <Flame className="w-3 h-3 text-orange-500 -ml-2" />
          Medium
        </span>
      );
    }
    if (level === 'hot') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] text-rose-700 font-semibold">
          <Flame className="w-3 h-3 text-rose-600" />
          <Flame className="w-3 h-3 text-rose-600 -ml-2" />
          <Flame className="w-3 h-3 text-rose-600 -ml-2" />
          Fiery
        </span>
      );
    }
    return (
      <span className="text-[11px] text-[#78716C]">Gentle</span>
    );
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Carousel Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C0392B]">
              Guest Favorites in Gurdaspur
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] mt-1">
              Most Loved Italian Bestsellers
            </h2>
            <p className="text-sm text-[#57534E] mt-1">
              Hand-spun noodles, bubbling baked lasagnas, and classic sweets loved by our diners.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`p-2.5 rounded-full border transition-colors ${
                currentIndex === 0
                  ? 'border-[#E8E0D5] text-stone-300 cursor-not-allowed'
                  : 'border-[#2D4030] text-[#2D4030] hover:bg-[#2D4030] hover:text-white'
              }`}
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className={`p-2.5 rounded-full border transition-colors ${
                currentIndex >= maxIndex
                  ? 'border-[#E8E0D5] text-stone-300 cursor-not-allowed'
                  : 'border-[#2D4030] text-[#2D4030] hover:bg-[#2D4030] hover:text-white'
              }`}
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out gap-6"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {bestsellers.map((item) => {
              const hasCustomization =
                item.category === 'pasta' || (item.availableSauces && item.availableSauces.length > 0);

              return (
                <div
                  key={item.id}
                  className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 bg-white rounded-xl border border-[#E8E0D5] overflow-hidden flex flex-col hover:border-[#2D4030]/40 hover:shadow-lg transition-all duration-300"
                >
                  {/* Image with dietary tag */}
                  <div className="relative h-56 w-full overflow-hidden bg-[#EAE2D5]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Standard Indian Veg Dot */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm p-1 rounded border border-emerald-600/40 shadow-xs flex items-center gap-1.5 px-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                      <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                        Pure Veg
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-[#1C1917]/90 backdrop-blur-sm text-white px-3 py-1 rounded text-sm font-bold tracking-tight">
                      ₹{item.price}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {item.italianName && (
                        <p className="text-xs font-serif italic text-[#C0392B] mb-1">
                          {item.italianName}
                        </p>
                      )}
                      <h3 className="font-serif text-xl font-bold text-[#1C1917] leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#57534E] mt-2 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#F3EDE2] flex items-center justify-between">
                      {/* Spice Indicator */}
                      <div className="flex items-center gap-1">
                        {getSpiceBadge(item.spiceLevel)}
                      </div>

                      {/* Add Button */}
                      <div className="flex items-center gap-2">
                        {hasCustomization && (
                          <button
                            onClick={() => setCustomizingItem(item)}
                            className="p-2 text-xs font-medium text-[#2D4030] bg-[#FAF7F2] hover:bg-[#EAE2D5] rounded border border-[#E8E0D5] transition-colors"
                            title="Customize Options"
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
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider bg-[#2D4030] hover:bg-[#202E23] text-white rounded transition-transform active:scale-95 shadow-sm"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
