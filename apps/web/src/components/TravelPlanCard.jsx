
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Star, MapPin, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TravelPlanCard({ plan }) {
  if (!plan) {
    return (
      <div className="rounded-2xl aspect-[4/5] bg-muted flex flex-col items-center justify-center text-muted-foreground p-6 text-center border border-border">
        <AlertCircle className="w-10 h-10 mb-4 opacity-50" />
        <p>بيانات البرنامج غير متوفرة</p>
      </div>
    );
  }

  try {
    // Safe access with fallbacks
    const id = plan?.id ?? '';
    const title = plan?.titleAr ?? plan?.title ?? plan?.titleEn ?? 'برنامج سياحي';
    const image = plan?.image ?? 'https://images.unsplash.com/photo-1571702843755-18a48721a61e';
    const days = plan?.days ?? 0;
    const nights = plan?.nights ?? 0;
    const travelersCount = plan?.travelers_count ?? 2;
    const hotelStars = plan?.hotel_stars ?? 3;
    const totalPrice = plan?.total_price ?? 0;
    const perPersonPrice = plan?.per_person_price ?? 0;
    const currency = plan?.currency ?? 'USD';
    
    // Safely handle destinations array
    const destinationsArray = plan?.destinationsAr ?? plan?.destinations ?? [];
    const destinationsText = Array.isArray(destinationsArray) && destinationsArray.length > 0 
      ? destinationsArray.join('، ') 
      : 'وجهات متعددة';

    // Generate stars array safely
    const renderStars = (count) => {
      const safeCount = Math.min(Math.max(0, Number(count) || 0), 5);
      return Array.from({ length: 5 }).map((_, i) => (
        <Star 
          key={i} 
          className={`w-4 h-4 ${i < safeCount ? 'fill-primary text-primary' : 'fill-muted text-muted-foreground'}`} 
        />
      ));
    };

    return (
      <div className="group relative overflow-hidden rounded-2xl aspect-[4/5] shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 bg-card">
        {/* Background Image */}
        <img 
          src={image} 
          alt={title} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1571702843755-18a48721a61e';
          }}
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 transition-opacity duration-500 group-hover:opacity-90" />

        {/* Duration Badge */}
        <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-primary-foreground px-4 py-1.5 rounded-full text-sm font-bold shadow-md">
          {days} أيام / {nights} ليالٍ
        </div>

        {/* Card Content (Bottom) */}
        <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end text-white">
          
          {/* Destinations */}
          <div className="flex items-center gap-1.5 text-white/80 text-sm mb-2">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="truncate">{destinationsText}</span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold mb-4 leading-tight text-balance line-clamp-2">
            {title}
          </h3>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6 text-sm text-white/90">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary shrink-0" />
              <span className="truncate">عدد المسافرين: {travelersCount}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-white/90 ml-1 shrink-0">الفندق:</span>
              <div className="flex rtl:flex-row-reverse">{renderStars(hotelStars)}</div>
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="flex items-end justify-between mt-auto pt-4 border-t border-white/20">
            <div>
              <div className="text-white/70 text-xs mb-1">السعر الإجمالي</div>
              <div className="text-2xl font-bold text-primary flex items-center gap-2">
                <span className="text-lg">{currency === 'USD' ? '🇺🇸' : currency}</span>
                ${totalPrice}
              </div>
              <div className="text-white/60 text-xs mt-1">
                ≈ ${perPersonPrice} للشخص
              </div>
            </div>
            
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 font-bold shadow-lg transition-all duration-300 hover:scale-105">
              <Link to={`/travel-plans/${id}`}>
                تفاصيل البرنامج
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error rendering TravelPlanCard:", error);
    return (
      <div className="rounded-2xl aspect-[4/5] bg-muted flex flex-col items-center justify-center text-muted-foreground p-6 text-center border border-border">
        <AlertCircle className="w-10 h-10 mb-4 text-destructive" />
        <p>حدث خطأ أثناء عرض البرنامج</p>
      </div>
    );
  }
}
