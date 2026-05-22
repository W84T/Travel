
const baseUniversity = {
  mission: {
    en: "To advance knowledge and learning through quality research and education for the nation and for humanity.",
    ar: "تعزيز المعرفة والتعلم من خلال البحث والتعليم عالي الجودة من أجل الأمة والإنسانية."
  },
  vision: {
    en: "A global university impacting the world.",
    ar: "جامعة عالمية تؤثر في العالم."
  },
  accreditations: ["MQA", "AACSB", "EQUIS", "Washington Accord"],
  international_partnerships: ["MIT", "Oxford University", "National University of Singapore", "University of Melbourne"],
  programs: [
    {
      id: "p1",
      name: { en: "Bachelor of Computer Science", ar: "بكالوريوس في علوم الحاسوب" },
      category: "Engineering & Technology",
      degree_level: "Bachelor",
      duration: "3.5 Years",
      tuition_fee: "$15,000 / year",
      description: {
        en: "A comprehensive program covering software engineering, AI, and data science.",
        ar: "برنامج شامل يغطي هندسة البرمجيات والذكاء الاصطناعي وعلوم البيانات."
      },
      entry_requirements: {
        en: "High School Diploma with minimum CGPA 3.0, IELTS 6.0",
        ar: "شهادة الثانوية العامة بمعدل تراكمي لا يقل عن 3.0، آيلتس 6.0"
      }
    },
    {
      id: "p2",
      name: { en: "Master of Business Administration", ar: "ماجستير في إدارة الأعمال" },
      category: "Business & Management",
      degree_level: "Master",
      duration: "1.5 Years",
      tuition_fee: "$20,000 / total",
      description: {
        en: "Develop leadership and strategic management skills for the global market.",
        ar: "تطوير مهارات القيادة والإدارة الاستراتيجية للسوق العالمية."
      },
      entry_requirements: {
        en: "Bachelor's degree with minimum CGPA 3.0, IELTS 6.5, 2 years work experience",
        ar: "درجة البكالوريوس بمعدل تراكمي لا يقل عن 3.0، آيلتس 6.5، خبرة عمل سنتين"
      }
    }
  ],
  admission_requirements: {
    academic_requirements: {
      en: "Varies by program. Generally requires a recognized high school diploma or bachelor's degree with competitive grades.",
      ar: "يختلف حسب البرنامج. يتطلب عمومًا شهادة ثانوية عامة معترف بها أو درجة بكالوريوس بدرجات تنافسية."
    },
    language_requirements: {
      en: "IELTS 6.0 - 7.0 or TOEFL iBT 80 - 100 depending on the program.",
      ar: "آيلتس 6.0 - 7.0 أو توفل iBT 80 - 100 حسب البرنامج."
    },
    documents: {
      en: "Academic transcripts, passport copy, passport-sized photo, English proficiency certificate, recommendation letters.",
      ar: "السجلات الأكاديمية، نسخة من جواز السفر، صورة بحجم جواز السفر، شهادة إجادة اللغة الإنجليزية، رسائل توصية."
    },
    deadlines: "Fall: July 15 | Spring: November 15",
    application_process: {
      en: "1. Submit online application. 2. Pay application fee. 3. Upload documents. 4. Wait for offer letter. 5. Apply for student visa.",
      ar: "1. تقديم الطلب عبر الإنترنت. 2. دفع رسوم الطلب. 3. تحميل المستندات. 4. انتظار رسالة العرض. 5. التقدم بطلب للحصول على تأشيرة طالب."
    }
  },
  campus_facilities: [
    {
      name: { en: "Main Library", ar: "المكتبة الرئيسية" },
      description: { en: "State-of-the-art library with over 2 million resources.", ar: "مكتبة حديثة تضم أكثر من 2 مليون مصدر." },
      images: ["https://images.unsplash.com/photo-1541339907198-e08756dedf3f"]
    },
    {
      name: { en: "Sports Complex", ar: "المجمع الرياضي" },
      description: { en: "Olympic-sized pool, gym, and indoor courts.", ar: "مسبح أولمبي وصالة ألعاب رياضية وملاعب داخلية." },
      images: ["https://images.unsplash.com/photo-1534438327276-14e5300c3a48"]
    }
  ],
  student_life: {
    clubs: { en: "Over 100 student clubs and societies.", ar: "أكثر من 100 نادي وجمعية طلابية." },
    sports: { en: "Varsity teams in football, basketball, badminton, and more.", ar: "فرق جامعية في كرة القدم وكرة السلة وتنس الريشة وغيرها." },
    activities: { en: "Annual cultural festivals, hackathons, and leadership camps.", ar: "مهرجانات ثقافية سنوية، هاكاثون، ومخيمات قيادية." },
    support_services: { en: "Counseling, career guidance, and international student support.", ar: "الاستشارة والتوجيه المهني ودعم الطلاب الدوليين." },
    accommodation_options: { en: "On-campus residential colleges and off-campus apartments.", ar: "كليات سكنية داخل الحرم الجامعي وشقق خارج الحرم الجامعي." }
  },
  tuition_fees: {
    by_program_level: "Undergraduate: $10k-$20k/yr | Postgraduate: $12k-$25k/yr",
    application_fee: "$50 - $100",
    accommodation_cost: "$200 - $500 / month",
    living_expenses: "$300 - $600 / month",
    scholarships: {
      en: "Merit-based scholarships up to 100% tuition waiver available for international students.",
      ar: "منح دراسية قائمة على الجدارة تصل إلى إعفاء بنسبة 100٪ من الرسوم الدراسية متاحة للطلاب الدوليين."
    }
  },
  contact: {
    phone: "+60 3-1234 5678",
    email: "admissions@university.edu.my",
    address: {
      en: "University Campus, Kuala Lumpur, Malaysia",
      ar: "الحرم الجامعي، كوالالمبور، ماليزيا"
    },
    website: "https://www.university.edu.my",
    social_media: {
      facebook: "#",
      twitter: "#",
      instagram: "#"
    }
  }
};

