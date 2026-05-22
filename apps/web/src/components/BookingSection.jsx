
import React, { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function BookingSection({ packageId, whatsappNumber = "1234567890", isRTL }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(isRTL ? 'تم إرسال طلبك بنجاح! سنتواصل معك قريباً.' : 'Request sent successfully! We will contact you soon.');
      e.target.reset();
    }, 1500);
  };

  const handleWhatsApp = () => {
    const message = isRTL 
      ? `مرحباً، أود الاستفسار عن البرنامج السياحي رقم: ${packageId}`
      : `Hello, I would like to inquire about travel package ID: ${packageId}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="py-16 mb-12">
      <Card className="bg-card border-border shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-5">
          {/* CTA Info */}
          <div className="lg:col-span-2 bg-primary text-primary-foreground p-8 lg:p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">
              {isRTL ? 'هل أنت مستعد للحجز؟' : 'Ready to Book?'}
            </h2>
            <p className="text-primary-foreground/90 mb-8 leading-relaxed">
              {isRTL 
                ? 'تواصل معنا الآن لتأكيد حجزك أو لتخصيص البرنامج حسب رغبتك. فريقنا متاح على مدار الساعة لخدمتك.' 
                : 'Contact us now to confirm your booking or customize the program to your liking. Our team is available 24/7.'}
            </p>
            
            <Button 
              onClick={handleWhatsApp}
              size="lg" 
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white border-none w-full rounded-xl h-14 text-lg font-bold shadow-lg transition-transform hover:scale-105"
            >
              <MessageCircle className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
              {isRTL ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}
            </Button>
          </div>
          
          {/* Form */}
          <div className="lg:col-span-3 p-8 lg:p-12">
            <h3 className="text-2xl font-bold mb-6 text-foreground">
              {isRTL ? 'أرسل طلب استفسار' : 'Send an Inquiry'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    {isRTL ? 'الاسم الكامل' : 'Full Name'}
                  </label>
                  <Input required className="h-12 bg-background text-foreground" placeholder={isRTL ? 'أدخل اسمك' : 'Enter your name'} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    {isRTL ? 'البريد الإلكتروني' : 'Email Address'}
                  </label>
                  <Input required type="email" className="h-12 bg-background text-foreground" placeholder="email@example.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {isRTL ? 'رقم الهاتف' : 'Phone Number'}
                </label>
                <Input required type="tel" className="h-12 bg-background text-foreground" placeholder={isRTL ? 'رقم الهاتف مع رمز الدولة' : 'Phone with country code'} />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {isRTL ? 'رسالتك (اختياري)' : 'Your Message (Optional)'}
                </label>
                <Textarea className="min-h-[120px] bg-background text-foreground" placeholder={isRTL ? 'أي تفاصيل إضافية أو طلبات خاصة...' : 'Any additional details or special requests...'} />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full md:w-auto h-12 px-8 rounded-xl text-base font-bold"
              >
                {isSubmitting ? (
                  <span className="opacity-80">{isRTL ? 'جاري الإرسال...' : 'Sending...'}</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                    {isRTL ? 'إرسال الطلب' : 'Submit Request'}
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </Card>
    </section>
  );
}
