
const centerNames = [
  { id: "lc-1", en: "ELS Language Centers Malaysia", ar: "مراكز إي إل إس للغات ماليزيا", type: "International", city: "Kuala Lumpur" },
  { id: "lc-2", en: "British Council Malaysia", ar: "المجلس الثقافي البريطاني ماليزيا", type: "International", city: "Kuala Lumpur" },
  { id: "lc-3", en: "Berlitz Malaysia", ar: "بيرليتز ماليزيا", type: "Private", city: "Petaling Jaya" },
  { id: "lc-4", en: "Wall Street English Malaysia", ar: "وول ستريت إنجلش ماليزيا", type: "Private", city: "Penang" },
  { id: "lc-5", en: "Inlingua Malaysia", ar: "إنلينغوا ماليزيا", type: "Private", city: "Kuala Lumpur" },
  { id: "lc-6", en: "HELP University Language Center", ar: "مركز لغات جامعة هيلب", type: "University-affiliated", city: "Subang" },
  { id: "lc-7", en: "Taylor's University Language Center", ar: "مركز لغات جامعة تايلورز", type: "University-affiliated", city: "Subang" },
  { id: "lc-8", en: "Sunway University Language Center", ar: "مركز لغات جامعة صنواي", type: "University-affiliated", city: "Petaling Jaya" },
  { id: "lc-9", en: "UCSI University Language Center", ar: "مركز لغات جامعة يو سي إس آي", type: "University-affiliated", city: "Kuala Lumpur" },
  { id: "lc-10", en: "Kuala Lumpur Language Center", ar: "مركز كوالالمبور للغات", type: "Private", city: "Johor" }
];

const bannerImages = [
  "https://images.unsplash.com/photo-1596395491836-52690fcac41b",
  "https://images.unsplash.com/photo-1685159375835-e987def57d25",
  "https://images.unsplash.com/photo-1679316481049-4f6549df499f",
  "https://images.unsplash.com/photo-1632466722833-568a49d7b1f7",
  "https://images.unsplash.com/photo-1680634659459-2aa85412fffd"
];

const facilityImages = [
  "https://images.unsplash.com/photo-1695133139074-d0ab15d6d7da",
  "https://images.unsplash.com/photo-1521939708078-d6498bb62747",
  "https://images.unsplash.com/photo-1679316481049-4f6549df499f"
];

const studentImages = [
  "https://images.unsplash.com/photo-1658161587858-d4814b7c9591",
  "https://images.unsplash.com/photo-1669980126870-f2fd706e7cde"
];

