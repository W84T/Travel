
import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { cn } from '@/lib/utils.js';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    id: "faq-1",
    questionEn: "How do I book a travel plan?",
    questionAr: "كيف يمكنني حجز خطة سفر؟",
    answerEn: "You can book a travel plan directly through our website by browsing the 'Travel Plans' section, selecting your preferred package, and filling out the booking request form. Our team will contact you within 24 hours to confirm.",
    answerAr: "يمكنك حجز خطة سفر مباشرة عبر موقعنا من خلال تصفح قسم 'خطط السفر'، واختيار الباقة المفضلة لديك، ثم ملء نموذج طلب الحجز. سيقوم فريقنا بالتواصل معك خلال 24 ساعة للتأكيد."
  },
  {
    id: "faq-2",
    questionEn: "What are the cancellation terms?",
    questionAr: "ما هي شروط الإلغاء؟",
    answerEn: "Cancellations made 30 days prior to the start date will receive a full refund minus a 10% processing fee. Cancellations within 14-29 days receive a 50% refund. Cancellations less than 14 days before the start date are non-refundable.",
    answerAr: "عمليات الإلغاء التي تتم قبل 30 يوماً من تاريخ البدء ستسترد كامل المبلغ ناقصاً 10% رسوم معالجة. الإلغاء خلال 14-29 يوماً يسترد 50%. الإلغاء قبل أقل من 14 يوماً من تاريخ البدء غير قابل للاسترداد."
  },
  {
    id: "faq-3",
    questionEn: "Do you provide visa assistance?",
    questionAr: "هل تقدمون المساعدة في استخراج التأشيرة؟",
    answerEn: "Yes, we provide comprehensive visa assistance for both tourists and students. Once you book a package or enroll in a university/language center, our visa specialists will guide you through the entire process.",
    answerAr: "نعم، نقدم مساعدة شاملة في استخراج التأشيرات للسياح والطلاب. بمجرد حجز باقة أو التسجيل في جامعة/مركز لغات، سيقوم أخصائيو التأشيرات لدينا بإرشادك خلال العملية بأكملها."
  },
  {
    id: "faq-4",
    questionEn: "How do I apply for university enrollment?",
    questionAr: "كيف أتقدم بطلب للالتحاق بالجامعة؟",
    answerEn: "Visit the 'Universities' section, select your desired institution, and complete the enrollment form. We require your high school transcripts, passport copy, and English proficiency test results (if applicable).",
    answerAr: "قم بزيارة قسم 'الجامعات'، واختر المؤسسة المطلوبة، وأكمل نموذج التسجيل. سنحتاج إلى شهادة الثانوية العامة، ونسخة من جواز السفر، ونتائج اختبار إجادة اللغة الإنجليزية (إن وجدت)."
  },
  {
    id: "faq-5",
    questionEn: "Are there group discounts available?",
    questionAr: "هل توجد خصومات للمجموعات؟",
    answerEn: "Yes, we offer special rates for groups of 5 or more people. Please contact our support team with your group details, and we will prepare a customized quotation with the discounted rates.",
    answerAr: "نعم، نقدم أسعاراً خاصة للمجموعات المكونة من 5 أشخاص أو أكثر. يرجى التواصل مع فريق الدعم بتفاصيل مجموعتك، وسنقوم بإعداد عرض أسعار مخصص يتضمن الخصومات."
  },
  {
    id: "faq-6",
    questionEn: "What payment methods do you accept?",
    questionAr: "ما هي طرق الدفع التي تقبلونها؟",
    answerEn: "We accept all major credit/debit cards (Visa, Mastercard), international bank transfers, and PayPal. For local students in Malaysia, we also accept FPX and local bank transfers.",
    answerAr: "نقبل جميع بطاقات الائتمان/الخصم الرئيسية (فيزا، ماستركارد)، والتحويلات المصرفية الدولية، وباي بال. للطلاب المحليين في ماليزيا، نقبل أيضاً تحويلات FPX والتحويلات البنكية المحلية."
  }
];

export default function FAQAccordion() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqs;
    const query = searchQuery.toLowerCase();
    return faqs.filter(faq => 
      faq.questionEn.toLowerCase().includes(query) ||
      faq.questionAr.toLowerCase().includes(query) ||
      faq.answerEn.toLowerCase().includes(query) ||
      faq.answerAr.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const t = {
    searchPlaceholder: isRTL ? "ابحث في الأسئلة الشائعة..." : "Search FAQs...",
    noResults: isRTL ? "لم يتم العثور على نتائج تطابق بحثك." : "No results found matching your search."
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative mb-8">
        <Search className={cn("absolute top-3 w-5 h-5 text-muted-foreground", isRTL ? "right-4" : "left-4")} />
        <Input 
          type="text"
          placeholder={t.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={cn("h-12 pl-12 pr-4 bg-card text-foreground text-lg rounded-xl shadow-sm border-border/50 focus-visible:ring-primary", isRTL && "pr-12 pl-4")}
        />
      </div>

      {filteredFaqs.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-xl">
          {t.noResults}
        </div>
      ) : (
        <Accordion type="single" collapsible className="w-full bg-card rounded-2xl shadow-sm border border-border/50 px-6">
          {filteredFaqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="border-border/50 py-2">
              <AccordionTrigger className="text-right hover:no-underline hover:text-primary transition-colors py-4 font-semibold text-lg text-foreground text-start rtl:text-right">
                {isRTL ? faq.questionAr : faq.questionEn}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6 pt-2 text-start rtl:text-right">
                {isRTL ? faq.answerAr : faq.answerEn}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
