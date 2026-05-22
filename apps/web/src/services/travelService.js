
const images = [
  "https://images.unsplash.com/photo-1702458038121-05dc31dba46e",
  "https://images.unsplash.com/photo-1677675962728-0149edc7f50a",
  "https://images.unsplash.com/photo-1602589081234-ea5e74005804",
  "https://images.unsplash.com/photo-1596422846543-75c6ef08b739",
  "https://images.unsplash.com/photo-1583417319070-4a69db38a482"
];

const malaysianCities = [
  ["Kuala Lumpur", "Langkawi"],
  ["Penang", "Ipoh"],
  ["Kuala Lumpur", "Malacca"],
  ["Kota Kinabalu", "Kundasang"],
  ["Kuching", "Damai Beach"],
  ["Johor Bahru", "Desaru"],
  ["Cameron Highlands", "Ipoh"],
  ["Kuala Lumpur", "Genting Highlands"],
  ["Penang", "Langkawi"],
  ["Kuala Lumpur", "Penang", "Langkawi"]
];

const malaysianCitiesAr = [
  ["كوالالمبور", "لنكاوي"],
  ["بينانج", "ايبوه"],
  ["كوالالمبور", "ملاكا"],
  ["كوتا كينابالو", "كونداسانغ"],
  ["كوتشينغ", "شاطئ داماي"],
  ["جوهور بارو", "ديسارو"],
  ["مرتفعات كاميرون", "ايبوه"],
  ["كوالالمبور", "مرتفعات جينتينج"],
  ["بينانج", "لنكاوي"],
  ["كوالالمبور", "بينانج", "لنكاوي"]
];

