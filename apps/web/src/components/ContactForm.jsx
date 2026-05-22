
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Send, MessageSquare } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ContactForm({ isRTL, centerName }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    name: z.string().min(2, isRTL ? 'الاسم مطلوب' : 'Name is required'),
    email: z.string().email(isRTL ? 'بريد إلكتروني غير صالح' : 'Invalid email address'),
    phone: z.string().min(5, isRTL ? 'رقم الهاتف مطلوب' : 'Phone number is required'),
    courseInterest: z.string().min(1, isRTL ? 'يرجى اختيار دورة' : 'Please select a course'),
    contactMethod: z.string().min(1, isRTL ? 'طريقة التواصل مطلوبة' : 'Contact method required'),
    message: z.string().min(10, isRTL ? 'الرسالة قصيرة جداً' : 'Message is too short')
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '', email: '', phone: '', courseInterest: '', contactMethod: 'email', message: ''
    }
  });

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    // Simulate API submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store in localStorage
    const submissions = JSON.parse(localStorage.getItem('center_inquiries') || '[]');
    submissions.push({ ...values, centerName, date: new Date().toISOString() });
    localStorage.setItem('center_inquiries', JSON.stringify(submissions));

    setIsSubmitting(false);
    toast.success(isRTL ? 'تم إرسال استفسارك بنجاح!' : 'Your inquiry has been sent successfully!');
    form.reset();
  };

  const handleWhatsApp = () => {
    const text = isRTL 
      ? `مرحباً، أود الاستفسار عن الدورات في ${centerName}`
      : `Hello, I would like to inquire about courses at ${centerName}`;
    window.open(`https://wa.me/60123456789?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>{isRTL ? 'الاسم الكامل' : 'Full Name'}</FormLabel>
                <FormControl><Input placeholder={isRTL ? 'اسمك' : 'Your name'} {...field} className="bg-background" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>{isRTL ? 'البريد الإلكتروني' : 'Email Address'}</FormLabel>
                <FormControl><Input type="email" placeholder="email@example.com" {...field} className="bg-background" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem>
                <FormLabel>{isRTL ? 'رقم الهاتف' : 'Phone Number'}</FormLabel>
                <FormControl><Input placeholder="+60 12 345 6789" {...field} className="bg-background" dir="ltr" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="courseInterest" render={({ field }) => (
              <FormItem>
                <FormLabel>{isRTL ? 'الدورة المهتم بها' : 'Course Interest'}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger className="bg-background"><SelectValue placeholder={isRTL ? 'اختر الدورة' : 'Select a course'} /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="english">{isRTL ? 'اللغة الإنجليزية' : 'English'}</SelectItem>
                    <SelectItem value="mandarin">{isRTL ? 'لغة الماندرين' : 'Mandarin'}</SelectItem>
                    <SelectItem value="other">{isRTL ? 'أخرى' : 'Other'}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <FormField control={form.control} name="message" render={({ field }) => (
            <FormItem>
              <FormLabel>{isRTL ? 'رسالتك' : 'Your Message'}</FormLabel>
              <FormControl><Textarea placeholder={isRTL ? 'كيف يمكننا مساعدتك؟' : 'How can we help you?'} className="min-h-[100px] bg-background" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-medium" disabled={isSubmitting}>
            {isSubmitting ? (isRTL ? 'جاري الإرسال...' : 'Sending...') : (
              <><Send className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />{isRTL ? 'إرسال الاستفسار' : 'Send Inquiry'}</>
            )}
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
        <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">{isRTL ? 'أو' : 'OR'}</span></div>
      </div>

      <Button type="button" variant="outline" onClick={handleWhatsApp} className="w-full border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 font-medium">
        <MessageSquare className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
        {isRTL ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}
      </Button>
    </div>
  );
}
