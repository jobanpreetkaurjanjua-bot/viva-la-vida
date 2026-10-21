import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { MapPin, Phone, MessageSquare, Clock, Navigation, ExternalLink, Calendar } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const { settings, setActiveTab } = useRestaurant();

  // Directions URL to Gurdaspur Bus Stand area on Google Maps
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Bus Stand, Gurdaspur, Punjab, India'
  )}`;

  const cleanPhone = settings.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsApp = settings.whatsapp.replace(/[^0-9]/g, '');

  return (
    <section id="location-section" className="py-16 sm:py-24 bg-[#F4EFEA] border-t border-[#E8E0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white p-7 sm:p-9 rounded-xl border border-[#E8E0D5] shadow-xs">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C0392B]">
                Visit Our Ristorante
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#1C1917] mt-1 mb-2">
                Find Viva La Vida
              </h2>
              <p className="text-sm text-[#57534E] mb-8 leading-relaxed">
                Conveniently situated right near the Bus Stand in Gurdaspur, making it effortless to drop by for a quick lunch, an evening family feast, or swift takeaway.
              </p>

              {/* Info Rows */}
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#E8E0D5] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#C0392B]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1C1917] uppercase tracking-wider">
                      Address
                    </h4>
                    <p className="text-sm text-[#57534E] mt-0.5 font-medium">
                      Viva La Vida
                    </p>
                    <p className="text-xs text-[#78716C]">
                      {settings.address}, {settings.city}, {settings.state} - {settings.postalCode}
                    </p>
                    <p className="text-[11px] text-[#2D4030] font-semibold mt-0.5">
                      Landmark: Near Main Bus Stand
                    </p>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#E8E0D5] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[#2D4030]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1C1917] uppercase tracking-wider">
                      Opening Hours
                    </h4>
                    <p className="text-sm text-[#1C1917] font-medium mt-0.5">
                      {settings.openingHours}
                    </p>
                    <p className="text-xs text-[#78716C]">
                      {settings.openingDays}
                    </p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#E8E0D5] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#C89B3C]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1C1917] uppercase tracking-wider">
                      Telephone
                    </h4>
                    <a
                      href={`tel:${cleanPhone}`}
                      className="text-sm font-semibold text-[#1C1917] hover:text-[#C0392B] transition-colors mt-0.5 inline-block"
                    >
                      {settings.phone}
                    </a>
                    <p className="text-xs text-[#78716C]">Direct line for reservations & inquiries</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#E8E0D5] flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1C1917] uppercase tracking-wider">
                      WhatsApp Orders & Support
                    </h4>
                    <a
                      href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
                        'Hi Viva La Vida, I would like to inquire about table booking or the food menu.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-emerald-700 hover:underline mt-0.5 inline-block"
                    >
                      {settings.whatsapp}
                    </a>
                    <p className="text-xs text-[#78716C]">Instant chat with our staff</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Prompt Action Buttons */}
            <div className="pt-8 mt-8 border-t border-[#F3EDE2] flex flex-wrap gap-2.5">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#2D4030] text-white rounded hover:bg-[#202E23] transition-colors shadow-xs"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
              </a>

              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#2D4030] border border-[#2D4030] rounded hover:bg-[#FAF7F2] transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Us</span>
              </a>

              <button
                onClick={() => {
                  setActiveTab('menu');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#C0392B] text-white rounded hover:bg-[#A93226] transition-colors shadow-xs"
              >
                <span>Order Online</span>
              </button>
            </div>
          </div>

          {/* Interactive Map Column */}
          <div className="lg:col-span-7 flex flex-col rounded-xl overflow-hidden border border-[#E8E0D5] bg-white shadow-xs">
            <div className="p-4 bg-[#FAF7F2] border-b border-[#E8E0D5] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C0392B]" />
                <span className="text-xs font-bold text-[#1C1917]">
                  Near Bus Stand, Gurdaspur, Punjab
                </span>
              </div>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-[#2D4030] hover:underline flex items-center gap-1"
              >
                <span>View Full Map</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Embedded Google Map iframe focused on Gurdaspur Bus Stand */}
            <div className="relative w-full h-[360px] sm:h-[420px] lg:h-full min-h-[360px] bg-stone-100">
              <iframe
                title="Viva La Vida Location near Bus Stand, Gurdaspur"
                src="https://maps.google.com/maps?q=Bus+Stand+Gurdaspur+Punjab+India&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
