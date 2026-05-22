
import React from 'react';
import { Check, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function IncludedExcludedSection({ includedAr, includedEn, excludedAr, excludedEn, isRTL }) {
  const included = isRTL ? includedAr : includedEn;
  const excluded = isRTL ? excludedAr : excludedEn;

  if (!included?.length && !excluded?.length) return null;

  return (
    <section className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Included */}
        <Card className="bg-card border-border/50 shadow-sm">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
                <Check className="w-5 h-5" />
              </div>
              {isRTL ? 'يشمل السعر' : 'Included'}
            </h3>
            <ul className="space-y-4">
              {included?.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Excluded */}
        <Card className="bg-card border-border/50 shadow-sm">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
                <X className="w-5 h-5" />
              </div>
              {isRTL ? 'لا يشمل السعر' : 'Excluded'}
            </h3>
            <ul className="space-y-4">
              {excluded?.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                  <X className="w-5 h-5 text-destructive/70 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
