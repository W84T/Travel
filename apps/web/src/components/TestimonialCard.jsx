
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function TestimonialCard({ avatar, name, badgeType, rating, text, programName, isRTL }) {
  return (
    <Card className="h-full bg-card border-none shadow-md hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
      <div className="absolute top-6 right-6 rtl:left-6 rtl:right-auto text-primary/5">
        <Quote className="w-16 h-16 rotate-180 rtl:rotate-0" />
      </div>
      <CardContent className="p-8 flex flex-col h-full relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <img 
            src={avatar} 
            alt={name} 
            className="w-16 h-16 rounded-full object-cover border-2 border-primary/10"
          />
          <div>
            <h4 className="font-bold text-lg text-foreground">{name}</h4>
            <Badge variant="secondary" className="bg-secondary/10 text-secondary-foreground hover:bg-secondary/20 border-none mt-1">
              {badgeType}
            </Badge>
          </div>
        </div>
        
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              className={`w-4 h-4 ${i < rating ? 'fill-secondary text-secondary' : 'fill-muted text-muted-foreground'}`} 
            />
          ))}
        </div>
        
        <p className="text-foreground/80 leading-relaxed italic mb-6 flex-1 text-lg">
          "{text}"
        </p>
        
        <div className="mt-auto pt-4 border-t border-border/50">
          <p className="text-sm font-medium text-primary">
            {programName}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
