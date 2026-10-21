import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { MessageSquare, X } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const { settings } = useRestaurant();
  const [showTooltip, setShowTooltip] = useState(false);

  const cleanNumber = settings.whatsapp.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(
    'Hi Viva La Vida, I would like to inquire about table reservations and food ordering.'
  );
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMsg}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#1C1917] text-white text-xs px-3 py-2 rounded-lg shadow-lg border border-white/10 animate-fade-in">
          <span>Chat with Viva La Vida host on WhatsApp</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-stone-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white focus:outline-none"
        aria-label="Contact Viva La Vida on WhatsApp"
      >
        <MessageSquare className="w-7 h-7" />
        <span className="sr-only">WhatsApp</span>
      </a>
    </div>
  );
};
