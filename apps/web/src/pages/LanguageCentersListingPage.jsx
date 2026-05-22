
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, SlidersHorizontal, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { useLanguageCenters } from '@/hooks/useLanguageCenters.js';
import LanguageCenterCard from '@/components/LanguageCenterCard.jsx';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function LanguageCentersListingPage() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const [filters, setFilters] = useState({
    search: '',
    languages: 'All',
    location: 'All',
    type: 'All',
    price_range: 'All',
    certification: 'All'
  });

  const { filter: filterCenters, loading, error } = useLanguageCenters();

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredData = useMemo(() => filterCenters(filters), [filterCenters, filters]);

  return (
    <div className="min-h-screen bg-muted/20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1521939708078-d6498bb62747" 
            alt="Language Centers Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/70 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background/90" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-md"
          >
            {isRTL ? 'مراكز اللغات في ماليزيا' : 'Malaysian Language Centers'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-medium"
          >
            {isRTL 
              ? 'اكتشف أفضل معاهد اللغات لتطوير مهاراتك والتواصل مع العالم بثقة.' 
              : 'Discover top language institutes to enhance your skills and communicate with the world confidently.'}
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-12 relative z-20">
        {/* Search & Filters */}
        <div className="bg-card rounded-2xl shadow-xl p-5 md:p-6 mb-10 border border-border/60">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5 rtl:right-4 rtl:left-auto ltr:left-4 ltr:right-auto" />
              <Input 
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder={isRTL ? 'ابحث عن مركز لغات...' : 'Search for a language center...'} 
                className="h-12 rtl:pr-12 ltr:pl-12 bg-muted/40 border-border/80 focus-visible:ring-primary text-base rounded-xl"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <Select value={filters.languages} onValueChange={(v) => handleFilterChange('languages', v)}>
              <SelectTrigger className="h-12 bg-muted/40 rounded-xl">
                <SelectValue placeholder={isRTL ? 'اللغة' : 'Language'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">{isRTL ? 'كل اللغات' : 'All Languages'}</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Mandarin">Mandarin</SelectItem>
                <SelectItem value="Arabic">Arabic</SelectItem>
                <SelectItem value="Japanese">Japanese</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.location} onValueChange={(v) => handleFilterChange('location', v)}>
              <SelectTrigger className="h-12 bg-muted/40 rounded-xl">
                <SelectValue placeholder={isRTL ? 'الموقع' : 'Location'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">{isRTL ? 'كل المدن' : 'All Cities'}</SelectItem>
                <SelectItem value="Kuala Lumpur">Kuala Lumpur</SelectItem>
                <SelectItem value="Petaling Jaya">Petaling Jaya</SelectItem>
                <SelectItem value="Penang">Penang</SelectItem>
                <SelectItem value="Subang">Subang</SelectItem>
                <SelectItem value="Johor">Johor</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.type} onValueChange={(v) => handleFilterChange('type', v)}>
              <SelectTrigger className="h-12 bg-muted/40 rounded-xl">
                <SelectValue placeholder={isRTL ? 'نوع المركز' : 'Center Type'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">{isRTL ? 'كل الأنواع' : 'All Types'}</SelectItem>
                <SelectItem value="University-affiliated">{isRTL ? 'تابع لجامعة' : 'University-affiliated'}</SelectItem>
                <SelectItem value="Private">{isRTL ? 'خاص' : 'Private'}</SelectItem>
                <SelectItem value="International">{isRTL ? 'دولي' : 'International'}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.price_range} onValueChange={(v) => handleFilterChange('price_range', v)}>
              <SelectTrigger className="h-12 bg-muted/40 rounded-xl">
                <SelectValue placeholder={isRTL ? 'نطاق السعر' : 'Price Range'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">{isRTL ? 'الكل' : 'All Prices'}</SelectItem>
                <SelectItem value="Budget">{isRTL ? 'اقتصادي' : 'Budget'}</SelectItem>
                <SelectItem value="Mid-range">{isRTL ? 'متوسط' : 'Mid-range'}</SelectItem>
                <SelectItem value="Premium">{isRTL ? 'ممتاز' : 'Premium'}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.certification} onValueChange={(v) => handleFilterChange('certification', v)}>
              <SelectTrigger className="h-12 bg-muted/40 rounded-xl">
                <SelectValue placeholder={isRTL ? 'الشهادات' : 'Certifications'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">{isRTL ? 'كل الشهادات' : 'All Certifications'}</SelectItem>
                <SelectItem value="IELTS">IELTS</SelectItem>
                <SelectItem value="TOEFL">TOEFL</SelectItem>
                <SelectItem value="HSK">HSK</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        {error ? (
          <div className="bg-destructive/10 text-destructive p-8 rounded-2xl text-center border border-destructive/20 max-w-2xl mx-auto">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h3 className="text-xl font-bold mb-2">{isRTL ? 'حدث خطأ' : 'An error occurred'}</h3>
            <p>{error}</p>
            <Button variant="outline" onClick={() => window.location.reload()} className="mt-4 bg-transparent border-destructive text-destructive hover:bg-destructive hover:text-white">
              {isRTL ? 'إعادة المحاولة' : 'Try Again'}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-[480px] rounded-2xl" />
              ))
            ) : filteredData.length > 0 ? (
              filteredData.map((center, index) => (
                <motion.div
                  key={center.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <LanguageCenterCard center={center} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-card rounded-2xl border border-border border-dashed shadow-sm">
                <SlidersHorizontal className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {isRTL ? 'لا توجد نتائج' : 'No results found'}
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {isRTL ? 'لم نتمكن من العثور على مراكز تطابق معايير البحث الخاصة بك. جرب إزالة بعض الفلاتر.' : 'We couldn\'t find any centers matching your criteria. Try removing some filters.'}
                </p>
                <Button 
                  variant="outline" 
                  className="mt-6 rounded-xl"
                  onClick={() => setFilters({ search: '', languages: 'All', location: 'All', type: 'All', price_range: 'All', certification: 'All' })}
                >
                  {isRTL ? 'مسح عوامل التصفية' : 'Clear Filters'}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
