
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, BookOpen, Wallet, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext.jsx';

export default function LanguageCenterCard({ center }) {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const name = isRTL ? center.name.ar : center.name.en;
  const description = isRTL ? center.description.ar : center.description.en;

  return (
    <Card className="group overflow-hidden flex flex-col h-full bg-card border-none shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative h-48 sm:h-52 overflow-hidden bg-muted">
        <img 
          src={center.banner_image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm border-none shadow-sm">
            {center.type}
          </Badge>
          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-sm font-medium">
            <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
            <span>{center.rating}</span>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-end gap-3">
          <div className="w-14 h-14 rounded-xl bg-white p-1.5 shadow-lg shrink-0">
            <img src={center.logo_image} alt={`${name} logo`} className="w-full h-full object-contain rounded-lg" />
          </div>
          <div className="flex-1 pb-1">
            <div className="flex flex-wrap gap-1.5">
              {center.languages_offered.slice(0, 3).map((lang, idx) => (
                <span key={idx} className="text-xs bg-white/20 text-white backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                  {lang.name}
                </span>
              ))}
              {center.languages_offered.length > 3 && (
                <span className="text-xs bg-white/20 text-white backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                  +{center.languages_offered.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <CardContent className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-2 line-clamp-1 text-foreground" title={name}>{name}</h3>
        
        <div className="flex items-center text-muted-foreground text-sm mb-3">
          <MapPin className="w-4 h-4 mr-1.5 rtl:ml-1.5 rtl:mr-0 shrink-0 text-primary/70" />
          <span>{center.city}, {center.location}</span>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-5 flex-1">
          {description}
        </p>
        
        <div className="grid grid-cols-2 gap-3 text-sm pt-4 border-t border-border/60 mb-5">
          <div className="flex items-center text-foreground/80 font-medium">
            <BookOpen className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-primary/70" />
            <span>{center.courses.length} {isRTL ? 'دورات' : 'Courses'}</span>
          </div>
          <div className="flex items-center text-foreground/80 font-medium">
            <Wallet className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-primary/70" />
            <span>RM {center.startPrice}+</span>
          </div>
        </div>

        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mt-auto">
          <Link to={`/language-centers/${center.id}`}>
            {isRTL ? 'تفاصيل المركز' : 'Center Details'}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
