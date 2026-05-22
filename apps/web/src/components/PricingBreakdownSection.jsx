
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function PricingBreakdownSection({ pricing, isRTL }) {
  if (!pricing) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat(isRTL ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: pricing.currency || 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-foreground">
        {isRTL ? 'تفاصيل الأسعار' : 'Pricing Breakdown'}
      </h2>
      
      <Card className="bg-secondary text-secondary-foreground overflow-hidden border-none shadow-lg">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Total Price Highlight */}
            <div className="p-8 lg:p-10 bg-secondary-foreground/5 flex flex-col justify-center items-center text-center border-b lg:border-b-0 lg:border-l border-secondary-foreground/10">
              <div className="text-secondary-foreground/80 font-medium mb-2">
                {isRTL ? 'السعر الإجمالي للبرنامج' : 'Total Package Price'}
              </div>
              <div className="text-5xl font-bold text-primary mb-4">
                {formatCurrency(pricing.totalPrice)}
              </div>
              <div className="text-secondary-foreground/90 bg-secondary-foreground/10 px-4 py-2 rounded-full text-sm">
                {isRTL ? pricing.occupancyAr : pricing.occupancyEn}
              </div>
              <div className="mt-4 text-sm text-secondary-foreground/70">
                {isRTL ? 'السعر للشخص الواحد:' : 'Price per person:'} <span className="font-bold text-secondary-foreground">{formatCurrency(pricing.perPersonPrice)}</span>
              </div>
            </div>
            
            {/* Breakdown List */}
            <div className="p-8 lg:p-10 col-span-2">
              <h3 className="text-xl font-bold mb-6 text-secondary-foreground">
                {isRTL ? 'ماذا يشمل هذا السعر؟' : 'What does this price include?'}
              </h3>
              
              <div className="space-y-4">
                {pricing.breakdown?.hotel && (
                  <div className="flex items-center justify-between py-3 border-b border-secondary-foreground/10">
                    <span className="text-secondary-foreground/90">{isRTL ? 'الإقامة الفندقية' : 'Hotel Accommodation'}</span>
                    <span className="font-bold">{formatCurrency(pricing.breakdown.hotel)}</span>
                  </div>
                )}
                {pricing.breakdown?.flights && (
                  <div className="flex items-center justify-between py-3 border-b border-secondary-foreground/10">
                    <span className="text-secondary-foreground/90">{isRTL ? 'الطيران الداخلي والمواصلات' : 'Domestic Flights & Transport'}</span>
                    <span className="font-bold">{formatCurrency(pricing.breakdown.flights)}</span>
                  </div>
                )}
                {pricing.breakdown?.activities && (
                  <div className="flex items-center justify-between py-3 border-b border-secondary-foreground/10">
                    <span className="text-secondary-foreground/90">{isRTL ? 'الجولات والأنشطة' : 'Tours & Activities'}</span>
                    <span className="font-bold">{formatCurrency(pricing.breakdown.activities)}</span>
                  </div>
                )}
                {pricing.breakdown?.meals && (
                  <div className="flex items-center justify-between py-3 border-b border-secondary-foreground/10">
                    <span className="text-secondary-foreground/90">{isRTL ? 'الوجبات المشمولة' : 'Included Meals'}</span>
                    <span className="font-bold">{formatCurrency(pricing.breakdown.meals)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