const baseCenterData = {
  mission: {
    en: "To empower individuals through world-class language education, fostering global communication and cultural understanding.",
    ar: "تمكين الأفراد من خلال تعليم لغوي عالمي المستوى، وتعزيز التواصل العالمي والتفاهم الثقافي."
  },
  vision: {
    en: "To be the leading language institute recognized globally for excellence in teaching and student success.",
    ar: "أن نكون معهد اللغات الرائد المعترف به عالميًا لتميزه في التدريس ونجاح الطلاب."
  },
  teaching_methodology: {
    en: "Immersive, communicative approach emphasizing practical conversation, cultural nuances, and interactive learning.",
    ar: "نهج تواصلي غامر يركز على المحادثة العملية والفروق الثقافية الدقيقة والتعلم التفاعلي."
  },
  accreditations: ["NEAS", "British Council Accredited", "Ministry of Education Malaysia"],
  languages_offered: [
    { name: "English", icon: "Speech" },
    { name: "Mandarin", icon: "MessageSquare" },
    { name: "Arabic", icon: "Globe" },
    { name: "Japanese", icon: "MessageCircle" }
  ],
  pricing: {
    price_range: "Mid-range",
    by_level: "RM 1,500 - RM 3,500 per term",
    group_discounts: "15% off for groups of 3 or more",
    early_bird_discounts: "10% off when registering 30 days in advance",
    scholarships: {
      en: "Merit-based scholarships available for high-achieving university preparation students.",
      ar: "منح دراسية قائمة على الجدارة متاحة للطلاب المتفوقين في الإعداد الجامعي."
    },
    payment_plans: {
      en: "Flexible 3-month installment plans available for intensive courses.",
      ar: "خطط تقسيط مرنة لمدة 3 أشهر متاحة للدورات المكثفة."
    },
    refund_policy: {
      en: "Full refund up to 7 days before course start. 50% refund within first week.",
      ar: "استرداد كامل حتى 7 أيام قبل بدء الدورة. استرداد بنسبة 50٪ خلال الأسبوع الأول."
    }
  },
  courses: [
    {
      id: "c-1",
      name: { en: "Intensive English Program", ar: "برنامج اللغة الإنجليزية المكثف" },
      language: "English",
      level: "All Levels (A1-C1)",
      duration: "4 Weeks / Level",
      schedule_type: "Full-time",
      class_size: "10-15 students",
      tuition_fee: "RM 2,500",
      certification: "IELTS Preparation",
      description: {
        en: "Comprehensive language program focusing on reading, writing, listening, and speaking.",
        ar: "برنامج لغوي شامل يركز على القراءة والكتابة والاستماع والتحدث."
      },
      curriculum: {
        en: "Module 1: Grammar & Vocabulary, Module 2: Conversational Fluency, Module 3: Academic Writing.",
        ar: "الوحدة 1: القواعد والمفردات، الوحدة 2: الطلاقة في المحادثة، الوحدة 3: الكتابة الأكاديمية."
      },
      learning_outcomes: {
        en: "Achieve native-like fluency, pass international certification exams.",
        ar: "تحقيق طلاقة تشبه طلاقة الناطقين بها، واجتياز امتحانات الشهادات الدولية."
      },
      prerequisites: {
        en: "Placement test required.",
        ar: "مطلوب اختبار تحديد المستوى."
      },
      schedule_times: "Mon - Fri, 9:00 AM - 1:00 PM"
    },
    {
      id: "c-2",
      name: { en: "Business Mandarin", ar: "لغة الماندرين للأعمال" },
      language: "Mandarin",
      level: "Intermediate to Advanced",
      duration: "8 Weeks",
      schedule_type: "Part-time (Evening)",
      class_size: "8-12 students",
      tuition_fee: "RM 1,800",
      certification: "HSK Level 3+",
      description: {
        en: "Tailored for professionals aiming to negotiate and communicate effectively in Chinese business environments.",
        ar: "مصمم للمحترفين الذين يهدفون إلى التفاوض والتواصل الفعال في بيئات الأعمال الصينية."
      },
      curriculum: {
        en: "Corporate communication, email writing, negotiation tactics.",
        ar: "اتصالات الشركات، كتابة رسائل البريد الإلكتروني، تكتيكات التفاوض."
      },
      learning_outcomes: {
        en: "Conduct business meetings and presentations in Mandarin.",
        ar: "عقد اجتماعات وعروض تقديمية للأعمال بلغة الماندرين."
      },
      prerequisites: {
        en: "Basic Mandarin knowledge (HSK 2).",
        ar: "معرفة أساسية بلغة الماندرين (HSK 2)."
      },
      schedule_times: "Tue & Thu, 7:00 PM - 9:00 PM"
    }
  ],
  instructors: [
    {
      id: "i-1",
      name: "Sarah Williams",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
      qualifications: "MA in TESOL",
      languages: "English, French",
      experience_years: 12,
      specializations: "IELTS Preparation, Academic English",
      bio: {
        en: "Sarah brings over a decade of international teaching experience, specializing in preparing students for higher education.",
        ar: "تتمتع سارة بأكثر من عقد من الخبرة في التدريس الدولي، متخصصة في إعداد الطلاب للتعليم العالي."
      }
    },
    {
      id: "i-2",
      name: "Chen Wei",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      qualifications: "PhD in Linguistics",
      languages: "Mandarin, English",
      experience_years: 8,
      specializations: "Business Mandarin, HSK Prep",
      bio: {
        en: "Dr. Chen is an expert in applied linguistics with a passion for corporate language training.",
        ar: "الدكتور تشين خبير في اللغويات التطبيقية مع شغف بالتدريب اللغوي للشركات."
      }
    }
  ],
  facilities: [
    {
      name: { en: "Multimedia Language Labs", ar: "مختبرات اللغات متعددة الوسائط" },
      description: { en: "State-of-the-art computer labs with interactive language software.", ar: "مختبرات كمبيوتر حديثة مع برامج لغوية تفاعلية." },
      images: [facilityImages[0]]
    },
    {
      name: { en: "Student Lounge & Café", ar: "استراحة الطلاب والمقهى" },
      description: { en: "A comfortable space for cultural exchange and practice.", ar: "مساحة مريحة للتبادل الثقافي والممارسة." },
      images: [facilityImages[1]]
    }
  ],
  testimonials: [
    {
      student_name: "Ahmed Al-Farsi",
      rating: 5,
      photo: studentImages[0],
      course_taken: "Intensive English Program",
      text: {
        en: "The teachers here are incredibly supportive. I improved my IELTS score from 5.5 to 7.0 in just 3 months!",
        ar: "المعلمون هنا داعمون بشكل لا يصدق. لقد قمت بتحسين درجة الآيلتس الخاصة بي من 5.5 إلى 7.0 في 3 أشهر فقط!"
      }
    },
    {
      student_name: "Mei Ling",
      rating: 4,
      photo: studentImages[1],
      course_taken: "Business Mandarin",
      text: {
        en: "Great environment and practical lessons that I could immediately apply at my workplace.",
        ar: "بيئة رائعة ودروس عملية تمكنت من تطبيقها فوراً في مكان عملي."
      }
    }
  ],
  schedule: {
    start_dates: "New intakes every first Monday of the month.",
    class_schedule_options: "Morning, Afternoon, Evening, and Weekend batches available."
  },
  contact: {
    phone: "+60 3-1234 5678",
    email: "admissions@languagecenter.edu.my",
    address: {
      en: "123 Education Boulevard, Malaysia",
      ar: "123 شارع التعليم، ماليزيا"
    },
    website: "https://www.languagecenter.edu.my",
    office_hours: "Mon - Fri, 8:00 AM - 6:00 PM"
  }
};

