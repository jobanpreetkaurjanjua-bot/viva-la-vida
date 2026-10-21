import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/initialData';
import { X, ZoomIn, Info } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'pasta' | 'pizza' | 'desserts' | 'interior' | 'beverages'>('all');
  const [selectedImage, setSelectedImage] = useState<(typeof GALLERY_ITEMS)[0] | null>(null);

  const filteredItems = activeFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  const filterTabs = [
    { id: 'all', label: 'All Photos' },
    { id: 'pasta', label: 'Artisan Pastas' },
    { id: 'pizza', label: 'Italian Pizzas' },
    { id: 'interior', label: 'Dining Interiors' },
    { id: 'desserts', label: 'Desserts & Sweets' },
    { id: 'beverages', label: 'Beverages' },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#E8E0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C0392B]">
            Moments & Flavours
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] mt-1 mb-3">
            Restaurant Gallery
          </h2>
          <p className="text-sm text-[#57534E] leading-relaxed">
            A glimpse into our kitchen crafts, warm table settings, and heartfelt moments of dining joy.
          </p>

          <p className="text-[11px] text-[#78716C] mt-2 italic flex items-center justify-center gap-1">
            <Info className="w-3 h-3 text-[#2D4030]" />
            Atmospheric and culinary imagery representing Viva La Vida’s handcrafted menu & dining experience.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all focus:outline-none ${
                  isActive
                    ? 'bg-[#2D4030] text-[#FAF7F2] shadow-sm'
                    : 'bg-[#F3EDE2] text-[#57534E] hover:text-[#1C1917] hover:bg-[#EAE2D5]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative h-64 rounded-lg overflow-hidden cursor-pointer bg-[#EAE2D5] border border-[#E8E0D5] hover:border-[#2D4030]/50 transition-all shadow-xs"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] uppercase font-semibold text-[#C89B3C] tracking-wider">
                  {item.category}
                </span>
                <h4 className="font-serif text-sm font-bold">{item.title}</h4>
                <p className="text-[11px] text-white/80 line-clamp-1 mt-0.5">{item.description}</p>
                <div className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 backdrop-blur-sm">
                  <ZoomIn className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#1C1917] rounded-xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 z-10 p-2 text-white/80 hover:text-white bg-black/50 rounded-full transition-colors"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[75vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[75vh] object-contain"
              />
            </div>

            <div className="p-5 bg-[#1F2E22] text-[#FAF7F2] flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-semibold text-[#C89B3C] tracking-wider">
                  {selectedImage.category}
                </span>
                <h3 className="font-serif text-xl font-bold">{selectedImage.title}</h3>
                <p className="text-xs text-[#EAE2D5]/80 mt-1">{selectedImage.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
