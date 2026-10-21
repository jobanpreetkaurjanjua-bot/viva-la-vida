import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { ShoppingBag, Calendar, Phone, Menu as MenuIcon, X, MapPin, Clock, ShieldCheck, Search } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    settings,
    cartCount,
    setIsCartOpen,
    activeTab,
    setActiveTab,
  } = useRestaurant();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Our Menu' },
    { id: 'about', label: 'About Us' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'find', label: 'Find Us' },
    { id: 'track', label: 'Track Order' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'find') {
      setActiveTab('home');
      setTimeout(() => {
        const el = document.getElementById('location-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    if (id === 'about') {
      setActiveTab('home');
      setTimeout(() => {
        const el = document.getElementById('about-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    if (id === 'gallery') {
      setActiveTab('gallery');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setActiveTab(id as any);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E0D5] transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-[#2D4030] text-[#FAF7F2] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Authentic Italian Flavours Near Bus Stand, Gurdaspur
            </span>
            <span className="hidden md:inline text-white/40">·</span>
            <span className="hidden md:flex items-center gap-1 text-white/80">
              <Clock className="w-3.5 h-3.5" />
              {settings.openingHours}
            </span>
          </div>

          <div className="flex items-center gap-4 text-white/90 text-xs">
            <a
              href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>{settings.phone}</span>
            </a>
            <span className="text-white/30">|</span>
            <button
              onClick={() => {
                setActiveTab('admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1 hover:text-[#C89B3C] text-white/70 transition-colors"
              title="Restaurant Staff Management"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Staff Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-11 h-11 rounded-full bg-[#2D4030] flex items-center justify-center text-[#FAF7F2] shadow-sm group-hover:bg-[#233326] transition-colors border border-[#C89B3C]/30">
              <span className="font-serif text-xl italic font-bold">V</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-2xl font-bold tracking-tight text-[#1C1917] group-hover:text-[#2D4030] transition-colors">
                  Viva La Vida
                </span>
                <span className="text-xs text-[#C0392B] font-semibold uppercase tracking-widest hidden sm:inline">
                  🇮🇹
                </span>
              </div>
              <p className="text-[11px] text-[#57534E] tracking-wider uppercase font-medium">
                Italian Dining · Gurdaspur
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-sm font-medium transition-colors relative py-1 focus:outline-none ${
                    isActive
                      ? 'text-[#2D4030] font-semibold'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C0392B] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Book a Table button */}
            <button
              onClick={() => {
                setActiveTab('book');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-[#2D4030] border border-[#2D4030] rounded-md hover:bg-[#2D4030] hover:text-[#FAF7F2] transition-colors focus:outline-none"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book a Table</span>
            </button>

            {/* Order Online button */}
            <button
              onClick={() => {
                setActiveTab('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider bg-[#C0392B] text-white rounded-md hover:bg-[#A93226] shadow-sm transition-colors focus:outline-none"
            >
              <span>Order Online</span>
            </button>

            {/* Shopping Cart button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-md bg-[#FAF7F2] text-[#1C1917] hover:bg-[#EAE2D5] border border-[#E8E0D5] transition-colors focus:outline-none"
              aria-label={`Shopping Cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5 text-[#2D4030]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#C0392B] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-[#1C1917] hover:bg-[#EAE2D5] transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E8E0D5] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  activeTab === link.id
                    ? 'bg-[#2D4030] text-[#FAF7F2]'
                    : 'text-[#1C1917] hover:bg-[#EAE2D5]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E8E0D5] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveTab('book');
              }}
              className="w-full py-2.5 text-center text-sm font-semibold uppercase tracking-wider text-[#2D4030] border border-[#2D4030] rounded-md bg-white hover:bg-[#2D4030] hover:text-white transition-colors"
            >
              Reserve a Table
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveTab('menu');
              }}
              className="w-full py-2.5 text-center text-sm font-semibold uppercase tracking-wider text-white bg-[#C0392B] hover:bg-[#A93226] rounded-md transition-colors"
            >
              Explore Menu & Order
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
