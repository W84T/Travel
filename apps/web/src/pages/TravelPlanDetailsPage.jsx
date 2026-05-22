
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { travelService } from '@/services/travelService.js';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import TravelPlanDetailsHero from '@/components/TravelPlanDetailsHero.jsx';
import ItinerarySection from '@/components/ItinerarySection.jsx';
import HotelInformationSection from '@/components/HotelInformationSection.jsx';
import TransportationSection from '@/components/TransportationSection.jsx';
import ActivitiesSection from '@/components/ActivitiesSection.jsx';
import PricingBreakdownSection from '@/components/PricingBreakdownSection.jsx';
import IncludedExcludedSection from '@/components/IncludedExcludedSection.jsx';
import BookingSection from '@/components/BookingSection.jsx';

export default function TravelPlanDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlanDetails = async () => {
      try {
        setLoading(true);
        const data = await travelService.getTravelPlanById(id);
        setPlan(data);
      } catch (err) {
        setError(isRTL ? 'تعذر تحميل تفاصيل البرنامج.' : 'Failed to load plan details.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlanDetails();
  }, [id, isRTL]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Skeleton className="w-full h-[60vh]" />
        <div className="container mx-auto px-4 py-12 space-y-8">
          <Skeleton className="w-1/3 h-10" />
          <Skeleton className="w-full h-64 rounded-2xl" />
          <Skeleton className="w-full h-64 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center px-4">
        <h2 className="text-2xl font-bold text-foreground mb-4">{error || 'Plan not found'}</h2>
        <Button onClick={() => navigate('/travel-plans')} variant="outline">
          {isRTL ? 'العودة للبرامج' : 'Back to Plans'}
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TravelPlanDetailsHero 
        image={plan.image}
        titleAr={plan.titleAr || plan.title}
        titleEn={plan.titleEn || plan.title}
        days={plan.days}
        nights={plan.nights}
        destinationsAr={plan.destinationsAr || plan.destinations}
        destinationsEn={plan.destinationsEn || plan.destinations}
        hotelStars={plan.hotel_stars}
        travelersCount={plan.travelers_count}
        isRTL={isRTL}
      />

      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/travel-plans')}
          className="mb-8 text-muted-foreground hover:text-foreground"
        >
          {isRTL ? <ArrowRight className="w-4 h-4 ml-2" /> : <ArrowLeft className="w-4 h-4 mr-2" />}
          {isRTL ? 'العودة إلى جميع البرامج' : 'Back to all plans'}
        </Button>

        <div className="max-w-5xl mx-auto space-y-8">
          <PricingBreakdownSection pricing={{
            totalPrice: plan.total_price,
            perPersonPrice: plan.per_person_price,
            breakdown: plan.pricingBreakdown,
            currency: plan.currency,
            occupancyAr: plan.occupancyAr,
            occupancyEn: plan.occupancyEn
          }} isRTL={isRTL} />

          <ItinerarySection itinerary={plan.itinerary} isRTL={isRTL} />
          
          <HotelInformationSection hotel={plan.hotel} isRTL={isRTL} />
          
          <TransportationSection transportation={plan.transportation} isRTL={isRTL} />
          
          <ActivitiesSection activities={plan.activitiesList || plan.activities} isRTL={isRTL} />
          
          <IncludedExcludedSection 
            includedAr={plan.includedAr || plan.included} 
            includedEn={plan.includedEn || plan.included}
            excludedAr={plan.excludedAr || plan.excluded}
            excludedEn={plan.excludedEn || plan.excluded}
            isRTL={isRTL} 
          />
          
          <BookingSection packageId={plan.id} isRTL={isRTL} />
        </div>
      </div>
    </div>
  );
}
