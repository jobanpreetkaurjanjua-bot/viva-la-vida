import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { SeatingPreference, DiningOccasion, Reservation } from '../types/restaurant';
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  MapPin,
  CheckCircle2,
  Printer,
  Search,
  Sparkles,
  Phone,
  ShieldCheck,
  X,
} from 'lucide-react';

export const ReservationPage: React.FC = () => {
  const { bookTable, getReservationByNumber, settings, setActiveTab } = useRestaurant();

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(() => {
    // Default to today in YYYY-MM-DD
    return new Date().toISOString().split('T')[0];
  });
  const [time, setTime] = useState('07:30 PM');
  const [guests, setGuests] = useState(2);
  const [seatingPreference, setSeatingPreference] = useState<SeatingPreference>('Main Dining Hall');
  const [occasion, setOccasion] = useState<DiningOccasion>('Casual Dining');
  const [specialRequests, setSpecialRequests] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  // Lookup state
  const [lookupNumber, setLookupNumber] = useState('');
  const [lookupResult, setLookupResult] = useState<Reservation | null>(null);
  const [lookupError, setLookupError] = useState('');

  const timeSlots = [
    '12:00 PM',
    '12:45 PM',
    '01:30 PM',
    '02:15 PM',
    '06:30 PM',
    '07:15 PM',
    '08:00 PM',
    '08:45 PM',
    '09:30 PM',
  ];

  const seatingOptions: { id: SeatingPreference; label: string; desc: string }[] = [
    {
      id: 'Main Dining Hall',
      label: 'Main Dining Hall',
      desc: 'Ambient lighting with authentic Italian music and warm wooden tables.',
    },
    {
      id: 'Romantic Veranda',
      label: 'Romantic Veranda',
      desc: 'Intimate terrace seating, perfect for couples and date nights.',
    },
    {
      id: 'Family Booth',
      label: 'Family Booth',
      desc: 'Spacious semi-private booth designed for large groups and children.',
    },
    {
      id: 'Window Garden View',
      label: 'Window Garden View',
      desc: 'Breezy window seats overlooking evening street lights.',
    },
  ];

  const occasionOptions: DiningOccasion[] = [
    'Casual Dining',
    'Birthday Celebration',
    'Anniversary',
    'Romantic Date',
    'Family Gathering',
    'Business Meeting',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      alert('Please enter a valid 10-digit mobile number for reservation confirmation.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await bookTable({
        name: name.trim(),
        phone: cleanPhone,
        email: email.trim() || undefined,
        date,
        time,
        guests,
        seatingPreference,
        occasion,
        specialRequests: specialRequests.trim() || undefined,
      });

      setConfirmedReservation(res.reservation);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError('');
    setLookupResult(null);
    if (!lookupNumber.trim()) return;

    const found = getReservationByNumber(lookupNumber.trim());
    if (found) {
      setLookupResult(found);
    } else {
      setLookupError(`No reservation found for #${lookupNumber.trim()}. Please verify the reference.`);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-12 sm:py-20 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C0392B]">
            Table Reservations
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1917] mt-1 mb-3">
            Reserve Your Table at Viva La Vida
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
            Join us for an unforgettable Italian meal near Bus Stand, Gurdaspur. We prepare our tables with warm care for your family and friends.
          </p>
        </div>

        {/* Existing Booking Lookup Modal / Card */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#E8E0D5] shadow-2xs mb-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">
                Already Have a Reservation?
              </h4>
              <p className="text-[11px] text-[#78716C]">
                Check confirmation status or request changes anytime
              </p>
            </div>

            <form onSubmit={handleLookup} className="flex gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={lookupNumber}
                onChange={(e) => setLookupNumber(e.target.value.toUpperCase())}
                placeholder="Enter RSV-12345"
                className="px-3 py-1.5 text-xs rounded border border-[#D5CBBF] bg-[#FAF7F2] uppercase focus:outline-none focus:ring-1 focus:ring-[#2D4030] w-full sm:w-44"
              />
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-[#2D4030] text-white rounded hover:bg-[#202E23] transition-colors shrink-0"
              >
                Lookup
              </button>
            </form>
          </div>

          {lookupError && (
            <p className="text-xs text-rose-600 mt-2">{lookupError}</p>
          )}

          {lookupResult && (
            <div className="mt-4 p-4 bg-[#FAF7F2] rounded-lg border border-[#E8E0D5] flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#1C1917]">
                  Booking #{lookupResult.reservationNumber} ({lookupResult.name})
                </span>
                <p className="text-xs text-[#57534E] mt-0.5">
                  {lookupResult.date} at {lookupResult.time} · {lookupResult.guests} Guests · {lookupResult.seatingPreference}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    lookupResult.status === 'Confirmed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : lookupResult.status === 'Cancelled'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {lookupResult.status}
                </span>
                <button
                  onClick={() => setLookupResult(null)}
                  className="p-1 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* If Just Confirmed / Reserved Display Confirmation Card */}
        {confirmedReservation ? (
          <div
            id="printable-voucher"
            className="bg-white rounded-xl border border-[#E8E0D5] shadow-xl overflow-hidden mb-12 animate-fade-in"
          >
            <div className="bg-[#2D4030] p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-14 h-14 rounded-full bg-[#FAF7F2] text-[#2D4030] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold tracking-widest text-[#C89B3C]">
                    Table Reservation Placed
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                    Reservation #{confirmedReservation.reservationNumber}
                  </h2>
                  <p className="text-xs text-white/80 mt-1">
                    Viva La Vida · Near Bus Stand, Gurdaspur, Punjab
                  </p>
                </div>
              </div>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print Booking Pass</span>
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {/* Notice regarding confirmation */}
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 text-xs sm:text-sm">
                <strong>Status: {confirmedReservation.status}</strong>
                <p className="mt-1 text-xs text-amber-800">
                  Your reservation request has been received by Viva La Vida staff. To maintain table capacity without overlap, our team will review the slot and send a confirmation call/WhatsApp to <strong>{confirmedReservation.phone}</strong>.
                </p>
              </div>

              {/* Booking Pass Details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-[#FAF7F2] rounded-lg border border-[#E8E0D5] text-xs">
                <div>
                  <span className="text-[#78716C] uppercase text-[10px] font-bold">Guest Name</span>
                  <p className="font-bold text-[#1C1917] mt-0.5">{confirmedReservation.name}</p>
                </div>
                <div>
                  <span className="text-[#78716C] uppercase text-[10px] font-bold">Date & Time</span>
                  <p className="font-bold text-[#1C1917] mt-0.5">
                    {confirmedReservation.date} @ {confirmedReservation.time}
                  </p>
                </div>
                <div>
                  <span className="text-[#78716C] uppercase text-[10px] font-bold">Party Size</span>
                  <p className="font-bold text-[#1C1917] mt-0.5">{confirmedReservation.guests} Guests</p>
                </div>
                <div>
                  <span className="text-[#78716C] uppercase text-[10px] font-bold">Seating Area</span>
                  <p className="font-bold text-[#1C1917] mt-0.5">{confirmedReservation.seatingPreference}</p>
                </div>
              </div>

              {confirmedReservation.specialRequests && (
                <div className="text-xs text-[#57534E]">
                  <strong>Special Requests:</strong> "{confirmedReservation.specialRequests}"
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#E8E0D5]">
                <button
                  onClick={() => setConfirmedReservation(null)}
                  className="text-xs font-bold text-[#2D4030] hover:underline"
                >
                  ← Book Another Table
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setActiveTab('menu');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#2D4030] text-white rounded hover:bg-[#202E23] transition-colors"
                  >
                    View Menu & Pre-Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Main Reservation Form */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Column */}
            <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-xl border border-[#E8E0D5] shadow-xs">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. Date, Time & Guests */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-4 flex items-center gap-1.5">
                    <CalendarIcon className="w-4 h-4 text-[#C0392B]" />
                    <span>1. Date, Time & Party Size</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Date Picker */}
                    <div>
                      <label className="block text-xs font-semibold text-[#57534E] mb-1">
                        Reservation Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-md border border-[#D5CBBF] bg-[#FAF7F2] font-semibold text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#2D4030]"
                      />
                    </div>

                    {/* Time Slot */}
                    <div>
                      <label className="block text-xs font-semibold text-[#57534E] mb-1">
                        Preferred Time *
                      </label>
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-md border border-[#D5CBBF] bg-[#FAF7F2] font-semibold text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#2D4030]"
                      >
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Number of Guests */}
                    <div>
                      <label className="block text-xs font-semibold text-[#57534E] mb-1">
                        Number of Guests *
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs rounded-md border border-[#D5CBBF] bg-[#FAF7F2] font-semibold text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#2D4030]"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15].map((count) => (
                          <option key={count} value={count}>
                            {count} {count === 1 ? 'Guest (Solo)' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* 2. Seating Preference */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-3">
                    2. Seating Preference
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {seatingOptions.map((opt) => {
                      const isSelected = seatingPreference === opt.id;
                      return (
                        <div
                          key={opt.id}
                          onClick={() => setSeatingPreference(opt.id)}
                          className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                            isSelected
                              ? 'border-[#2D4030] bg-[#2D4030]/5 text-[#1C1917]'
                              : 'border-[#E8E0D5] bg-white text-[#57534E] hover:bg-[#F3EDE2]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold">{opt.label}</span>
                            <input
                              type="radio"
                              name="seating"
                              checked={isSelected}
                              onChange={() => setSeatingPreference(opt.id)}
                              className="accent-[#2D4030]"
                            />
                          </div>
                          <p className="text-[11px] text-[#78716C] leading-snug">{opt.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Occasion & Special Requests */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-3">
                    3. Occasion & Special Requests
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#57534E] mb-1">
                        Occasion (Optional)
                      </label>
                      <select
                        value={occasion}
                        onChange={(e) => setOccasion(e.target.value as any)}
                        className="w-full px-3 py-2 text-xs rounded-md border border-[#D5CBBF] bg-[#FAF7F2] font-semibold text-[#1C1917]"
                      >
                        {occasionOptions.map((occ) => (
                          <option key={occ} value={occ}>
                            {occ}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#57534E] mb-1">
                        Special Requests / Notes (Optional)
                      </label>
                      <input
                        type="text"
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="e.g. Quiet corner, high chair for baby, anniversary cake..."
                        className="w-full px-3 py-2 text-xs rounded-md border border-[#D5CBBF] bg-white text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#2D4030]"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Guest Contact Info */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-3">
                    4. Your Contact Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#57534E] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Simranjit Kaur"
                        className="w-full px-3 py-2 text-xs rounded-md border border-[#D5CBBF] bg-white text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#2D4030]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#57534E] mb-1">
                        Mobile Number (10 digits) *
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 9876543210"
                        className="w-full px-3 py-2 text-xs rounded-md border border-[#D5CBBF] bg-white text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#2D4030]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#57534E] mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. name@example.com"
                        className="w-full px-3 py-2 text-xs rounded-md border border-[#D5CBBF] bg-white text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#2D4030]"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-4 border-t border-[#E8E0D5] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-[11px] text-[#78716C] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>No advance booking fees · Free cancellation anytime</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full sm:w-auto px-8 py-3 text-xs font-bold uppercase tracking-wider rounded-md text-white transition-all shadow-md ${
                      isSubmitting
                        ? 'bg-stone-400 cursor-wait'
                        : 'bg-[#C0392B] hover:bg-[#A93226] active:scale-95'
                    }`}
                  >
                    {isSubmitting ? 'Reserving...' : 'Reserve My Table'}
                  </button>
                </div>
              </form>
            </div>

            {/* Sidebar Column: Dining Info & Ambience */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 rounded-xl border border-[#E8E0D5] shadow-xs">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#2D4030]">
                  Dining At Viva La Vida
                </span>
                <h3 className="font-serif text-lg font-bold text-[#1C1917] mt-1 mb-3">
                  Atmospheric Italian Dining
                </h3>
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                  alt="Restaurant interior tables"
                  className="w-full h-40 object-cover rounded-md mb-4 bg-[#EAE2D5]"
                />
                <ul className="space-y-2 text-xs text-[#57534E]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#C89B3C] font-bold">✓</span>
                    <span>Reserved tables held for 15 minutes past scheduled time.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C89B3C] font-bold">✓</span>
                    <span>Special birthday and anniversary dessert candle upon request.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C89B3C] font-bold">✓</span>
                    <span>Air-conditioned family dining room and romantic corner booths.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#E8E0D5] text-xs space-y-2">
                <h4 className="font-bold text-[#1C1917] uppercase tracking-wider">
                  Need Immediate Table Assistance?
                </h4>
                <p className="text-[#57534E]">
                  For groups larger than 15 guests or urgent same-hour reservations, call our host desk:
                </p>
                <a
                  href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                  className="font-bold text-[#2D4030] hover:underline block text-sm pt-1"
                >
                  📞 {settings.phone}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
