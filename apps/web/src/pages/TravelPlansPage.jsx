
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, AlertCircle } from 'lucide-react';
import { travelService } from '@/services/travelService.js';
import TravelPlanCard from '@/components/TravelPlanCard.jsx';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function TravelPlansPage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStars, setFilterStars] = useState(0);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await travelService.getTravelPlans();
        
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received");
        }
        
        setPlans(data);
      } catch (err) {
        console.error("Failed to fetch travel plans", err);
        setError("تعذر تحميل البرامج السياحية. يرجى المحاولة مرة أخرى.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // Safe filter logic
  const filteredPlans = plans.filter(plan => {
    if (!plan) return false;
    
    const searchLower = searchTerm.toLowerCase();
    
    // Safely check titles
    const titleAr = plan.titleAr || '';
    const titleEn = plan.titleEn || '';
    const title = plan.title || '';
    
    // Safely check destinations
    const destsAr = Array.isArray(plan.destinationsAr) ? plan.destinationsAr : [];
    const destsEn = Array.isArray(plan.destinationsEn) ? plan.destinationsEn : [];
    const dests = Array.isArray(plan.destinations) ? plan.destinations : [];
    
    const matchesSearch = 
      titleAr.includes(searchTerm) || 
      titleEn.toLowerCase().includes(searchLower) || 
      title.toLowerCase().includes(searchLower) || 
      dests.some(d => d?.toLowerCase().includes(searchLower)) || 
      destsAr.some(d => d?.includes(searchTerm)) ||
      destsEn.some(d => d?.toLowerCase().includes(searchLower));
      
    const matchesStars = filterStars === 0 || plan.hotel_stars === filterStars;
    
    return matchesSearch && matchesStars;
  });

  return (
    <div className="min-h-screen bg-muted/20 pt-24 pb-20">
      <div className="container mx-auto px-4">
        
        {/* Page Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-foreground mb-6"
          >
            برامج السياحة في ماليزيا
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            اكتشف مجموعتنا الحصرية من البرامج السياحية الفاخرة المصممة لتلبية كافة تطلعاتك في ماليزيا.
          </motion.p>
        </div>

        {/* Search and Filters Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card p-4 rounded-2xl shadow-sm border border-border mb-12 flex flex-col md:flex-row gap-4 items-center"
        >
          <div className="relative flex-1 w-full">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث عن وجهة أو اسم البرنامج..." 
              className="pr-12 h-14 rounded-xl text-base bg-muted/50 border-transparent focus-visible:ring-primary" 
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <div className="flex items-center gap-2 px-2 text-sm font-medium text-muted-foreground whitespace-nowrap">
              <Filter className="w-4 h-4" />
              تصنيف الفنادق:
            </div>
            {[0, 5, 4, 3].map((stars) => (
              <Button
                key={stars}
                variant={filterStars === stars ? "default" : "outline"}
                onClick={() => setFilterStars(stars)}
                className={`rounded-xl h-12 px-6 whitespace-nowrap ${filterStars === stars ? 'bg-primary text-primary-foreground shadow-md' : 'bg-transparent'}`}
              >
                {stars === 0 ? 'الكل' : `${stars} نجوم`}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Results Grid */}
        {error ? (
          <div className="bg-destructive/10 text-destructive p-8 rounded-3xl flex flex-col items-center justify-center gap-4 border border-destructive/20 text-center">
            <AlertCircle className="w-12 h-12 opacity-80" />
            <h3 className="text-xl font-bold">عذراً، حدث خطأ</h3>
            <p>{error}</p>
            <Button variant="outline" onClick={() => window.location.reload()} className="mt-4">
              إعادة المحاولة
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[4/5] w-full rounded-2xl" />
                </div>
              ))
            ) : filteredPlans.length > 0 ? (
              filteredPlans.map((plan, index) => (
                <motion.div
                  key={plan?.id || index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <TravelPlanCard plan={plan} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-24 bg-card rounded-3xl border border-border border-dashed">
                <SlidersHorizontal className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">لا توجد نتائج</h3>
                <p className="text-muted-foreground text-lg">لم نتمكن من العثور على برامج تطابق معايير البحث الخاصة بك.</p>
                <Button 
                  variant="outline" 
                  className="mt-6 rounded-xl"
                  onClick={() => { setSearchTerm(''); setFilterStars(0); }}
                >
                  مسح عوامل التصفية
                </Button>
              </div>
            )}
          </div>
        )}
        
      </div>
    </div>
  );
}
