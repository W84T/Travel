
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function FeaturedCard({ 
  image, 
  title, 
  description, 
  badge, 
  meta = [], 
  link, 
  linkText,
  isRTL 
}) {
  return (
    <Card className="group overflow-hidden flex flex-col h-full bg-card border-none shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative h-56 overflow-hidden bg-muted">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {badge && (
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <Badge className="bg-secondary text-secondary-foreground backdrop-blur-sm border-none shadow-sm font-bold px-3 py-1">
              {badge}
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-3 line-clamp-2 text-foreground" title={title}>{title}</h3>
        
        {meta.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-4">
            {meta.map((item, idx) => (
              <div key={idx} className="flex items-center text-sm font-medium text-primary bg-primary/5 px-3 py-1 rounded-full">
                {item.icon && <item.icon className="w-4 h-4 mr-1.5 rtl:ml-1.5 rtl:mr-0" />}
                {item.text}
              </div>
            ))}
          </div>
        )}
        
        <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
          {description}
        </p>
        
        <Button asChild variant="ghost" className="w-full justify-between mt-auto hover:bg-primary/5 hover:text-primary group/btn">
          <Link to={link}>
            <span className="font-semibold">{linkText}</span>
            {isRTL ? (
              <ArrowLeft className="w-4 h-4 transition-transform group-hover/btn:-translate-x-1" />
            ) : (
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            )}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
