import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { ArrowRight, Utensils, Calendar, Sparkles, MapPin } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setActiveTab } = useRestaurant();

  return (
    <section className="relative overflow-hidden bg-[#1F2E22] text-[#FAF7F2] min-h-[580px] lg:min-h-[640px] flex items-center">
      {/* Background Italian Food & Dining Atmosphere Image with gradient overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=2000&q=85"
          alt="Artisan freshly prepared Italian pasta and wine table setting"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-fade-in"
        />
        {/* Multilayer gradient for optimal text contrast and romantic warmth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#172319]/95 via-[#1F2E22]/85 to-[#172319]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F2E22] via-transparent to-black/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-2xl">
          {/* Subtle Italian Motif Kicker */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C89B3C] mb-4">
            <span className="w-8 h-[1px] bg-[#C89B3C]" />
            <span>Italian Dining in Gurdaspur, Punjab</span>
            <span className="w-8 h-[1px] bg-[#C89B3C]" />
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15] mb-5">
            Benvenuti a <br />
            <span className="text-[#F3EDE2] italic">Viva La Vida</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-[#EAE2D5] font-light leading-relaxed mb-8 max-w-xl">
            Experience the love of Italy through handcrafted pasta, delicious Italian classics, and unforgettable flavours — right here in Gurdaspur.
          </p>

          {/* Three Prominent Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
            {/* 1. Explore Our Menu */}
            <button
              onClick={() => {
                setActiveTab('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold uppercase tracking-wider bg-white text-[#2D4030] rounded-md hover:bg-[#FAF7F2] shadow-lg transition-transform active:scale-95 focus:outline-none"
            >
              <Utensils className="w-4 h-4 text-[#C0392B]" />
              <span>Explore Our Menu</span>
            </button>

            {/* 2. Order Online */}
            <button
              onClick={() => {
                setActiveTab('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold uppercase tracking-wider bg-[#C0392B] text-white rounded-md hover:bg-[#A93226] shadow-lg transition-transform active:scale-95 focus:outline-none"
            >
              <span>Order Online</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* 3. Reserve Your Table */}
            <button
              onClick={() => {
                setActiveTab('book');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-[#FAF7F2] border border-[#FAF7F2]/40 rounded-md hover:bg-white/10 backdrop-blur-sm transition-colors active:scale-95 focus:outline-none"
            >
              <Calendar className="w-4 h-4 text-[#C89B3C]" />
              <span>Reserve Your Table</span>
            </button>
          </div>

          {/* Unboxed Metadata Highlights */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#EAE2D5]/80 pt-4 border-t border-white/15">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C89B3C]" />
              Handmade Pasta & Wood-Fired Crusts
            </span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C89B3C]" />
              100% Fresh to Order
            </span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C0392B]" />
              Near Bus Stand, Gurdaspur
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
