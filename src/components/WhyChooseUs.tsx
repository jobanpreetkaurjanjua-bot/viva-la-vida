import React from 'react';
import { Sparkles, UtensilsCrossed, Bike, Users, ShieldCheck } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: Sparkles,
      title: 'Italian-Inspired Flavours',
      description:
        'A delicious variety of Italian favourites, balanced with rich garlic herb sauces, ripe tomatoes, and comforting melted cheeses.',
      accent: 'border-[#C89B3C]/30',
    },
    {
      icon: UtensilsCrossed,
      title: 'Freshly Prepared',
      description:
        'Food made fresh to order in our kitchen, ensuring your pasta ribbons remain tender and your pizzas hot and bubbly.',
      accent: 'border-[#C0392B]/30',
    },
    {
      icon: Bike,
      title: 'Delivery to Your Door',
      description:
        'Convenient online ordering for prompt doorstep delivery across Gurdaspur, safely packed to retain warmth and flavor.',
      accent: 'border-[#2D4030]/30',
    },
    {
      icon: Users,
      title: 'A Place to Gather',
      description:
        'Enjoy a memorable dine-in experience with friends, couples, and family in our ambient restaurant located right near the Bus Stand.',
      accent: 'border-[#C89B3C]/30',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F4EFEA] border-y border-[#E8E0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#2D4030]">
            The Viva La Vida Experience
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] mt-2 mb-4">
            Why Choose Viva La Vida?
          </h2>
          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
            We are dedicated to offering an inviting space, honest culinary care, and the warmth of Italian hospitality right here in Gurdaspur.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 sm:p-7 rounded-lg border border-[#E8E0D5] hover:border-[#2D4030]/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#FAF7F2] border border-[#E8E0D5] flex items-center justify-center text-[#2D4030] mb-5">
                    <IconComponent className="w-6 h-6 text-[#2D4030]" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#1C1917] mb-2.5">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F3EDE2] text-[11px] text-[#78716C] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Quality checked daily</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
