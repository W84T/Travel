
import React from 'react';
import { useUniversities } from '@/hooks/useUniversities.js';
import UniversityCard from '@/components/UniversityCard.jsx';
import { Skeleton } from '@/components/ui/skeleton';

export default function UniversityRelatedSection({ currentUniversityId, isRTL }) {
  const { universities, loading } = useUniversities();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {[1, 2, 3].map(i => <Skeleton key={i} className="h-[400px] rounded-xl" />)}
      </div>
    );
  }

  // Simple related logic: just pick 3 other universities
  const related = universities
    .filter(u => u.id !== currentUniversityId)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="py-12 border-t border-border mt-12">
      <h2 className="text-2xl font-bold text-foreground mb-8">
        {isRTL ? 'جامعات ذات صلة' : 'Related Universities'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map(uni => (
          <UniversityCard key={uni.id} university={uni} />
        ))}
      </div>
    </section>
  );
}
