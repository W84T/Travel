
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Users, Calendar } from 'lucide-react';

export default function TravelPlanDetailsHero({ 
  image, titleAr, titleEn, days, nights, destinationsAr, destinationsEn, hotelStars, travelersCount, isRTL 
}) {
  const title = isRTL ? titleAr : titleEn;
  const destinations = isRTL ? destinationsAr?.join('، ') : destinationsEn?.join(', ');
  const durationText = isRTL ? `${days} أيام / ${nights} ليالٍ` : `${days} Days / ${nights} Nights`;
  const travelersText = isRTL ? `${travelersCount} أشخاص` : `${travelersCount} Persons`;

  return (
    <section className="relative h-[60vh] min-h-[500px] w-full flex items-end pb-16">
      <div className="absolute inset-0 z-0">
        <img 
          src={image || "https://images.unsplash.com/photo-1571702843755-18a48721a61e"} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 bg-primary/90 backdrop-blur-sm text-primary-foreground px-4 py-1.5 rounded-full text-sm font-bold mb-6 shadow-lg">
            <Calendar className="w-4 h-4" />
            <span>{durationText}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-balance">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span>{destinations}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary fill-primary" />
              <span>{hotelStars} {isRTL ? 'نجوم' : 'Stars'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span>{travelersText}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
