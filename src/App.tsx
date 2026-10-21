import React from 'react';
import { RestaurantProvider, useRestaurant } from './context/RestaurantContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Specialties } from './components/Specialties';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AboutSection } from './components/AboutSection';
import { BestsellersCarousel } from './components/BestsellersCarousel';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { MenuPage } from './components/MenuPage';
import { ReservationPage } from './components/ReservationPage';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { AdminDashboard } from './components/AdminDashboard';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CustomizerModal } from './components/CustomizerModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ShoppingBag, Sparkles, CheckCircle2, AlertCircle, Info } from 'lucide-react';

const MainContent: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    cartCount,
    cartTotal,
    setIsCartOpen,
    toast,
  } = useRestaurant();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1C1917] selection:bg-[#C0392B]/20 selection:text-[#C0392B]">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 animate-bounce">
          <div
            className={`px-4 py-2.5 rounded-lg shadow-xl border text-xs font-semibold flex items-center gap-2 backdrop-blur-md ${
              toast.type === 'error'
                ? 'bg-rose-900/90 text-white border-rose-700'
                : toast.type === 'info'
                ? 'bg-[#1C1917]/90 text-white border-white/20'
                : 'bg-[#2D4030]/95 text-white border-[#C89B3C]/50'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-300" />
            ) : toast.type === 'info' ? (
              <Info className="w-4 h-4 text-[#C89B3C]" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar />

      {/* Dynamic View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <Hero />

            {/* Today's Specials Banner Ticker */}
            <div className="bg-[#2D4030] text-[#FAF7F2] py-2.5 px-4 border-y border-[#C89B3C]/30 text-xs">
              <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#C89B3C]" />
                  <span>
                    <strong>Chef’s Special Today:</strong> Baked Italian Lasagna, Truffled Mushroom Cream Pasta & Venetian Tiramisu
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-3 text-white/80 text-[11px]">
                  <span>Free delivery on orders ₹500+</span>
                  <span>·</span>
                  <button
                    onClick={() => {
                      setActiveTab('menu');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-[#C89B3C] font-bold hover:underline"
                  >
                    Order Now →
                  </button>
                </div>
              </div>
            </div>

            <Specialties />
            <WhyChooseUs />
            <BestsellersCarousel />
            <AboutSection />
            <GallerySection />
            <ReviewsSection />
            <LocationSection />
          </>
        )}

        {activeTab === 'menu' && <MenuPage />}

        {activeTab === 'book' && <ReservationPage />}

        {activeTab === 'gallery' && (
          <div className="py-8">
            <GallerySection />
          </div>
        )}

        {activeTab === 'track' && <OrderTrackerModal />}

        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Mobile Sticky Order Bar if cart has items */}
      {cartCount > 0 && (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-white/95 backdrop-blur-md border-t border-[#E8E0D5] shadow-lg flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#2D4030] text-white flex items-center justify-center font-bold text-xs">
              {cartCount}
            </div>
            <div>
              <span className="text-xs font-bold text-[#1C1917] block">
                Total: ₹{cartTotal}
              </span>
              <span className="text-[10px] text-[#78716C]">Plus applicable tax</span>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="px-5 py-2.5 bg-[#C0392B] hover:bg-[#A93226] text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-sm transition-transform active:scale-95 flex items-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>View Cart</span>
          </button>
        </div>
      )}

      {/* Modals & Overlays */}
      <CartDrawer />
      <CheckoutModal />
      <CustomizerModal />
      <WhatsAppButton />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <RestaurantProvider>
      <MainContent />
    </RestaurantProvider>
  );
}
