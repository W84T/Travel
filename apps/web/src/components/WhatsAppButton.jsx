
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { cn } from '@/lib/utils.js';

export default function WhatsAppButton({ 
  phoneNumber = "60123456789", 
  messageEn = "Hello, I would like to inquire about your services.",
  messageAr = "مرحباً، أود الاستفسار عن خدماتكم.",
  variant = 'floating' // 'floating' | 'inline'
}) {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  
  const text = isRTL ? "تحدث معنا على واتس آب" : "Chat with us on WhatsApp";
  const prefilledMessage = isRTL ? messageAr : messageEn;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(prefilledMessage)}`;

  if (variant === 'inline') {
    return (
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-[#25D366]/20"
      >
        <MessageCircle className="w-6 h-6" />
        {text}
      </a>
    );
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed z-50 bottom-6 md:bottom-8 flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-xl shadow-[#25D366]/30 transition-all duration-300 hover:scale-110 group",
        isRTL ? "left-6 md:left-8" : "right-6 md:right-8"
      )}
      aria-label={text}
    >
      <MessageCircle className="w-8 h-8" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out font-medium px-0 group-hover:px-2">
        {text}
      </span>
    </a>
  );
}
