
import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import pb from '@/lib/pocketbaseClient.js';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Send } from 'lucide-react';

export default function ContactFormComponent() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Translations
  const t = {
    fullName: isRTL ? "الاسم الكامل" : "Full Name",
    email: isRTL ? "البريد الإلكتروني" : "Email Address",
    phone: isRTL ? "رقم الهاتف" : "Phone Number",
    subject: isRTL ? "الموضوع" : "Subject",
    subjectPlaceholder: isRTL ? "اختر الموضوع..." : "Select a subject...",
    message: isRTL ? "رسالتك" : "Your Message",
    messagePlaceholder: isRTL ? "اكتب رسالتك هنا..." : "Write your message here...",
    preferredMethod: isRTL ? "طريقة التواصل المفضلة" : "Preferred Contact Method",
    methodEmail: isRTL ? "البريد الإلكتروني" : "Email",
    methodPhone: isRTL ? "الهاتف" : "Phone",
    methodWhatsapp: isRTL ? "واتس آب" : "WhatsApp",
    privacyText: isRTL ? "أوافق على سياسة الخصوصية وشروط الخدمة" : "I agree to the Privacy Policy and Terms of Service",
    submitBtn: isRTL ? "إرسال الرسالة" : "Send Message",
    successMsg: isRTL ? "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً." : "Your message has been sent successfully! We will contact you soon.",
    errorMsg: isRTL ? "حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى." : "An error occurred while sending your message. Please try again.",
    
    // Subjects
    subjGeneral: isRTL ? "استفسار عام" : "General Inquiry",
    subjTravel: isRTL ? "حجز رحلة سفر" : "Travel Booking",
    subjUni: isRTL ? "التحاق بجامعة" : "University Enrollment",
    subjLang: isRTL ? "دورة لغة" : "Language Course",
    subjComplaint: isRTL ? "شكوى أو اقتراح" : "Complaint or Suggestion",
  };

  // Validation Schema based on language
  const formSchema = useMemo(() => z.object({
    name: z.string().min(2, { message: isRTL ? "الاسم مطلوب" : "Name is required" }),
    email: z.string().email({ message: isRTL ? "بريد إلكتروني غير صالح" : "Invalid email address" }),
    phone: z.string().min(8, { message: isRTL ? "رقم الهاتف مطلوب" : "Phone number is required" }),
    subject: z.string({ required_error: isRTL ? "يرجى اختيار موضوع" : "Please select a subject" }),
    message: z.string().min(10, { message: isRTL ? "الرسالة قصيرة جداً" : "Message is too short" }),
    preferred_contact_method: z.enum(["email", "phone", "whatsapp"], {
      required_error: isRTL ? "يرجى اختيار طريقة التواصل" : "Please select a contact method",
    }),
    privacy_policy: z.boolean().refine(val => val === true, {
      message: isRTL ? "يجب الموافقة على سياسة الخصوصية" : "You must agree to the privacy policy"
    })
  }), [isRTL]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      preferred_contact_method: "email",
      privacy_policy: false,
    },
  });

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      // Exclude privacy_policy from the payload to DB
      const { privacy_policy, ...submissionData } = values;
      
      const record = await pb.collection('contact_submissions').create({
        ...submissionData,
        language: language,
        status: 'new',
      }, { $autoCancel: false });
      
      if(record) {
        toast.success(t.successMsg);
        form.reset();
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(t.errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card rounded-2xl shadow-xl border border-border/40 p-6 md:p-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">{t.fullName}</FormLabel>
                  <FormControl>
                    <Input placeholder={t.fullName} {...field} className="bg-background text-foreground" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">{t.email}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="example@domain.com" {...field} className="bg-background text-foreground text-left" dir="ltr" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">{t.phone}</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+60 12-345-6789" {...field} className="bg-background text-foreground text-left" dir="ltr" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">{t.subject}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} dir={isRTL ? "rtl" : "ltr"}>
                    <FormControl>
                      <SelectTrigger className="bg-background text-foreground">
                        <SelectValue placeholder={t.subjectPlaceholder} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="general_inquiry">{t.subjGeneral}</SelectItem>
                      <SelectItem value="travel_booking">{t.subjTravel}</SelectItem>
                      <SelectItem value="university_enrollment">{t.subjUni}</SelectItem>
                      <SelectItem value="language_course">{t.subjLang}</SelectItem>
                      <SelectItem value="complaint_suggestion">{t.subjComplaint}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">{t.message}</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder={t.messagePlaceholder} 
                    className="min-h-[150px] resize-y bg-background text-foreground" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferred_contact_method"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-foreground">{t.preferredMethod}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-6 rtl:space-x-reverse"
                    dir={isRTL ? "rtl" : "ltr"}
                  >
                    <FormItem className="flex items-center space-x-2 rtl:space-x-reverse space-y-0">
                      <FormControl>
                        <RadioGroupItem value="email" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer text-foreground">
                        {t.methodEmail}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 rtl:space-x-reverse space-y-0">
                      <FormControl>
                        <RadioGroupItem value="phone" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer text-foreground">
                        {t.methodPhone}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 rtl:space-x-reverse space-y-0">
                      <FormControl>
                        <RadioGroupItem value="whatsapp" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer text-foreground">
                        {t.methodWhatsapp}
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="privacy_policy"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 rtl:space-x-reverse space-y-0 rounded-md border border-border/50 p-4 bg-muted/20">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="cursor-pointer text-foreground">
                    {t.privacyText}
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full sm:w-auto h-12 px-8 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 rtl:ml-2 rtl:mr-0 h-5 w-5 animate-spin" />
                {isRTL ? "جاري الإرسال..." : "Sending..."}
              </>
            ) : (
              <>
                <Send className="mr-2 rtl:ml-2 rtl:mr-0 h-5 w-5" />
                {t.submitBtn}
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
