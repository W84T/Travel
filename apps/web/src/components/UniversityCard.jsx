
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, BookOpen, Trophy } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext.jsx';

export default function UniversityCard({ university }) {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const name = isRTL ? university.name.ar : university.name.en;
  const description = isRTL ? university.description.ar : university.description.en;

  return (
    <Card className="group overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/50">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={university.banner_image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end gap-3">
          <div className="w-12 h-12 rounded-lg bg-white p-1 shadow-md shrink-0">
            <img src={university.logo_image} alt={`${name} logo`} className="w-full h-full object-contain rounded-md" />
          </div>
          <Badge variant="secondary" className="bg-primary text-primary-foreground hover:bg-primary/90 border-none shadow-sm">
            <Trophy className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
            {isRTL ? `تصنيف: ${university.world_ranking}` : `Rank: ${university.world_ranking}`}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-2 line-clamp-2 text-foreground">{name}</h3>
        
        <div className="flex items-center text-muted-foreground text-sm mb-4">
          <MapPin className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0 shrink-0" />
          <span>{university.city}, {university.location}</span>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
          {description}
        </p>
        
        <div className="grid grid-cols-2 gap-2 text-sm pt-4 border-t border-border/50">
          <div className="flex items-center text-foreground/80">
            <Users className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-primary" />
            <span>{(university.total_students / 1000).toFixed(1)}k {isRTL ? 'طالب' : 'Students'}</span>
          </div>
          <div className="flex items-center text-foreground/80">
            <BookOpen className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-primary" />
            <span>{university.programs.length} {isRTL ? 'برامج' : 'Programs'}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0 mt-auto">
        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link to={`/universities/${university.id}`}>
            {isRTL ? 'تفاصيل الجامعة' : 'University Details'}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
