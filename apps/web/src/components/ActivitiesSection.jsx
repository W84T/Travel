
import React from 'react';
import { Clock, Info, Building, Ship, Map } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function ActivitiesSection({ activities, isRTL }) {
  if (!activities || activities.length === 0) return null;

  const getIcon = (iconName) => {
    switch(iconName) {
      case 'building': return <Building className="w-6 h-6" />;
      case 'ship': return <Ship className="w-6 h-6" />;
      default: return <Map className="w-6 h-6" />;
    }
  };

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-foreground">
        {isRTL ? 'الأنشطة والتجارب' : 'Activities & Experiences'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activities.map((activity, idx) => (
          <Card key={idx} className="group hover:shadow-md transition-all duration-300 border-border/50 bg-card">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {getIcon(activity.icon)}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-foreground">
                    {isRTL ? activity.nameAr : activity.nameEn}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {isRTL ? activity.descriptionAr : activity.descriptionEn}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5 text-foreground font-medium bg-muted/50 px-3 py-1.5 rounded-md">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{activity.duration}</span>
                    </div>
                    {activity.whatToBringAr && (
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Info className="w-4 h-4" />
                        <span>{isRTL ? activity.whatToBringAr : activity.whatToBringEn}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
