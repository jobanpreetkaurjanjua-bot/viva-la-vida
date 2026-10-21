import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Heart, Utensils, Users, Award, X, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { setActiveTab } = useRestaurant();
  const [showStoryModal, setShowStoryModal] = useState(false);

  return (
    <section id="about-section" className="py-16 sm:py-24 bg-[#FAF7F2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Visual Column */}
          <div className="relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Image */}
              <div className="rounded-xl overflow-hidden border border-[#E8E0D5] shadow-lg bg-[#EAE2D5]">
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80"
                  alt="Italian culinary preparation and warm restaurant ambiance"
                  className="w-full h-[400px] sm:h-[480px] object-cover"
                />
              </div>

              {/* Secondary Floating Feature Card */}
              <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:right-6 bg-white p-5 rounded-lg border border-[#E8E0D5] shadow-xl max-w-xs hidden sm:block">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full bg-[#2D4030] text-[#FAF7F2] flex items-center justify-center">
                    <Heart className="w-5 h-5 text-[#C89B3C]" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#1C1917]">La Famiglia</h4>
                    <p className="text-[11px] text-[#78716C]">A Little Taste of Italy</p>
                  </div>
                </div>
                <p className="text-xs text-[#57534E] italic leading-relaxed">
                  "Food tastes best when shared across a table with laughter and loved ones."
                </p>
              </div>

              {/* Decorative Corner Trim */}
              <div className="absolute -top-3 -left-3 w-20 h-20 border-t-2 border-l-2 border-[#C89B3C] rounded-tl-xl pointer-events-none" />
            </div>
          </div>

          {/* Narrative Column */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C0392B] mb-3">
              <span className="w-6 h-[1px] bg-[#C0392B]" />
              <span>About Our Restaurant</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] leading-tight mb-6">
              More Than a Meal, <br />
              <span className="italic text-[#2D4030]">It's an Experience.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#57534E] leading-relaxed mb-4">
              Born from a genuine passion for authentic European dining, <strong className="font-semibold text-[#1C1917]">Viva La Vida</strong> brings the warmth, aromas, and heartfelt joy of Italian cuisine directly to the vibrant heart of Gurdaspur, right beside the Bus Stand.
            </p>

            <p className="text-sm sm:text-base text-[#57534E] leading-relaxed mb-6">
              In Italy, eating is never rushed. It is a celebration of seasonal herbs, simmering tomato ragù, delicate garlic-infused olive oils, and lively conversations. Whether you are treating your family to a velvety Alfredo pasta, stopping by for artisan garlic bread after work, or gathering for an anniversary date night, our doors are open with true Italian hospitality.
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-4 pt-2 mb-8">
              <div className="flex items-start gap-3">
                <Utensils className="w-5 h-5 text-[#C0392B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#1C1917] uppercase tracking-wide">
                    Artisan Pasta
                  </h4>
                  <p className="text-[11px] text-[#78716C]">Boiled al dente in fresh sauces</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-[#2D4030] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#1C1917] uppercase tracking-wide">
                    Warm Hospitality
                  </h4>
                  <p className="text-[11px] text-[#78716C]">Comfortable family seating</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setShowStoryModal(true)}
                className="px-6 py-3 text-xs font-bold uppercase tracking-wider bg-[#2D4030] text-white rounded-md hover:bg-[#202E23] transition-colors shadow-sm focus:outline-none"
              >
                Discover Our Story
              </button>

              <button
                onClick={() => {
                  setActiveTab('book');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#2D4030] border border-[#2D4030] rounded-md hover:bg-[#2D4030]/5 transition-colors focus:outline-none"
              >
                Plan Your Visit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Discover Our Story Modal */}
      {showStoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FAF7F2] rounded-xl max-w-2xl w-full p-6 sm:p-8 border border-[#E8E0D5] shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowStoryModal(false)}
              className="absolute top-4 right-4 p-2 text-[#57534E] hover:text-[#1C1917] rounded-full hover:bg-[#EAE2D5] transition-colors"
              aria-label="Close Story"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C0392B]">
                The Story Behind Viva La Vida
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] mt-1">
                A Little Taste of Italy, Right Here in Gurdaspur
              </h3>
            </div>

            <div className="space-y-4 text-sm text-[#57534E] leading-relaxed">
              <p>
                Viva La Vida was established with one passionate mission: to introduce the citizens of Gurdaspur to genuine Italian culinary traditions. For years, enjoying a velvety fettuccine alfredo or a fragrant basil pesto meant traveling all the way to larger metropolitan cities.
              </p>
              <p>
                We asked ourselves: why shouldn't friends, college students, couples, and food-loving families right here in Gurdaspur enjoy high-end pasta dishes made with meticulous care and served in an elegant European setting?
              </p>
              <p>
                Located conveniently near the Gurdaspur Bus Stand, our kitchen combines classic Italian culinary methods with local dining warmth. We never rush pasta in a microwave; every skillet is fired when you order, tossing fresh penne or fettuccine in handcrafted sauces infused with aromatic garlic, oregano, basil, and aged cheeses.
              </p>
              <div className="p-4 bg-[#F3EDE2] rounded-lg border border-[#E8E0D5]">
                <h4 className="font-serif font-bold text-[#1C1917] mb-1">Owner’s Note</h4>
                <p className="text-xs text-[#78716C]">
                  This sample restaurant history can be personalized anytime by the restaurant owner inside the Staff Portal to reflect your actual founding date, chef inspiration, and milestones.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E8E0D5] flex justify-end">
              <button
                onClick={() => setShowStoryModal(false)}
                className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-[#2D4030] text-white rounded hover:bg-[#202E23] transition-colors"
              >
                Close Story
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
