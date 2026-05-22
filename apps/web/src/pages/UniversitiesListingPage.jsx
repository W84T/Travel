
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { useUniversities } from '@/hooks/useUniversities.js';
import UniversityCard from '@/components/UniversityCard.jsx';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function UniversitiesListingPage() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const [filters, setFilters] = useState({
    search: '',
    type: 'All',
    location: 'All',
    ranking: 'All'
  });

  const { universities, loading, error } = useUniversities(filters);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1588076336276-3d64aa5a8487" 
            alt="Universities" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-secondary/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-background/90" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            {isRTL ? 'الجامعات الماليزية' : 'Malaysian Universities'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
          >
            {isRTL 
              ? 'اكتشف أفضل الجامعات والمؤسسات التعليمية في ماليزيا لمستقبلك الأكاديمي.' 
              : 'Discover top universities and educational institutions in Malaysia for your academic future.'}
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-8 relative z-20">
        {/* Search & Filters */}
        <div className="bg-card rounded-2xl shadow-lg p-4 md:p-6 mb-12 border border-border">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5 rtl:right-4 rtl:left-auto ltr:left-4 ltr:right-auto" />
              <Input 
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder={isRTL ? 'ابحث عن اسم الجامعة...' : 'Search university name...'} 
                className="h-12 rtl:pr-12 ltr:pl-12 bg-muted/50"
              />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 flex-1">
              <Select value={filters.type} onValueChange={(v) => handleFilterChange('type', v)}>
                <SelectTrigger className="h-12 bg-muted/50">
                  <SelectValue placeholder={isRTL ? 'نوع الجامعة' : 'University Type'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">{isRTL ? 'الكل' : 'All Types'}</SelectItem>
                  <SelectItem value="Public">{isRTL ? 'حكومية' : 'Public'}</SelectItem>
                  <SelectItem value="Private">{isRTL ? 'خاصة' : 'Private'}</SelectItem>
                  <SelectItem value="International">{isRTL ? 'دولية' : 'International'}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.location} onValueChange={(v) => handleFilterChange('location', v)}>
                <SelectTrigger className="h-12 bg-muted/50">
                  <SelectValue placeholder={isRTL ? 'الموقع' : 'Location'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">{isRTL ? 'كل المدن' : 'All Cities'}</SelectItem>
                  <SelectItem value="Kuala Lumpur">Kuala Lumpur</SelectItem>
                  <SelectItem value="Subang Jaya">Subang Jaya</SelectItem>
                  <SelectItem value="Penang">Penang</SelectItem>
                  <SelectItem value="Johor Bahru">Johor Bahru</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.ranking} onValueChange={(v) => handleFilterChange('ranking', v)}>
                <SelectTrigger className="h-12 bg-muted/50 col-span-2 md:col-span-1">
                  <SelectValue placeholder={isRTL ? 'التصنيف' : 'Ranking'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">{isRTL ? 'الكل' : 'All Rankings'}</SelectItem>
                  <SelectItem value="Top 100">Top 100</SelectItem>
                  <SelectItem value="Top 200">Top 200</SelectItem>
                  <SelectItem value="Top 500">Top 500</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results */}
        {error ? (
          <div className="bg-destructive/10 text-destructive p-8 rounded-2xl text-center border border-destructive/20">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h3 className="text-xl font-bold mb-2">{isRTL ? 'حدث خطأ' : 'An error occurred'}</h3>
            <p>{error}</p>
            <Button variant="outline" onClick={() => window.location.reload()} className="mt-4">
              {isRTL ? 'إعادة المحاولة' : 'Try Again'}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-[450px] rounded-2xl" />
              ))
            ) : universities.length > 0 ? (
              universities.map((uni, index) => (
                <motion.div
                  key={uni.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <UniversityCard university={uni} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-24 bg-card rounded-2xl border border-border border-dashed">
                <SlidersHorizontal className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {isRTL ? 'لا توجد نتائج' : 'No results found'}
                </h3>
                <p className="text-muted-foreground">
                  {isRTL ? 'جرب تغيير معايير البحث الخاصة بك.' : 'Try adjusting your search filters.'}
                </p>
                <Button 
                  variant="outline" 
                  className="mt-6"
                  onClick={() => setFilters({ search: '', type: 'All', location: 'All', ranking: 'All' })}
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
