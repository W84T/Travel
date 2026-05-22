
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, UtensilsCrossed, Coffee, Moon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function ItinerarySection({ itinerary, isRTL }) {
  if (!itinerary || itinerary.length === 0) return null;

  const getMealIcon = (meal) => {
    switch(meal) {
      case 'breakfast': return <Coffee className="w-4 h-4" />;
      case 'lunch': return <UtensilsCrossed className="w-4 h-4" />;
      case 'dinner': return <Moon className="w-4 h-4" />;
      default: return <UtensilsCrossed className="w-4 h-4" />;
    }
  };

  const getMealName = (meal) => {
    const names = {
      breakfast: isRTL ? 'إفطار' : 'Breakfast',
      lunch: isRTL ? 'غداء' : 'Lunch',
      dinner: isRTL ? 'عشاء' : 'Dinner'
    };
    return names[meal] || meal;
  };

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-foreground">
        {isRTL ? 'خطة الرحلة' : 'Itinerary'}
      </h2>
      
      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
        {itinerary.map((day, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-primary-foreground font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              {day.day}
            </div>
            
            <Card className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] shadow-sm hover:shadow-md transition-shadow border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-primary font-medium mb-2">
                  <Clock className="w-4 h-4" />
                  <span>{day.time}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {isRTL ? day.titleAr : day.titleEn}
                </h3>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {isRTL ? day.descriptionAr : day.descriptionEn}
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4 border-t border-border/50">
                  {day.locationAr && (
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{isRTL ? day.locationAr : day.locationEn}</span>
                    </div>
                  )}
                  
                  {day.meals && day.meals.length > 0 && (
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      {day.meals.map((meal, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 bg-muted px-2 py-1 rounded-md">
                          {getMealIcon(meal)}
                          <span>{getMealName(meal)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