export const languageCentersData = centerNames.map((center, index) => {
  const isPremium = index % 3 === 0;
  const priceRange = isPremium ? "Premium" : index % 2 === 0 ? "Mid-range" : "Budget";
  const startPrice = isPremium ? 2500 : index % 2 === 0 ? 1500 : 800;

  return {
    ...baseCenterData,
    id: center.id,
    name: { en: center.en, ar: center.ar },
    description: {
      en: `A premier ${center.type.toLowerCase()} language center located in ${center.city}, offering comprehensive language courses to students globally.`,
      ar: `مركز لغات ${center.type === 'Private' ? 'خاص' : center.type === 'International' ? 'دولي' : 'تابع لجامعة'} رائد يقع في ${center.city}، يقدم دورات لغوية شاملة للطلاب عالميًا.`
    },
    location: "Malaysia",
    city: center.city,
    type: center.type,
    founded_year: 1990 + index * 2,
    total_students: 500 + index * 150,
    total_instructors: 20 + index * 5,
    rating: (4.2 + (index % 5) * 0.1).toFixed(1),
    reviews_count: 120 + index * 45,
    logo_image: `https://ui-avatars.com/api/?name=${encodeURIComponent(center.en)}&background=1e40af&color=fff&size=256`,
    banner_image: bannerImages[index % bannerImages.length],
    pricing: {
      ...baseCenterData.pricing,
      price_range: priceRange,
      by_level: `RM ${startPrice} - RM ${startPrice + 1500} per term`
    },
    startPrice
  };
});
