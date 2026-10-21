import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Star, MessageSquarePlus, CheckCircle2, X } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { reviews, addReview } = useRestaurant();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [author, setAuthor] = useState('');
  const [city, setCity] = useState('Gurdaspur');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    addReview({
      author: author.trim(),
      city: city.trim() || 'Gurdaspur',
      rating,
      comment: comment.trim(),
      isVerifiedGuest: true,
    });

    setSubmitted(true);
    setTimeout(() => {
      setShowReviewModal(false);
      setSubmitted(false);
      setAuthor('');
      setComment('');
    }, 1500);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C0392B]">
              Guest Experiences
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] mt-1 mb-2">
              Your Experience Matters to Us
            </h2>
            <p className="text-sm text-[#57534E] leading-relaxed">
              We value honest feedback from our guests in Gurdaspur. Every bowl of pasta, slice of pizza, and dining table reservation is prepared with pride.
            </p>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#2D4030] text-white rounded-md hover:bg-[#202E23] transition-colors shrink-0 shadow-sm self-start md:self-auto"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#C89B3C]" />
            <span>Share Your Review</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 sm:p-7 rounded-lg border border-[#E8E0D5] flex flex-col justify-between shadow-xs hover:border-[#2D4030]/30 transition-colors"
            >
              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.rating
                          ? 'text-[#C89B3C] fill-[#C89B3C]'
                          : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-[#1C1917] italic leading-relaxed mb-6">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Verification */}
              <div className="pt-4 border-t border-[#F3EDE2] flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#1C1917]">
                    {rev.author}
                  </h4>
                  <p className="text-[11px] text-[#78716C]">{rev.city}</p>
                </div>

                {rev.isVerifiedGuest && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Verified Guest
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Write a Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FAF7F2] rounded-xl max-w-lg w-full p-6 sm:p-8 border border-[#E8E0D5] shadow-2xl relative">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-4 right-4 p-2 text-[#57534E] hover:text-[#1C1917] rounded-full hover:bg-[#EAE2D5] transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h3 className="font-serif text-2xl font-bold text-[#1C1917]">Grazie Mille!</h3>
                <p className="text-sm text-[#57534E] mt-1">
                  Thank you for your feedback. Your review has been added.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="text-center mb-6">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#C0392B]">
                    Viva La Vida Dining Experience
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#1C1917] mt-1">
                    Share Your Review
                  </h3>
                  <p className="text-xs text-[#78716C] mt-1">
                    How was your pasta, pizza, or dine-in visit?
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. Gurpreet Singh"
                      className="w-full px-3.5 py-2.5 rounded-md border border-[#D5CBBF] bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#2D4030]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-1">
                      Locality / City
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Near Bus Stand, Gurdaspur"
                      className="w-full px-3.5 py-2.5 rounded-md border border-[#D5CBBF] bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#2D4030]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-1">
                      Your Rating
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          className="p-1 focus:outline-none"
                        >
                          <Star
                            className={`w-7 h-7 transition-colors ${
                              star <= rating
                                ? 'text-[#C89B3C] fill-[#C89B3C]'
                                : 'text-stone-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs text-[#57534E] ml-2">
                        {rating === 5 ? 'Exceptional' : rating === 4 ? 'Very Good' : 'Good'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-1">
                      Your Review *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Tell us about the flavours, service, or atmosphere..."
                      className="w-full px-3.5 py-2.5 rounded-md border border-[#D5CBBF] bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#2D4030]"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-[#57534E] hover:text-[#1C1917]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-[#2D4030] text-white rounded hover:bg-[#202E23] transition-colors"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
