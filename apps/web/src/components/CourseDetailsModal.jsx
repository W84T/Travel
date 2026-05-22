
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Clock, Users, Calendar, Award, CheckCircle2, BookOpen } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';

export default function CourseDetailsModal({ course, open, onOpenChange }) {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  if (!course) return null;

  const name = isRTL ? course.name.ar : course.name.en;
  const description = isRTL ? course.description.ar : course.description.en;
  const curriculum = isRTL ? course.curriculum.ar : course.curriculum.en;
  const learningOutcomes = isRTL ? course.learning_outcomes.ar : course.learning_outcomes.en;
  const prerequisites = isRTL ? course.prerequisites.ar : course.prerequisites.en;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card p-0 gap-0 border-none shadow-2xl rounded-2xl">
        <div className="bg-primary p-6 md:p-8 text-primary-foreground sticky top-0 z-10">
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
              {name}
            </DialogTitle>
            <DialogDescription className="text-primary-foreground/80 text-base">
              {description}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-wrap gap-2 mt-6">
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
              {course.language}
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
              {course.level}
            </span>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-8 bg-background">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-muted p-4 rounded-xl">
              <Clock className="w-5 h-5 text-primary mb-2" />
              <div className="text-sm text-muted-foreground mb-1">{isRTL ? 'المدة' : 'Duration'}</div>
              <div className="font-semibold">{course.duration}</div>
            </div>
            <div className="bg-muted p-4 rounded-xl">
              <Calendar className="w-5 h-5 text-primary mb-2" />
              <div className="text-sm text-muted-foreground mb-1">{isRTL ? 'الجدول' : 'Schedule'}</div>
              <div className="font-semibold">{course.schedule_type}</div>
            </div>
            <div className="bg-muted p-4 rounded-xl">
              <Users className="w-5 h-5 text-primary mb-2" />
              <div className="text-sm text-muted-foreground mb-1">{isRTL ? 'حجم الفصل' : 'Class Size'}</div>
              <div className="font-semibold">{course.class_size}</div>
            </div>
            <div className="bg-muted p-4 rounded-xl">
              <Award className="w-5 h-5 text-primary mb-2" />
              <div className="text-sm text-muted-foreground mb-1">{isRTL ? 'الرسوم' : 'Tuition Fee'}</div>
              <div className="font-semibold text-primary">{course.tuition_fee}</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold flex items-center mb-3">
                  <BookOpen className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 text-primary" />
                  {isRTL ? 'المنهج الدراسي' : 'Curriculum'}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{curriculum}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold flex items-center mb-3">
                  <CheckCircle2 className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 text-primary" />
                  {isRTL ? 'نتائج التعلم' : 'Learning Outcomes'}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{learningOutcomes}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-accent/50 p-6 rounded-xl border border-accent">
                <h3 className="text-lg font-bold mb-3">{isRTL ? 'متطلبات التسجيل' : 'Prerequisites'}</h3>
                <p className="text-muted-foreground">{prerequisites}</p>
              </div>
              
              <div className="bg-accent/50 p-6 rounded-xl border border-accent">
                <h3 className="text-lg font-bold mb-3">{isRTL ? 'أوقات الفصول' : 'Class Times'}</h3>
                <p className="text-muted-foreground">{course.schedule_times}</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {isRTL ? 'إغلاق' : 'Close'}
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              {isRTL ? 'التسجيل الآن' : 'Enroll Now'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
