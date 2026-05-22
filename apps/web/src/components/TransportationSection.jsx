
import React from 'react';
import { Plane, Car, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function TransportationSection({ transportation, isRTL }) {
  if (!transportation) return null;

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-foreground">
        {isRTL ? 'المواصلات والطيران' : 'Transportation & Flights'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Flights */}
        {transportation.flights?.map((flight, idx) => (
          <Card key={idx} className="bg-card shadow-sm border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Plane className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">{isRTL ? 'الطيران الداخلي' : 'Domestic Flight'}</h3>
                  <p className="text-sm text-muted-foreground">{isRTL ? flight.airlineAr : flight.airlineEn} - {flight.flightNumber}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between relative">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-12">
                  <div className="h-px bg-border border-dashed w-full relative">
                    <Plane className="w-4 h-4 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground bg-card px-1" />
                  </div>
                </div>
                
                <div className="text-center relative z-10 bg-card pr-4">
                  <div className="text-2xl font-bold text-foreground">{flight.departure}</div>
                  <div className="text-sm text-muted-foreground mt-1">{isRTL ? flight.routeAr.split(' إلى ')[0] : flight.routeEn.split(' to ')[0]}</div>
                </div>
                
                <div className="text-center relative z-10 bg-card pl-4">
                  <div className="text-2xl font-bold text-foreground">{flight.arrival}</div>
                  <div className="text-sm text-muted-foreground mt-1">{isRTL ? flight.routeAr.split(' إلى ')[1] : flight.routeEn.split(' to ')[1]}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Transfers */}
        <Card className="bg-card shadow-sm border-border/50">
          <CardContent className="p-6 h-full flex flex-col justify-center space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1">{isRTL ? 'استقبال وتوديع المطار' : 'Airport Transfers'}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {isRTL ? transportation.transfersAr : transportation.transfersEn}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1">{isRTL ? 'التنقلات الداخلية' : 'In-Destination Transport'}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {isRTL ? transportation.inDestinationAr : transportation.inDestinationEn}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