const universityNames = [
  { en: "University of Malaya (UM)", ar: "جامعة مالايا", city: "Kuala Lumpur", type: "Public", rank: 65 },
  { en: "Universiti Teknologi Malaysia (UTM)", ar: "جامعة التكنولوجيا الماليزية", city: "Johor Bahru", type: "Public", rank: 188 },
  { en: "Universiti Kebangsaan Malaysia (UKM)", ar: "جامعة ماليزيا الوطنية", city: "Bangi", type: "Public", rank: 159 },
  { en: "Universiti Putra Malaysia (UPM)", ar: "جامعة بوترا ماليزيا", city: "Serdang", type: "Public", rank: 158 },
  { en: "Universiti Sains Malaysia (USM)", ar: "جامعة العلوم الماليزية", city: "Penang", type: "Public", rank: 137 },
  { en: "PETRONAS Technological University (UTP)", ar: "جامعة بتروناس التكنولوجية", city: "Perak", type: "Private", rank: 307 },
  { en: "Universiti Tunku Abdul Rahman (UTAR)", ar: "جامعة تونكو عبد الرحمن", city: "Kampar", type: "Private", rank: 801 },
  { en: "Monash University Malaysia", ar: "جامعة موناش ماليزيا", city: "Subang Jaya", type: "International", rank: 42 },
  { en: "Taylor's University", ar: "جامعة تايلورز", city: "Subang Jaya", type: "Private", rank: 284 },
  { en: "Sunway University", ar: "جامعة صنواي", city: "Subang Jaya", type: "Private", rank: 586 },
  { en: "HELP University", ar: "جامعة هيلب", city: "Kuala Lumpur", type: "Private", rank: 1200 },
  { en: "University of Nottingham Malaysia", ar: "جامعة نوتنغهام ماليزيا", city: "Semenyih", type: "International", rank: 100 },
  { en: "Multimedia University (MMU)", ar: "جامعة الوسائط المتعددة", city: "Cyberjaya", type: "Private", rank: 1001 },
  { en: "Limkokwing University", ar: "جامعة ليمكوكوينج", city: "Cyberjaya", type: "Private", rank: 1200 },
  { en: "UCSI University", ar: "جامعة يو سي إس آي", city: "Kuala Lumpur", type: "Private", rank: 300 }
];

const images = [
  "https://images.unsplash.com/photo-1562774053-701939374585",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
  "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a",
  "https://images.unsplash.com/photo-1592280771190-3e2e4d571952"
];

export const universitiesData = universityNames.map((uni, index) => ({
  id: `uni-${index + 1}`,
  name: { en: uni.en, ar: uni.ar },
  description: {
    en: `A premier ${uni.type.toLowerCase()} university located in ${uni.city}, offering world-class education and research opportunities.`,
    ar: `جامعة ${uni.type === 'Public' ? 'حكومية' : uni.type === 'Private' ? 'خاصة' : 'دولية'} رائدة تقع في ${uni.city}، تقدم تعليمًا وفرص بحث عالمية المستوى.`
  },
  location: "Malaysia",
  city: uni.city,
  type: uni.type,
  founded_year: 1900 + (index * 5),
  world_ranking: uni.rank,
  total_students: 15000 + (index * 1000),
  total_faculty: 1000 + (index * 100),
  logo_image: "https://ui-avatars.com/api/?name=" + encodeURIComponent(uni.en) + "&background=0D8ABC&color=fff&size=256",
  banner_image: images[index % images.length],
  ...baseUniversity
}));
