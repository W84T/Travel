
import React from 'react';
import { GraduationCap, Languages } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function InstructorCard({ instructor, isRTL }) {
  const bio = isRTL ? instructor.bio.ar : instructor.bio.en;

  return (
    <Card className="overflow-hidden border-none shadow-md bg-card group">
      <CardContent className="p-0 flex flex-col md:flex-row">
        <div className="w-full md:w-48 h-48 md:h-auto shrink-0 overflow-hidden bg-muted">
          <img 
            src={instructor.photo} 
            alt={instructor.name} 
            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
          />
        </div>
        <div className="p-6 flex-1 flex flex-col justify-center">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-foreground">{instructor.name}</h3>
            <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded">
              {instructor.experience_years} {isRTL ? 'سنوات خبرة' : 'Yrs Exp'}
            </span>
          </div>
          
          <div className="space-y-2 mb-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <GraduationCap className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-primary/70 shrink-0" />
              <span className="truncate">{instructor.qualifications}</span>
            </div>
            <div className="flex items-center">
              <Languages className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-primary/70 shrink-0" />
              <span>{instructor.languages}</span>
            </div>
          </div>
          
          <p className="text-sm text-foreground/80 leading-relaxed italic mb-4">"{bio}"</p>
          
          <div className="mt-auto pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              {isRTL ? 'التخصصات:' : 'Specializations:'} <span className="text-primary font-semibold normal-case tracking-normal">{instructor.specializations}</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
