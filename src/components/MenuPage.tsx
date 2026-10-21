import React, { useState, useMemo } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { MenuCategory, MenuItem } from '../types/restaurant';
import { Search, SlidersHorizontal, Plus, Flame, Filter, UtensilsCrossed, Info } from 'lucide-react';

export const MenuPage: React.FC = () => {
  const { menuItems, addToCart, setCustomizingItem, setIsCartOpen, cartCount } = useRestaurant();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [vegOnly, setVegOnly] = useState(false);
  const [spiceFilter, setSpiceFilter] = useState<'all' | 'mild' | 'hot'>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc'>('recommended');

  const categories: { id: MenuCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Dishes', count: menuItems.length },
    { id: 'pasta', label: 'Artisan Pasta', count: menuItems.filter((i) => i.category === 'pasta').length },
    { id: 'pizza', label: 'Italian Pizzas', count: menuItems.filter((i) => i.category === 'pizza').length },
    { id: 'starters', label: 'Starters & Breads', count: menuItems.filter((i) => i.category === 'starters').length },
    { id: 'sides', label: 'Sides', count: menuItems.filter((i) => i.category === 'sides').length },
    { id: 'desserts', label: 'Dolci (Desserts)', count: menuItems.filter((i) => i.category === 'desserts').length },
    { id: 'beverages', label: 'Beverages', count: menuItems.filter((i) => i.category === 'beverages').length },
  ];

  const filteredItems = useMemo(() => {
    return menuItems
      .filter((item) => {
        // Category filter
        if (selectedCategory !== 'all' && item.category !== selectedCategory) {
          return false;
        }

        // Veg filter
        if (vegOnly && !item.isVegetarian) {
          return false;
        }

        // Spice filter
        if (spiceFilter === 'mild' && (item.spiceLevel === 'medium' || item.spiceLevel === 'hot')) {
          return false;
        }
        if (spiceFilter === 'hot' && item.spiceLevel !== 'hot' && item.spiceLevel !== 'medium') {
          return false;
        }

        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = item.name.toLowerCase().includes(q);
          const matchDesc = item.description.toLowerCase().includes(q);
          const matchItalian = item.italianName?.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchItalian) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        // recommended: bestsellers first
        if (a.isBestseller && !b.isBestseller) return -1;
        if (!a.isBestseller && b.isBestseller) return 1;
        return 0;
      });
  }, [menuItems, selectedCategory, vegOnly, spiceFilter, searchQuery, sortBy]);

  return (
    <div className="py-10 sm:py-16 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Menu Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C0392B]">
            Handcrafted Italian Fare
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1917] mt-2 mb-3">
            Our Complete Italian Menu
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
            Every dish is prepared fresh to order in Gurdaspur using authentic Italian inspirations, slow-simmered sauces, and melted cheeses.
          </p>

          <div className="inline-flex items-center gap-1.5 mt-3 text-xs text-[#78716C] bg-[#F3EDE2] px-3.5 py-1.5 rounded-md border border-[#E8E0D5]">
            <Info className="w-3.5 h-3.5 text-[#2D4030]" />
            <span>All menu items and prices can be modified by the restaurant owner in the Staff Portal</span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#E8E0D5] shadow-xs mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pasta, pizzas, garlic bread, tiramisu..."
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-[#D5CBBF] bg-[#FAF7F2] text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#2D4030]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Veg Only Toggle */}
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-bold uppercase tracking-wider text-[#1C1917] px-3 py-2 bg-[#FAF7F2] rounded-lg border border-[#E8E0D5] shrink-0">
              <div className="p-0.5 border border-emerald-600 rounded">
                <div className="w-2 h-2 rounded-full bg-emerald-600" />
              </div>
              <input
                type="checkbox"
                checked={vegOnly}
                onChange={(e) => setVegOnly(e.target.checked)}
                className="accent-emerald-600 w-4 h-4 rounded cursor-pointer"
              />
              <span>Pure Veg Only</span>
            </label>

            {/* Spice Filter */}
            <select
              value={spiceFilter}
              onChange={(e) => setSpiceFilter(e.target.value as any)}
              className="text-xs font-semibold py-2.5 px-3 rounded-lg border border-[#D5CBBF] bg-[#FAF7F2] text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#2D4030] shrink-0"
            >
              <option value="all">All Spice Levels</option>
              <option value="mild">Gentle / Mild Only</option>
              <option value="hot">Medium & Fiery 🌶</option>
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-semibold py-2.5 px-3 rounded-lg border border-[#D5CBBF] bg-[#FAF7F2] text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#2D4030] shrink-0"
            >
              <option value="recommended">Featured & Bestsellers</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors shrink-0 flex items-center gap-1.5 focus:outline-none ${
                    isActive
                      ? 'bg-[#2D4030] text-[#FAF7F2] shadow-xs'
                      : 'bg-[#FAF7F2] text-[#57534E] hover:text-[#1C1917] hover:bg-[#F3EDE2] border border-[#E8E0D5]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count & Notice */}
        <div className="flex items-center justify-between mb-6 text-xs text-[#57534E]">
          <p>
            Showing <strong>{filteredItems.length}</strong> delicious items
          </p>
          {cartCount > 0 && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="font-bold text-[#C0392B] hover:underline"
            >
              View Cart ({cartCount} items) →
            </button>
          )}
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-[#E8E0D5] p-8">
            <UtensilsCrossed className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-[#1C1917]">No Dishes Found</h3>
            <p className="text-sm text-[#57534E] mt-1 max-w-sm mx-auto">
              We couldn't find any dish matching your search filters. Try clearing the search or changing category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setVegOnly(false);
                setSpiceFilter('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#2D4030] text-white rounded hover:bg-[#202E23] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const hasCustomization =
                item.category === 'pasta' || (item.availableSauces && item.availableSauces.length > 0);

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-[#E8E0D5] overflow-hidden flex flex-col justify-between hover:border-[#2D4030]/40 hover:shadow-md transition-all duration-300 group"
                >
                  {/* Dish Image */}
                  <div className="relative h-48 w-full bg-[#EAE2D5] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Pure Veg Indicator */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm p-1 rounded border border-emerald-600/40 shadow-xs flex items-center gap-1.5 px-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                        Pure Veg
                      </span>
                    </div>

                    {/* Price Tag */}
                    <div className="absolute bottom-3 right-3 bg-[#1C1917]/90 backdrop-blur-sm text-white px-3 py-1 rounded text-sm font-bold tracking-tight shadow-xs">
                      ₹{item.price}
                    </div>

                    {/* Specialty / Bestseller Badge */}
                    {item.isBestseller && (
                      <div className="absolute top-3 right-3 bg-[#C0392B] text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        Bestseller
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {item.italianName && (
                        <p className="text-xs font-serif italic text-[#C0392B] mb-0.5">
                          {item.italianName}
                        </p>
                      )}
                      <h3 className="font-serif text-lg font-bold text-[#1C1917] group-hover:text-[#2D4030] transition-colors leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#57534E] mt-2 line-clamp-3 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Allergens & Prep metadata */}
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-[#78716C]">
                        {item.allergens && item.allergens.length > 0 && (
                          <span>Allergens: {item.allergens.join(', ')}</span>
                        )}
                        {item.preparationTimeMinutes && (
                          <>
                            <span>·</span>
                            <span>{item.preparationTimeMinutes} min</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-5 pt-3 border-t border-[#F3EDE2] flex items-center justify-between">
                      {/* Spice Indicator */}
                      <div className="flex items-center gap-1 text-[11px] text-[#78716C]">
                        {item.spiceLevel === 'hot' ? (
                          <span className="text-rose-700 font-semibold flex items-center gap-0.5">
                            <Flame className="w-3 h-3 text-rose-600" /> Fiery
                          </span>
                        ) : item.spiceLevel === 'medium' ? (
                          <span className="text-orange-700 font-medium flex items-center gap-0.5">
                            <Flame className="w-3 h-3 text-orange-500" /> Medium
                          </span>
                        ) : item.spiceLevel === 'mild' ? (
                          <span className="text-amber-700 font-medium flex items-center gap-0.5">
                            <Flame className="w-3 h-3 text-amber-500" /> Mild
                          </span>
                        ) : (
                          <span>Mild</span>
                        )}
                      </div>

                      {/* Add Button */}
                      <div className="flex items-center gap-1.5">
                        {hasCustomization && (
                          <button
                            onClick={() => setCustomizingItem(item)}
                            className="p-2 text-xs font-medium text-[#2D4030] bg-[#FAF7F2] hover:bg-[#EAE2D5] rounded border border-[#E8E0D5] transition-colors"
                            title="Customize Sauce & Toppings"
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
                          className={`inline-flex items-center gap-1 px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all active:scale-95 shadow-xs ${
                            item.isAvailable
                              ? 'bg-[#2D4030] hover:bg-[#202E23] text-white'
                              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                          }`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{item.isAvailable ? 'Add to Cart' : 'Sold Out'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
