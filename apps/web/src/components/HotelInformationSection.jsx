
import React from 'react';
import { Star, MapPin, Wifi, Waves, Dumbbell, UtensilsCrossed, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function HotelInformationSection({ hotel, isRTL }) {
  if (!hotel) return null;

  const getAmenityIcon = (amenity) => {
    switch(amenity) {
      case 'wifi': return <Wifi className="w-5 h-5" />;
      case 'pool': return <Waves className="w-5 h-5" />;
      case 'gym': return <Dumbbell className="w-5 h-5" />;
      case 'restaurant': return <UtensilsCrossed className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  const getAmenityName = (amenity) => {
    const names = {
      wifi: isRTL ? 'واي فاي مجاني' : 'Free WiFi',
      pool: isRTL ? 'مسبح' : 'Swimming Pool',
      gym: isRTL ? 'صالة رياضية' : 'Fitness Center',
      restaurant: isRTL ? 'مطعم' : 'Restaurant'
    };
    return names[amenity] || amenity;
  };

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-foreground">
        {isRTL ? 'معلومات الإقامة' : 'Accommodation Info'}
      </h2>
      
      <Card className="overflow-hidden border-none shadow-lg bg-card">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div className="h-64 lg:h-auto relative">
            <img 
              src={hotel.images?.[0] || "https://images.unsplash.com/photo-1660562229022-ddf20f275066"} 
              alt={isRTL ? hotel.nameAr : hotel.nameEn} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <CardContent className="p-8 lg:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: hotel.rating || 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              {isRTL ? hotel.nameAr : hotel.nameEn}
            </h3>
            
            <div className="flex items-start gap-2 text-muted-foreground mb-6">
              <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{isRTL ? hotel.addressAr : hotel.addressEn}</span>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-8">
              {isRTL ? hotel.descriptionAr : hotel.descriptionEn}
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <div className="text-sm text-muted-foreground mb-1">{isRTL ? 'نوع الغرفة' : 'Room Type'}</div>
                <div className="font-medium text-foreground">{isRTL ? hotel.roomTypeAr : hotel.roomTypeEn}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">{isRTL ? 'تسجيل الدخول / الخروج' : 'Check-in / Check-out'}</div>
                <div className="flex items-center gap-2 font-medium text-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{hotel.checkIn} - {hotel.checkOut}</span>
                </div>
              </div>
            </div>
            
            <div className="pt-6 border-t border-border">
              <div className="text-sm font-bold mb-4 text-foreground">{isRTL ? 'المرافق' : 'Amenities'}</div>
              <div className="flex flex-wrap gap-4">
                {hotel.amenities?.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-lg text-sm font-medium text-foreground">
                    <span className="text-primary">{getAmenityIcon(amenity)}</span>
                    <span>{getAmenityName(amenity)}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </section>
  );
}
