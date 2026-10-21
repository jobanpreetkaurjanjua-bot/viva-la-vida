import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { PolicyModal, PolicyType } from './PolicyModal';
import { MapPin, Phone, Clock, Instagram, Facebook, Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, setActiveTab } = useRestaurant();
  const [activePolicy, setActivePolicy] = useState<PolicyType | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#172319] text-[#EAE2D5] border-t border-[#233326]">
      {/* Policy Modal */}
      <PolicyModal policy={activePolicy} onClose={() => setActivePolicy(null)} />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2D4030] border border-[#C89B3C]/40 flex items-center justify-center text-[#FAF7F2]">
                <span className="font-serif text-lg font-bold italic">V</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                  Viva La Vida
                </span>
                <span className="text-[10px] uppercase font-semibold text-[#C89B3C] tracking-widest block">
                  Autentica Cucina Italiana
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#D5CBBF] leading-relaxed max-w-sm">
              "{settings.tagline}"
            </p>
            <p className="text-xs text-[#A8A29E] leading-relaxed">
              Bringing artisan pasta, wood-fired crusts, and warm Italian hospitality to the heart of Gurdaspur, Punjab.
            </p>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-3">
              {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C0392B] flex items-center justify-center text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#2D4030] flex items-center justify-center text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C89B3C] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D5CBBF]">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('home');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('menu');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Our Complete Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('book');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Table Reservations
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('gallery');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Photo Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('track');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Track Live Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('admin');
                    scrollToTop();
                  }}
                  className="hover:text-[#C89B3C] text-[#A8A29E] transition-colors text-left"
                >
                  Staff Management
                </button>
              </li>
            </ul>
          </div>

          {/* Menu Highlights Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C89B3C] mb-4">
              Cucina Italiana
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D5CBBF]">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('menu');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors"
                >
                  Fettuccine Alfredo
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('menu');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors"
                >
                  Penne all’Arrabbiata
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('menu');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors"
                >
                  Pink Sauce Pasta
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('menu');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors"
                >
                  Baked Lasagna
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('menu');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors"
                >
                  Wood-Fired Pizza
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('menu');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors"
                >
                  Venetian Tiramisu
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C89B3C] mb-4">
              Contact & Hours
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-[#D5CBBF]">
              <MapPin className="w-4 h-4 text-[#C0392B] shrink-0 mt-0.5" />
              <span>
                {settings.name}, {settings.address}, {settings.city}, {settings.state} - {settings.postalCode}
              </span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-[#D5CBBF]">
              <Clock className="w-4 h-4 text-[#C89B3C] shrink-0" />
              <span>{settings.openingHours} ({settings.openingDays})</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-[#D5CBBF]">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white">
                {settings.phone} / WhatsApp: {settings.whatsapp}
              </a>
            </div>

            {/* Newsletter Subscription with Consent */}
            <div className="pt-3">
              <label className="block text-[11px] text-[#A8A29E] uppercase tracking-wider mb-1.5">
                Join Viva La Vida Club (Special Offers)
              </label>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Grazie! You have subscribed to Viva La Vida club offers.');
                }}
                className="flex items-center gap-1.5"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter email for chef specials..."
                  className="px-3 py-1.5 text-xs rounded bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-[#C89B3C] flex-1"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-[#C0392B] text-white rounded hover:bg-[#A93226] transition-colors"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Legal Policies & Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A8A29E]">
          <div>
            © {new Date().getFullYear()} Viva La Vida · All rights reserved · Italian Dining in Gurdaspur, Punjab
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setActivePolicy('privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => setActivePolicy('terms')}
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </button>
            <span>·</span>
            <button
              onClick={() => setActivePolicy('delivery')}
              className="hover:text-white transition-colors"
            >
              Delivery Policy
            </button>
            <span>·</span>
            <button
              onClick={() => setActivePolicy('refund')}
              className="hover:text-white transition-colors"
            >
              Cancellation & Refund Policy
            </button>
          </div>

          {/* Scroll to top */}
          <button
            onClick={scrollToTop}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
