
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { cn } from '@/lib/utils.js';

export default function ContactInfoCard({ 
  icon: Icon, 
  titleEn, 
  titleAr, 
  contentEn, 
  contentAr, 
  link, 
  actionLabelEn, 
  actionLabelAr,
  className 
}) {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  
  const title = isRTL ? titleAr : titleEn;
  const content = isRTL ? contentAr : contentEn;
  const actionLabel = isRTL ? actionLabelAr : actionLabelEn;

  return (
    <Card className={cn("group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card h-full", className)}>
      <CardContent className="p-6 md:p-8 flex flex-col items-start h-full">
        <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
          <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
        <div className="text-muted-foreground leading-relaxed flex-1 whitespace-pre-line mb-6">
          {content}
        </div>
        {link && actionLabel && (
          <a 
            href={link}
            target={link.startsWith('http') ? '_blank' : undefined}
            rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="mt-auto text-sm font-bold text-primary hover:text-secondary transition-colors inline-flex items-center gap-2 group/link"
          >
            {actionLabel}
            <span className={cn("transition-transform", isRTL ? "group-hover/link:-translate-x-1" : "group-hover/link:translate-x-1")}>
              {isRTL ? '←' : '→'}
            </span>
          </a>
        )}
      </CardContent>
    </Card>
  );
}
