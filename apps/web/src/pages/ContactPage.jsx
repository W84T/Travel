
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle, Facebook, Instagram, Twitter, Linkedin, Youtube, ArrowDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import ContactInfoCard from '@/components/ContactInfoCard.jsx';
import ContactFormComponent from '@/components/ContactFormComponent.jsx';
import FAQAccordion from '@/components/FAQAccordion.jsx';
import WhatsAppButton from '@/components/WhatsAppButton.jsx';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const t = {
    pageTitle: isRTL ? "اتصل بنا - السياحة في ماليزيا" : "Contact Us - Tourism in Malaysia",
    pageDesc: isRTL ? "تواصل معنا لحجز رحلاتك، التسجيل في الجامعات، ودورات اللغات في ماليزيا. فريقنا متواجد لخدمتك." : "Contact us for travel bookings, university enrollments, and language courses in Malaysia. Our team is here to help.",
    heroTitle: isRTL ? "اتصل بنا" : "Contact Us",
    heroSubtitle: isRTL ? "نحن هنا للإجابة على جميع أسئلتك وتلبية احتياجاتك" : "We're Here to Answer All Your Questions and Meet Your Needs",
    officeLocsTitle: isRTL ? "مواقع مكاتبنا" : "Our Office Locations",
    klOffice: isRTL ? "المكتب الرئيسي - كوالالمبور" : "Main Office - Kuala Lumpur",
    faqTitle: isRTL ? "الأسئلة الشائعة" : "Frequently Asked Questions",
    socialTitle: isRTL ? "تابعنا على الشبكات الاجتماعية" : "Follow Us on Social Media",
    ctaTitle: isRTL ? "هل لديك أسئلة أخرى؟" : "Have More Questions?",
    ctaSubtitle: isRTL ? "تواصل معنا الآن" : "Contact Us Now",
    ctaSend: isRTL ? "أرسل رسالة" : "Send Message"
  };

  const scrollToForm = () => {
    document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "Tourism in Malaysia",
        "url": "https://tourisminmalaysia.com",
        "logo": "https://tourisminmalaysia.com/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+60-3-1234-5678",
          "contactType": "customer service",
          "email": "info@tourisminmalaysia.com",
          "availableLanguage": ["English", "Arabic"]
        },
        "sameAs": [
          "https://facebook.com/tourisminmalaysia",
          "https://instagram.com/tourisminmalaysia",
          "https://twitter.com/tourisminmalaysia"
        ]
      },
      {
        "@type": "LocalBusiness",
        "name": "Tourism in Malaysia - Main Office",
        "image": "https://images.unsplash.com/photo-1567080185975-88eedc2b273a",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Level 42, Petronas Twin Towers",
          "addressLocality": "Kuala Lumpur City Centre",
          "addressRegion": "Kuala Lumpur",
          "postalCode": "50088",
          "addressCountry": "MY"
        },
        "telephone": "+60-3-1234-5678",
        "openingHours": "Mo-Fr 09:00-18:00, Sa 10:00-16:00"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{t.pageTitle}</title>
        <meta name="description" content={t.pageDesc} />
        <meta name="keywords" content="contact malaysia, tourism in malaysia contact, study in malaysia contact, اتصل بنا سياحة ماليزيا, التواصل للدراسة في ماليزيا" />
        <meta property="og:title" content={t.pageTitle} />
        <meta property="og:description" content={t.pageDesc} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.pageTitle} />
        <meta name="twitter:description" content={t.pageDesc} />
        <link rel="canonical" href="https://tourisminmalaysia.com/contact" />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <WhatsAppButton />

      {/* 1. HERO SECTION */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1567080185975-88eedc2b273a"
          alt="Kuala Lumpur Malaysia"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/70 backdrop-blur-[2px]" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6"
          >
            {t.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-10"
          >
            {t.heroSubtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full h-14 px-8 text-lg shadow-xl"
            >
              {t.ctaSend}
              <ArrowDown className="ml-2 rtl:mr-2 rtl:ml-0 w-5 h-5 animate-bounce" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 2. CONTACT INFORMATION SECTION */}
      <section className="py-20 -mt-20 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <ContactInfoCard
                icon={Phone}
                titleEn="Phone Number"
                titleAr="رقم الهاتف"
                contentEn="+60 3-1234-5678"
                contentAr="+60 3-1234-5678"
                link="tel:+60312345678"
                actionLabelEn="Call Us"
                actionLabelAr="اتصل بنا"
              />
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <ContactInfoCard
                icon={Mail}
                titleEn="Email Address"
                titleAr="البريد الإلكتروني"
                contentEn="info@tourisminmalaysia.com"
                contentAr="info@tourisminmalaysia.com"
                link="mailto:info@tourisminmalaysia.com"
                actionLabelEn="Send Email"
                actionLabelAr="أرسل بريد"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <ContactInfoCard
                icon={Clock}
                titleEn="Office Hours"
                titleAr="ساعات العمل"
                contentEn="Mon-Fri: 9AM - 6PM&#10;Saturday: 10AM - 4PM"
                contentAr="الإثنين-الجمعة: 9 صباحاً - 6 مساءً&#10;السبت: 10 صباحاً - 4 مساءً"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
              <ContactInfoCard
                icon={MessageCircle}
                titleEn="WhatsApp"
                titleAr="واتس آب"
                contentEn="+60 12-345-6789"
                contentAr="+60 12-345-6789"
                link="https://wa.me/60123456789"
                actionLabelEn="Message Us"
                actionLabelAr="راسلنا"
                className="bg-primary text-primary-foreground border-none ring-2 ring-primary/20"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. CONTACT FORM SECTION */}
      <section id="contact-form-section" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {isRTL ? "أرسل لنا رسالة" : "Send Us a Message"}
              </h2>
              <div className="w-20 h-1.5 bg-secondary rounded-full mx-auto" />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ContactFormComponent />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4 & 5. OFFICE LOCATIONS & WHATSAPP CTA */}
      <section className="py-20 bg-background border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Map & Office Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {t.officeLocsTitle}
                </h2>
                <div className="w-16 h-1.5 bg-primary rounded-full mb-8" />
                
                <div className="bg-card p-8 rounded-2xl shadow-lg border border-border/50">
                  <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                    <MapPin className="w-6 h-6" />
                    {t.klOffice}
                  </h3>
                  <div className="space-y-4 text-muted-foreground text-lg">
                    <p>{isRTL ? "المستوى 42، أبراج بتروناس التوأم" : "Level 42, Petronas Twin Towers"}</p>
                    <p>{isRTL ? "مركز مدينة كوالالمبور، 50088" : "Kuala Lumpur City Centre, 50088"}</p>
                    <p>{isRTL ? "كوالالمبور، ماليزيا" : "Kuala Lumpur, Malaysia"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-xl ring-1 ring-border/50">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15935.201633512998!2d101.69998001552733!3d3.1583093000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc37d12d669c1f%3A0x9e3afdd17c8a9056!2sPetronas%20Twin%20Towers!5e0!3m2!1sen!2smy!4v1709664531855!5m2!1sen!2smy" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t.faqTitle}
            </h2>
            <div className="w-20 h-1.5 bg-secondary rounded-full mx-auto" />
          </div>
          
          <FAQAccordion />
        </div>
      </section>

      {/* 7. SOCIAL MEDIA SECTION */}
      <section className="py-20 bg-background text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-10">
            {t.socialTitle}
          </h2>
          <div className="flex justify-center gap-6 md:gap-8 flex-wrap">
            {[
              { icon: Facebook, label: "Facebook", link: "#", color: "hover:text-[#1877F2]" },
              { icon: Instagram, label: "Instagram", link: "#", color: "hover:text-[#E4405F]" },
              { icon: Twitter, label: "Twitter", link: "#", color: "hover:text-[#1DA1F2]" },
              { icon: Linkedin, label: "LinkedIn", link: "#", color: "hover:text-[#0A66C2]" },
              { icon: Youtube, label: "YouTube", link: "#", color: "hover:text-[#FF0000]" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.link}
                aria-label={social.label}
                className={`w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground transition-all duration-300 hover:scale-110 hover:bg-card hover:shadow-lg ${social.color}`}
              >
                <social.icon className="w-8 h-8" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION SECTION */}
      <section className="py-24 luxury-gradient text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            {t.ctaTitle}
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto">
            {t.ctaSubtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg h-14 px-10 rounded-full shadow-xl w-full sm:w-auto"
            >
              {t.ctaSend}
            </Button>
            <WhatsAppButton variant="inline" />
          </div>
        </div>
      </section>
    </div>
  );
}
