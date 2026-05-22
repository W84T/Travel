
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function FeatureCard({ icon: Icon, title, description, isRTL }) {
  return (
    <Card className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card">
      <CardContent className="p-6 md:p-8 flex flex-col items-center text-center h-full">
        <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
          <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed flex-1">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
