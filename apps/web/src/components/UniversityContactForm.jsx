
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

export default function UniversityContactForm({ isRTL }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    name: z.string().min(2, isRTL ? 'الاسم مطلوب' : 'Name is required'),
    email: z.string().email(isRTL ? 'بريد إلكتروني غير صالح' : 'Invalid email address'),
    phone: z.string().min(5, isRTL ? 'رقم الهاتف مطلوب' : 'Phone number is required'),
    subject: z.string().min(2, isRTL ? 'الموضوع مطلوب' : 'Subject is required'),
    message: z.string().min(10, isRTL ? 'الرسالة قصيرة جداً' : 'Message is too short')
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    toast.success(isRTL ? 'تم إرسال رسالتك بنجاح!' : 'Your message has been sent successfully!');
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{isRTL ? 'الاسم الكامل' : 'Full Name'}</FormLabel>
                <FormControl>
                  <Input placeholder={isRTL ? 'أدخل اسمك' : 'Enter your name'} {...field} className="bg-background" />
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
                <FormLabel>{isRTL ? 'البريد الإلكتروني' : 'Email Address'}</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email@example.com" {...field} className="bg-background" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{isRTL ? 'رقم الهاتف' : 'Phone Number'}</FormLabel>
                <FormControl>
                  <Input placeholder="+60 12 345 6789" {...field} className="bg-background" />
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
                <FormLabel>{isRTL ? 'الموضوع' : 'Subject'}</FormLabel>
                <FormControl>
                  <Input placeholder={isRTL ? 'موضوع الاستفسار' : 'Inquiry subject'} {...field} className="bg-background" />
                </FormControl>
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
              <FormLabel>{isRTL ? 'الرسالة' : 'Message'}</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={isRTL ? 'اكتب رسالتك هنا...' : 'Write your message here...'} 
                  className="min-h-[120px] bg-background" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
          {isSubmitting ? (
            isRTL ? 'جاري الإرسال...' : 'Sending...'
          ) : (
            <>
              <Send className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
              {isRTL ? 'إرسال الرسالة' : 'Send Message'}
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
