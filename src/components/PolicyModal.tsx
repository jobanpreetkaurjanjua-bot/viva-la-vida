import React from 'react';
import { X, Shield, FileText, Truck, RotateCcw } from 'lucide-react';

export type PolicyType = 'privacy' | 'terms' | 'delivery' | 'refund';

interface PolicyModalProps {
  policy: PolicyType | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ policy, onClose }) => {
  if (!policy) return null;

  const content = {
    privacy: {
      title: 'Privacy Policy',
      icon: Shield,
      subtitle: 'Viva La Vida — Gurdaspur, Punjab',
      updated: 'October 2026',
      sections: [
        {
          heading: '1. Information We Collect',
          body: 'We collect your name, phone number, and delivery address solely for preparing and delivering your food orders or holding table reservations in Gurdaspur. We do not sell or trade your personal information with third parties.',
        },
        {
          heading: '2. Payment Security',
          body: 'Viva La Vida never collects or stores raw credit or debit card details on our servers. Online UPI and digital payments are handled securely through standard payment apps (Google Pay, PhonePe, Paytm).',
        },
        {
          heading: '3. Communications',
          body: 'We use your phone number or WhatsApp only to confirm your orders, update delivery status, or send reservation confirmations. You may opt out of promotional messages at any time.',
        },
      ],
    },
    terms: {
      title: 'Terms & Conditions',
      icon: FileText,
      subtitle: 'Viva La Vida Dining & Services',
      updated: 'October 2026',
      sections: [
        {
          heading: '1. Menu & Pricing',
          body: 'All prices are listed in Indian Rupees (₹) and are subject to applicable GST taxes (5%). While we make every effort to display real-time availability, certain seasonal ingredients or dishes may occasionally sell out.',
        },
        {
          heading: '2. Table Reservations',
          body: 'Table reservations are held for up to 15 minutes past the scheduled booking time before being released to walk-in diners during peak service hours. Please notify us via call or WhatsApp if you are running late.',
        },
        {
          heading: '3. Food Allergens',
          body: 'Our kitchen processes nuts, dairy, and wheat. While we take great care to honor dietary notes, customers with severe allergies must communicate their requirements to our staff prior to ordering.',
        },
      ],
    },
    delivery: {
      title: 'Delivery Policy',
      icon: Truck,
      subtitle: 'Doorstep Food Delivery in Gurdaspur',
      updated: 'October 2026',
      sections: [
        {
          heading: '1. Delivery Coverage Area',
          body: 'We deliver across Gurdaspur city, including the Bus Stand area, Civil Lines, Jail Road, Tibri Road, Dinanagar Bypass, and surrounding neighborhoods within our delivery radius.',
        },
        {
          heading: '2. Estimated Delivery Times',
          body: 'Normal delivery time is approximately 30 to 45 minutes depending on traffic and order complexity. During rush hours or severe weather, delivery times may be slightly extended.',
        },
        {
          heading: '3. Delivery Charges',
          body: 'Orders above ₹500 qualify for Free Delivery. Standard orders carry a nominal ₹40 delivery fee. Takeaway / self-pickup orders incur zero delivery charges.',
        },
      ],
    },
    refund: {
      title: 'Cancellation & Refund Policy',
      icon: RotateCcw,
      subtitle: 'Customer Satisfaction Guarantee',
      updated: 'October 2026',
      sections: [
        {
          heading: '1. Order Cancellations',
          body: 'Orders may be cancelled within 5 minutes of placement before our kitchen commences preparation. Once cooking has begun, orders cannot be cancelled.',
        },
        {
          heading: '2. Table Reservation Cancellations',
          body: 'There are no charges for cancelling table reservations. We kindly request that you cancel at least 1 hour in advance so other guests may enjoy the table.',
        },
        {
          heading: '3. Damaged or Incorrect Food Items',
          body: 'If your order arrives damaged, missing items, or incorrect, please reach out to us within 30 minutes via WhatsApp or telephone with a photo for an immediate replacement or full refund.',
        },
      ],
    },
  }[policy];

  const IconComponent = content.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF7F2] rounded-xl max-w-2xl w-full p-6 sm:p-8 border border-[#E8E0D5] shadow-2xl relative max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#57534E] hover:text-[#1C1917] rounded-full hover:bg-[#EAE2D5] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[#2D4030] text-[#FAF7F2] flex items-center justify-center">
            <IconComponent className="w-5 h-5 text-[#C89B3C]" />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#1C1917]">{content.title}</h3>
            <p className="text-xs text-[#78716C]">{content.subtitle} · Last updated {content.updated}</p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-[#57534E] leading-relaxed">
          {content.sections.map((sec, i) => (
            <div key={i} className="p-4 bg-white rounded-lg border border-[#E8E0D5]">
              <h4 className="font-serif font-bold text-[#1C1917] text-base mb-1.5">{sec.heading}</h4>
              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">{sec.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-[#E8E0D5] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-[#2D4030] text-white rounded hover:bg-[#202E23] transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
