
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function PricingTable({ pricing, isRTL }) {
  const scholarships = isRTL ? pricing.scholarships.ar : pricing.scholarships.en;
  const paymentPlans = isRTL ? pricing.payment_plans.ar : pricing.payment_plans.en;
  const refundPolicy = isRTL ? pricing.refund_policy.ar : pricing.refund_policy.en;

  const features = [
    { label: isRTL ? 'التسعير حسب المستوى' : 'Pricing by Level', value: pricing.by_level },
    { label: isRTL ? 'خصومات المجموعات' : 'Group Discounts', value: pricing.group_discounts },
    { label: isRTL ? 'خصومات التسجيل المبكر' : 'Early Bird Discounts', value: pricing.early_bird_discounts },
    { label: isRTL ? 'المنح الدراسية' : 'Scholarships', value: scholarships },
    { label: isRTL ? 'خطط الدفع' : 'Payment Plans', value: paymentPlans },
    { label: isRTL ? 'سياسة الاسترداد' : 'Refund Policy', value: refundPolicy }
  ];

  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
      <div className="bg-primary/5 p-6 border-b border-border">
        <h3 className="text-xl font-bold text-foreground">
          {isRTL ? 'معلومات الرسوم والدفع' : 'Tuition & Payment Information'}
        </h3>
        <p className="text-muted-foreground text-sm mt-1">
          {isRTL ? 'تفاصيل الرسوم الدراسية وخيارات الدفع المتاحة.' : 'Details on tuition fees and available payment options.'}
        </p>
      </div>
      <div className="p-0">
        {features.map((feat, idx) => (
          <div key={idx} className={`p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-2 md:gap-6 ${idx !== features.length - 1 ? 'border-b border-border' : ''} hover:bg-muted/50 transition-colors`}>
            <div className="flex items-center text-foreground font-semibold md:w-1/3 shrink-0">
              <CheckCircle2 className="w-5 h-5 text-primary mr-3 rtl:ml-3 rtl:mr-0 shrink-0" />
              {feat.label}
            </div>
            <div className="text-muted-foreground leading-relaxed md:w-2/3 md:pl-8 rtl:md:pl-0 rtl:md:pr-8">
              {feat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