// Generate 20 complete mock travel plans
const generateMockPlans = () => {
  const plans = [];
  for (let i = 1; i <= 20; i++) {
    const cityIndex = i % malaysianCities.length;
    const days = 3 + (i % 5);
    const nights = days - 1;
    const travelers = 2 + (i % 3);
    const stars = 3 + (i % 3); // 3, 4, or 5 stars
    const basePrice = 300 + (i * 50);
    
    plans.push({
      id: i.toString(),
      days: days,
      nights: nights,
      title: `Luxury Malaysia Tour ${days} Days - Package ${i}`,
      titleAr: `برنامج سياحي ماليزيا الفاخر ${days} أيام - باقة ${i}`,
      titleEn: `Luxury Malaysia Tour ${days} Days - Package ${i}`,
      description: `Enjoy an unforgettable experience in ${malaysianCities[cityIndex].join(' and ')}.`,
      descriptionAr: `استمتع بتجربة لا تُنسى في ${malaysianCitiesAr[cityIndex].join(' و ')}.`,
      descriptionEn: `Enjoy an unforgettable experience in ${malaysianCities[cityIndex].join(' and ')}.`,
      destinations: malaysianCities[cityIndex],
      destinationsAr: malaysianCitiesAr[cityIndex],
      destinationsEn: malaysianCities[cityIndex],
      travelers_count: travelers,
      hotel_stars: stars,
      currency: 'USD',
      total_price: basePrice * travelers,
      per_person_price: basePrice,
      image: images[i % images.length],
      
      itinerary: Array.from({ length: days }).map((_, dayIdx) => ({
        day: dayIdx + 1,
        time: '09:00 AM - 05:00 PM',
        titleAr: `اليوم ${dayIdx + 1}: جولة سياحية`,
        titleEn: `Day ${dayIdx + 1}: Sightseeing Tour`,
        descriptionAr: `استكشاف معالم المدينة والاستمتاع بالأنشطة المتنوعة.`,
        descriptionEn: `Explore city landmarks and enjoy various activities.`,
        meals: ['breakfast', dayIdx % 2 === 0 ? 'lunch' : 'dinner'],
        locationAr: malaysianCitiesAr[cityIndex][dayIdx % malaysianCitiesAr[cityIndex].length],
        locationEn: malaysianCities[cityIndex][dayIdx % malaysianCities[cityIndex].length]
      })),
      
      hotel: {
        name: `Premium Hotel ${stars} Stars`,
        nameAr: `فندق بريميوم ${stars} نجوم`,
        nameEn: `Premium Hotel ${stars} Stars`,
        rating: stars,
        images: [images[(i + 1) % images.length], images[(i + 2) % images.length]],
        addressAr: `وسط المدينة، ماليزيا`,
        addressEn: `City Center, Malaysia`,
        descriptionAr: `إقامة فاخرة مع إطلالات خلابة وخدمات متكاملة.`,
        descriptionEn: `Luxury accommodation with stunning views and full services.`,
        amenities: ['wifi', 'pool', 'gym', 'restaurant'],
        roomTypeAr: 'غرفة ديلوكس مزدوجة',
        roomTypeEn: 'Deluxe Double Room',
        checkIn: '03:00 PM',
        checkOut: '12:00 PM'
      },
      
      transportation: {
        type: 'Private & Flight',
        flights: [
          {
            airlineAr: 'الخطوط الجوية الماليزية',
            airlineEn: 'Malaysia Airlines',
            flightNumber: `MH ${100 + i}`,
            departure: '10:00 AM',
            arrival: '11:30 AM',
            routeAr: `${malaysianCitiesAr[cityIndex][0]} إلى وجهتك`,
            routeEn: `${malaysianCities[cityIndex][0]} to destination`
          }
        ],
        transfersAr: 'سيارة خاصة للاستقبال والتوديع',
        transfersEn: 'Private car for airport transfers',
        inDestinationAr: 'سيارة مع سائق للجولات',
        inDestinationEn: 'Car with driver for tours'
      },
      
      activities: [
        {
          nameAr: 'جولة المدينة الشاملة',
          nameEn: 'Comprehensive City Tour',
          descriptionAr: 'زيارة أهم المعالم السياحية والتاريخية.',
          descriptionEn: 'Visit the most important tourist and historical landmarks.',
          duration: '4 hours',
          whatToBringAr: 'كاميرا، حذاء مريح',
          whatToBringEn: 'Camera, comfortable shoes',
          icon: 'building'
        },
        {
          nameAr: 'رحلة طبيعية',
          nameEn: 'Nature Excursion',
          descriptionAr: 'استكشاف الطبيعة الخلابة والحدائق.',
          descriptionEn: 'Explore beautiful nature and parks.',
          duration: '3 hours',
          whatToBringAr: 'ملابس خفيفة',
          whatToBringEn: 'Light clothing',
          icon: 'map'
        }
      ],
      
      pricing_breakdown: {
        accommodation: Math.round(basePrice * 0.4),
        transport: Math.round(basePrice * 0.2),
        activities: Math.round(basePrice * 0.2),
        meals: Math.round(basePrice * 0.1),
        taxes: Math.round(basePrice * 0.1)
      },
      
      // Legacy support for components expecting pricingBreakdown
      pricingBreakdown: {
        hotel: Math.round(basePrice * 0.4),
        flights: Math.round(basePrice * 0.2),
        activities: Math.round(basePrice * 0.2),
        meals: Math.round(basePrice * 0.1)
      },
      
      occupancyAr: `غرفة مزدوجة لـ ${travelers} أشخاص`,
      occupancyEn: `Double room for ${travelers} persons`,
      
      included: ['5-star hotel accommodation', 'Daily breakfast', 'Private airport transfers', 'Tours'],
      includedAr: ['الإقامة الفندقية', 'وجبة الإفطار', 'الاستقبال والتوديع', 'الجولات السياحية'],
      includedEn: ['Hotel accommodation', 'Breakfast', 'Airport transfers', 'Sightseeing tours'],
      
      excluded: ['International flights', 'Personal expenses', 'Visa'],
      excludedAr: ['الطيران الدولي', 'المصروفات الشخصية', 'التأشيرة'],
      excludedEn: ['International flights', 'Personal expenses', 'Visa']
    });
  }
  return plans;
};

const mockTravelPlans = generateMockPlans();

export const travelService = {
  getTravelPlans: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockTravelPlans), 600);
    });
  },
  
  getTravelPlanById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const plan = mockTravelPlans.find(p => p.id === id);
        if (plan) resolve(plan);
        else reject(new Error('Travel plan not found'));
      }, 400);
    });
  }
};
