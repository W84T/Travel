
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Clock, Star, GraduationCap, Languages, 
  Award, Users, Settings, DollarSign, Headphones, 
  ShieldCheck, HeartHandshake, CheckCircle2
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { travelService } from '@/services/travelService.js';
import { universitiesData } from '@/data/universitiesData.js';
import { languageCentersData } from '@/data/languageCentersData.js';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import FeaturedCard from '@/components/FeaturedCard.jsx';
import FeatureCard from '@/components/FeatureCard.jsx';
import TestimonialCard from '@/components/TestimonialCard.jsx';
import StatisticCounter from '@/components/StatisticCounter.jsx';
import Carousel from '@/components/Carousel.jsx';

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1693554925388-e464daba8fe6", // Tropical
  "https://images.unsplash.com/photo-1678115151316-9fdbf3628557", // City
  "https://images.unsplash.com/photo-1546189132-46b9dd4fbb5e"  // Cultural
];

export default function HomePage() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const [featuredPlans, setFeaturedPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [heroImageIndex, setHeroImageIndex] = useState(0);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const plans = await travelService.getTravelPlans();
        setFeaturedPlans(plans.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch travel plans", error);
      } finally {
        setLoadingPlans(false);
      }
    };
    fetchPlans();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: Award, title: isRTL ? "خبرة 15 سنة" : "15 Years of Experience", desc: isRTL ? "نقدم خدمات سياحية وتعليمية رائدة منذ أكثر من عقد ونصف." : "Providing leading tourism and educational services for over a decade and a half." },
    { icon: Users, title: isRTL ? "أكثر من 10,000 عميل راضي" : "10,000+ Satisfied Clients", desc: isRTL ? "نفخر بخدمة آلاف العملاء الذين يثقون بخدماتنا." : "Proud to serve thousands of clients who trust our services." },
    { icon: Settings, title: isRTL ? "برامج مخصصة" : "Customized Programs", desc: isRTL ? "نصمم برامج تناسب احتياجاتك وميزانيتك بدقة." : "We design programs tailored to your specific needs and budget." },
    { icon: DollarSign, title: isRTL ? "أفضل الأسعار" : "Best Prices", desc: isRTL ? "نضمن لك الحصول على أفضل قيمة مقابل ما تدفعه." : "We guarantee you get the best value for your money." },
    { icon: Headphones, title: isRTL ? "دعم 24/7" : "24/7 Support", desc: isRTL ? "فريقنا متواجد على مدار الساعة لمساعدتك في أي وقت." : "Our team is available around the clock to assist you anytime." },
    { icon: ShieldCheck, title: isRTL ? "شركاء موثوقون" : "Trusted Partners", desc: isRTL ? "نتعاون مع أفضل الفنادق والجامعات المعتمدة." : "We collaborate with the best hotels and accredited universities." },
    { icon: CheckCircle2, title: isRTL ? "تأشيرات مضمونة" : "Visa Guaranteed", desc: isRTL ? "نساعدك في استخراج التأشيرات السياحية والطلابية بسهولة." : "We assist you in obtaining tourist and student visas easily." },
    { icon: HeartHandshake, title: isRTL ? "خدمة عملاء ممتازة" : "Excellent Customer Service", desc: isRTL ? "رضاك هو غايتنا الأولى في كل خطوة من رحلتك." : "Your satisfaction is our primary goal at every step of your journey." }
  ];

  const testimonials = [
    {
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      name: isRTL ? "أحمد عبدالله" : "Ahmed Abdullah",
      badgeType: isRTL ? "طالب" : "Student",
      rating: 5,
      text: isRTL ? "تجربة دراسية رائعة في ماليزيا. الفريق ساعدني في كل خطوة من التسجيل حتى السكن." : "Great study experience in Malaysia. The team helped me every step from registration to housing.",
      programName: isRTL ? "جامعة مالايا" : "University of Malaya"
    },
    {
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      name: isRTL ? "محمد خالد" : "Mohammed Khalid",
      badgeType: isRTL ? "سائح" : "Tourist",
      rating: 5,
      text: isRTL ? "رحلة شهر العسل كانت خيالية. التنظيم دقيق والفنادق كانت فاخرة جداً." : "The honeymoon trip was magical. Precise organization and very luxurious hotels.",
      programName: isRTL ? "باقة لنكاوي الفاخرة" : "Langkawi Luxury Package"
    },
    {
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      name: isRTL ? "سارة فهد" : "Sarah Fahad",
      badgeType: isRTL ? "طالب" : "Student",
      rating: 4,
      text: isRTL ? "درست اللغة الإنجليزية لمدة 6 أشهر. المعهد ممتاز والبيئة محفزة جداً للتعلم." : "Studied English for 6 months. Excellent institute and very motivating environment.",
      programName: isRTL ? "معهد ELS" : "ELS Language Center"
    },
    {
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      name: isRTL ? "عمر سعيد" : "Omar Saeed",
      badgeType: isRTL ? "سائح" : "Tourist",
      rating: 5,
      text: isRTL ? "أفضل شركة سياحية تعاملت معها. السائقون محترفون والبرنامج السياحي متكامل." : "Best tourism company I've dealt with. Professional drivers and comprehensive itinerary.",
      programName: isRTL ? "جولة كوالالمبور وبينانج" : "KL & Penang Tour"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* 1. HERO SECTION */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={heroImageIndex}
            src={HERO_IMAGES[heroImageIndex]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full object-cover"
            alt="Malaysia"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-background" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 max-w-5xl mx-auto leading-tight drop-shadow-2xl"
          >
            {isRTL ? "السياحة في ماليزيا" : "Tourism in Malaysia"}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-3xl text-white/90 mb-12 max-w-3xl mx-auto font-medium drop-shadow-md"
          >
            {isRTL ? "اكتشف وتعلم واستكشف ماليزيا" : "Discover, Learn, and Explore Malaysia"}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg h-14 px-10 rounded-full shadow-xl hover:scale-105 transition-all duration-300 w-full sm:w-auto">
              <Link to="/travel-plans">{isRTL ? "استكشف السفر" : "Explore Travel"}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white hover:text-primary text-lg h-14 px-10 rounded-full shadow-xl hover:scale-105 transition-all duration-300 w-full sm:w-auto">
              <Link to="/universities">{isRTL ? "ابدأ الدراسة" : "Start Learning"}</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 2. FEATURED TRAVEL PLANS */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {isRTL ? "خطط السفر المميزة" : "Featured Travel Plans"}
              </h2>
              <div className="w-20 h-1.5 bg-secondary rounded-full" />
            </div>
            <Button asChild variant="outline" className="rounded-full px-8">
              <Link to="/travel-plans">{isRTL ? "عرض جميع خطط السفر" : "View All Travel Plans"}</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loadingPlans ? (
              Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-[450px] rounded-2xl" />)
            ) : (
              featuredPlans.map((plan, index) => (
                <motion.div key={plan.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <FeaturedCard
                    image={plan.image}
                    title={isRTL ? plan.titleAr : plan.titleEn}
                    description={isRTL ? plan.descriptionAr : plan.descriptionEn}
                    badge={`${plan.days} ${isRTL ? 'أيام' : 'Days'}`}
                    meta={[
                      { icon: MapPin, text: isRTL ? plan.destinationsAr.join(' - ') : plan.destinationsEn.join(' - ') },
                      { icon: DollarSign, text: `${plan.currency} ${plan.per_person_price}` }
                    ]}
                    link={`/travel-plans/${plan.id}`}
                    linkText={isRTL ? "عرض التفاصيل" : "View Details"}
                    isRTL={isRTL}
                  />
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 3. FEATURED UNIVERSITIES */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {isRTL ? "الجامعات الماليزية المميزة" : "Featured Malaysian Universities"}
              </h2>
              <div className="w-20 h-1.5 bg-secondary rounded-full" />
            </div>
            <Button asChild variant="outline" className="rounded-full px-8">
              <Link to="/universities">{isRTL ? "عرض جميع الجامعات" : "View All Universities"}</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {universitiesData.slice(0, 3).map((uni, index) => (
              <motion.div key={uni.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <FeaturedCard
                  image={uni.banner_image}
                  title={isRTL ? uni.name.ar : uni.name.en}
                  description={isRTL ? uni.description.ar : uni.description.en}
                  badge={`#${uni.world_ranking} ${isRTL ? 'عالمياً' : 'Global'}`}
                  meta={[
                    { icon: MapPin, text: uni.city },
                    { icon: GraduationCap, text: `${uni.programs.length} ${isRTL ? 'برامج' : 'Programs'}` }
                  ]}
                  link={`/universities/${uni.id}`}
                  linkText={isRTL ? "تفاصيل الجامعة" : "University Details"}
                  isRTL={isRTL}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED LANGUAGE CENTERS */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {isRTL ? "مراكز اللغات المميزة" : "Featured Language Centers"}
              </h2>
              <div className="w-20 h-1.5 bg-secondary rounded-full" />
            </div>
            <Button asChild variant="outline" className="rounded-full px-8">
              <Link to="/language-centers">{isRTL ? "عرض جميع مراكز اللغات" : "View All Language Centers"}</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {languageCentersData.slice(0, 3).map((center, index) => (
              <motion.div key={center.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <FeaturedCard
                  image={center.banner_image}
                  title={isRTL ? center.name.ar : center.name.en}
                  description={isRTL ? center.description.ar : center.description.en}
                  badge={center.type}
                  meta={[
                    { icon: MapPin, text: center.city },
                    { icon: Languages, text: center.languages_offered.map(l => l.name).slice(0,2).join(', ') + (center.languages_offered.length > 2 ? '...' : '') }
                  ]}
                  link={`/language-centers/${center.id}`}
                  linkText={isRTL ? "تفاصيل المركز" : "Center Details"}
                  isRTL={isRTL}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isRTL ? "لماذا تختار السياحة في ماليزيا" : "Why Choose Tourism in Malaysia"}
            </h2>
            <div className="w-20 h-1.5 bg-secondary rounded-full mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.desc}
                  isRTL={isRTL}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-24 bg-muted/30 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {isRTL ? "آراء عملائنا" : "What Our Clients Say"}
            </h2>
            <div className="w-20 h-1.5 bg-secondary rounded-full mx-auto" />
          </div>
          
          <Carousel isRTL={isRTL}>
            {testimonials.map((test, index) => (
              <TestimonialCard
                key={index}
                avatar={test.avatar}
                name={test.name}
                badgeType={test.badgeType}
                rating={test.rating}
                text={test.text}
                programName={test.programName}
                isRTL={isRTL}
              />
            ))}
          </Carousel>
        </div>
      </section>

      {/* 7. STATISTICS */}
      <section className="py-20 bg-background border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 divide-x rtl:divide-x-reverse divide-border/50">
            <StatisticCounter value={15} suffix="+" label={isRTL ? "سنوات خبرة" : "Years Experience"} />
            <StatisticCounter value={10000} suffix="+" label={isRTL ? "عميل راضي" : "Satisfied Clients"} />
            <StatisticCounter value={50} suffix="+" label={isRTL ? "جامعة شريكة" : "Partner Universities"} />
            <StatisticCounter value={30} suffix="+" label={isRTL ? "مركز لغات" : "Language Centers"} />
            <StatisticCounter value={100} suffix="+" label={isRTL ? "برنامج سياحي" : "Travel Programs"} />
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="py-24 luxury-gradient text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            {isRTL ? "ابدأ رحلتك اليوم" : "Start Your Journey Today"}
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto">
            {isRTL ? "اختر بين السفر أو الدراسة أو تعلم اللغات" : "Choose Between Travel, Study, or Learn Languages"}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg h-14 px-8 rounded-full shadow-xl w-full sm:w-auto">
              <Link to="/travel-plans">{isRTL ? "استكشف السفر" : "Explore Travel"}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white hover:text-primary text-lg h-14 px-8 rounded-full shadow-xl w-full sm:w-auto">
              <Link to="/universities">{isRTL ? "اختر جامعة" : "Choose University"}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white hover:text-primary text-lg h-14 px-8 rounded-full shadow-xl w-full sm:w-auto">
              <Link to="/language-centers">{isRTL ? "تعلم لغة" : "Learn a Language"}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
