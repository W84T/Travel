
import React from 'react';

export default function EnrollmentStepsSection({ isRTL }) {
  const steps = [
    {
      num: "01",
      title: isRTL ? "اختيار الدورة" : "Choose Course",
      desc: isRTL ? "تصفح دوراتنا وحدد الدورة التي تناسب أهدافك." : "Browse our courses and select the one that fits your goals."
    },
    {
      num: "02",
      title: isRTL ? "اختبار تحديد المستوى" : "Placement Test",
      desc: isRTL ? "قم بإجراء اختبار مجاني لتحديد مستواك اللغوي الحالي." : "Take a free assessment to determine your current language level."
    },
    {
      num: "03",
      title: isRTL ? "تقديم المستندات" : "Submit Documents",
      desc: isRTL ? "قم بتحميل جواز السفر والسجلات الأكاديمية المطلوبة." : "Upload your passport and required academic transcripts."
    },
    {
      num: "04",
      title: isRTL ? "تأكيد التسجيل" : "Confirm Enrollment",
      desc: isRTL ? "ادفع الرسوم الدراسية واحصل على رسالة القبول." : "Pay tuition fees and receive your admission letter."
    }
  ];

  return (
    <div className="py-8">
      <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
        {isRTL ? 'خطوات التسجيل' : 'Enrollment Process'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-6 left-[12%] right-[12%] h-0.5 bg-border z-0" />
        
        {steps.map((step, idx) => (
          <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
            <div className="w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center text-primary font-bold text-lg mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-sm">
              {step.num}
            </div>
            <h4 className="font-bold text-foreground mb-2">{step.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-10 bg-secondary/10 border border-secondary/20 rounded-xl p-6 text-center max-w-2xl mx-auto">
        <p className="text-secondary-foreground font-medium">
          {isRTL 
            ? 'هل أنت جاهز للبدء؟ تواصل معنا اليوم لتحديد موعد اختبار المستوى مجاناً.' 
            : 'Ready to start? Contact us today to schedule your free placement test.'}
        </p>
      </div>
    </div>
  );
}
