
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MapPin, Star, Users, BookOpen, Clock, CheckCircle2, Phone, Mail, Globe, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { useLanguageCenters } from '@/hooks/useLanguageCenters.js';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

// Subcomponents imports
import CourseDetailsModal from '@/components/CourseDetailsModal.jsx';
import InstructorCard from '@/components/InstructorCard.jsx';
import FacilityCard from '@/components/FacilityCard.jsx';
import TestimonialCard from '@/components/TestimonialCard.jsx';
import PricingTable from '@/components/PricingTable.jsx';
import EnrollmentStepsSection from '@/components/EnrollmentStepsSection.jsx';
import ContactForm from '@/components/ContactForm.jsx';
import LanguageCenterCard from '@/components/LanguageCenterCard.jsx';

export default function LanguageCenterDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  
  const { getById, getRelatedCenters, loading } = useLanguageCenters();
  const [center, setCenter] = useState(null);
  const [relatedCenters, setRelatedCenters] = useState([]);
  
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseModalOpen, setCourseModalOpen] = useState(false);

  useEffect(() => {
    if (!loading) {
      const data = getById(id);
      setCenter(data);
      if (data) {
        setRelatedCenters(getRelatedCenters(id, 3));
      }
    }
    window.scrollTo(0, 0);
  }, [id, loading, getById, getRelatedCenters]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Skeleton className="w-full h-[50vh]" />
        <div className="container mx-auto px-4 py-12 space-y-8">
          <Skeleton className="w-1/3 h-10" />
          <Skeleton className="w-full h-96 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!center) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center px-4">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          {isRTL ? 'المركز غير موجود' : 'Center not found'}
        </h2>
        <Button onClick={() => navigate('/language-centers')} variant="outline">
          {isRTL ? 'العودة للقائمة' : 'Back to List'}
        </Button>
      </div>
    );
  }

  const name = isRTL ? center.name.ar : center.name.en;
  const description = isRTL ? center.description.ar : center.description.en;
  const mission = isRTL ? center.mission.ar : center.mission.en;
  const vision = isRTL ? center.vision.ar : center.vision.en;
  const teachingMethodology = isRTL ? center.teaching_methodology.ar : center.teaching_methodology.en;

  const handleOpenCourse = (course) => {
    setSelectedCourse(course);
    setCourseModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="relative h-[55vh] min-h-[450px] flex flex-col justify-end pb-12">
        <div className="absolute inset-0 z-0">
          <img 
            src={center.banner_image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-black/30" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/language-centers')}
            className="mb-8 text-foreground/80 hover:text-foreground bg-background/30 backdrop-blur-md rounded-full px-4"
          >
            {isRTL ? <ArrowRight className="w-4 h-4 ml-2" /> : <ArrowLeft className="w-4 h-4 mr-2" />}
            {isRTL ? 'العودة للمراكز' : 'Back to Centers'}
          </Button>

          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-end">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-white p-2 shadow-2xl shrink-0 border border-border">
              <img src={center.logo_image} alt="Logo" className="w-full h-full object-contain rounded-xl" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm py-1 border-none shadow-sm">
                  {center.type}
                </Badge>
                <div className="flex items-center gap-1 bg-secondary/10 text-secondary-foreground px-3 py-1 rounded-full text-sm font-bold shadow-sm border border-secondary/20 backdrop-blur-sm">
                  <Star className="w-4 h-4 fill-secondary text-secondary" />
                  <span>{center.rating}</span>
                  <span className="text-muted-foreground text-xs ml-1">({center.reviews_count})</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-3 leading-tight tracking-tight">{name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground font-medium">
                <span className="flex items-center"><MapPin className="w-4 h-4 mr-1.5 rtl:ml-1.5 rtl:mr-0 text-primary/70" /> {center.city}, {center.location}</span>
                <span className="flex items-center"><Calendar className="w-4 h-4 mr-1.5 rtl:ml-1.5 rtl:mr-0 text-primary/70" /> {isRTL ? `تأسس ${center.founded_year}` : `Est. ${center.founded_year}`}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
          
          <div className="lg:col-span-2 space-y-10">
            {/* Nav Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start overflow-x-auto bg-muted/40 p-1.5 h-auto flex-wrap rounded-xl border border-border/50 shadow-sm sticky top-20 z-30 backdrop-blur-md">
                <TabsTrigger value="overview" className="rounded-lg py-2.5 px-4 md:px-6 font-medium">{isRTL ? 'نظرة عامة' : 'Overview'}</TabsTrigger>
                <TabsTrigger value="courses" className="rounded-lg py-2.5 px-4 md:px-6 font-medium">{isRTL ? 'الدورات' : 'Courses'}</TabsTrigger>
                <TabsTrigger value="instructors" className="rounded-lg py-2.5 px-4 md:px-6 font-medium">{isRTL ? 'المعلمون' : 'Instructors'}</TabsTrigger>
                <TabsTrigger value="pricing" className="rounded-lg py-2.5 px-4 md:px-6 font-medium">{isRTL ? 'الرسوم' : 'Pricing'}</TabsTrigger>
                <TabsTrigger value="facilities" className="rounded-lg py-2.5 px-4 md:px-6 font-medium">{isRTL ? 'المرافق' : 'Facilities'}</TabsTrigger>
              </TabsList>

              {/* OVERVIEW */}
              <TabsContent value="overview" className="mt-8 space-y-10 animate-in fade-in-50">
                <section>
                  <h2 className="text-2xl font-bold mb-4">{isRTL ? 'عن المركز' : 'About Center'}</h2>
                  <p className="text-muted-foreground leading-relaxed text-lg">{description}</p>
                </section>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                    <h3 className="text-xl font-bold text-primary mb-3">{isRTL ? 'الرؤية' : 'Vision'}</h3>
                    <p className="text-foreground/80 leading-relaxed">{vision}</p>
                  </div>
                  <div className="bg-secondary/5 p-6 rounded-2xl border border-secondary/10">
                    <h3 className="text-xl font-bold text-secondary-foreground mb-3">{isRTL ? 'الرسالة' : 'Mission'}</h3>
                    <p className="text-foreground/80 leading-relaxed">{mission}</p>
                  </div>
                </div>

                <section>
                  <h3 className="text-2xl font-bold mb-4">{isRTL ? 'منهجية التدريس' : 'Teaching Methodology'}</h3>
                  <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                    <p className="text-muted-foreground leading-relaxed text-lg">{teachingMethodology}</p>
                  </div>
                </section>
                
                <section>
                  <h3 className="text-xl font-bold mb-4">{isRTL ? 'الاعتمادات' : 'Accreditations'}</h3>
                  <div className="flex flex-wrap gap-2">
                    {center.accreditations.map((acc, i) => (
                      <Badge key={i} variant="outline" className="px-4 py-1.5 text-sm bg-background rounded-full border-border/80">{acc}</Badge>
                    ))}
                  </div>
                </section>
              </TabsContent>

              {/* COURSES */}
              <TabsContent value="courses" className="mt-8 space-y-8 animate-in fade-in-50">
                <h2 className="text-2xl font-bold mb-6">{isRTL ? 'الدورات المتاحة' : 'Available Courses'}</h2>
                <div className="grid gap-6">
                  {center.courses.map(course => (
                    <Card key={course.id} className="overflow-hidden border-border/60 hover:border-primary/40 transition-colors shadow-sm bg-card">
                      <CardContent className="p-6 md:p-8">
                        <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <Badge className="bg-accent text-accent-foreground hover:bg-accent border-none">{course.language}</Badge>
                              <Badge variant="outline" className="bg-background">{course.level}</Badge>
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-2">{isRTL ? course.name.ar : course.name.en}</h3>
                          </div>
                          <div className="text-left md:text-right rtl:md:text-left bg-muted/50 px-4 py-3 rounded-xl border border-border/50">
                            <div className="font-bold text-xl text-primary">{course.tuition_fee}</div>
                            <div className="text-sm text-muted-foreground font-medium mt-1">{course.duration}</div>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-6 line-clamp-2">{isRTL ? course.description.ar : course.description.en}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div className="flex items-center text-sm text-foreground/80 font-medium">
                            <Clock className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-primary/70" /> {course.schedule_type}
                          </div>
                          <div className="flex items-center text-sm text-foreground/80 font-medium">
                            <Users className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-primary/70" /> {course.class_size}
                          </div>
                          <div className="col-span-2 flex items-center text-sm text-foreground/80 font-medium">
                            <CheckCircle2 className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-primary/70" /> {course.certification}
                          </div>
                        </div>
                        
                        <Button 
                          onClick={() => handleOpenCourse(course)}
                          className="w-full md:w-auto font-semibold bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                        >
                          {isRTL ? 'عرض تفاصيل الدورة' : 'View Course Details'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* INSTRUCTORS */}
              <TabsContent value="instructors" className="mt-8 space-y-6 animate-in fade-in-50">
                <h2 className="text-2xl font-bold mb-6">{isRTL ? 'فريق التدريس' : 'Our Instructors'}</h2>
                <div className="grid gap-6">
                  {center.instructors.map(instructor => (
                    <InstructorCard key={instructor.id} instructor={instructor} isRTL={isRTL} />
                  ))}
                </div>
              </TabsContent>

              {/* PRICING */}
              <TabsContent value="pricing" className="mt-8 space-y-8 animate-in fade-in-50">
                <PricingTable pricing={center.pricing} isRTL={isRTL} />
                <EnrollmentStepsSection isRTL={isRTL} />
              </TabsContent>

              {/* FACILITIES */}
              <TabsContent value="facilities" className="mt-8 space-y-8 animate-in fade-in-50">
                <h2 className="text-2xl font-bold mb-6">{isRTL ? 'المرافق والتجهيزات' : 'Campus Facilities'}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {center.facilities.map((fac, idx) => (
                    <FacilityCard key={idx} facility={fac} isRTL={isRTL} />
                  ))}
                </div>
                
                {/* Testimonials */}
                <div className="pt-12 border-t mt-12">
                  <h3 className="text-2xl font-bold mb-8 text-center">{isRTL ? 'تجارب الطلاب' : 'Student Testimonials'}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {center.testimonials.map((test, idx) => (
                      <TestimonialCard key={idx} testimonial={test} isRTL={isRTL} />
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sticky Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats Box */}
            <Card className="border-border/60 shadow-sm bg-card overflow-hidden">
              <div className="bg-primary p-6 text-center text-primary-foreground">
                <h3 className="font-bold text-lg mb-1">{isRTL ? 'التسجيل مفتوح' : 'Admissions Open'}</h3>
                <p className="text-sm opacity-90">{center.schedule.start_dates}</p>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-border">
                  <div className="text-center p-3 bg-muted/50 rounded-xl">
                    <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="font-bold text-xl">{center.total_students}+</div>
                    <div className="text-xs text-muted-foreground">{isRTL ? 'طالب' : 'Students'}</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-xl">
                    <BookOpen className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="font-bold text-xl">{center.total_instructors}</div>
                    <div className="text-xs text-muted-foreground">{isRTL ? 'معلم' : 'Instructors'}</div>
                  </div>
                </div>
                <Button className="w-full h-12 text-lg font-bold shadow-md bg-primary hover:bg-primary/90 text-white rounded-xl">
                  {isRTL ? 'سجل الآن' : 'Enroll Now'}
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-border/60 shadow-sm bg-card">
              <CardContent className="p-6 space-y-5">
                <h3 className="font-bold text-lg border-b pb-3 mb-2">{isRTL ? 'معلومات التواصل' : 'Contact Information'}</h3>
                
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm font-medium leading-relaxed">{isRTL ? center.contact.address.ar : center.contact.address.en}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm font-medium" dir="ltr">{center.contact.phone}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm font-medium">{center.contact.email}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Globe className="w-5 h-5 text-primary shrink-0" />
                  <a href={center.contact.website} target="_blank" rel="noreferrer" className="text-sm font-medium text-primary hover:underline truncate">
                    {center.contact.website.replace('https://', '')}
                  </a>
                </div>
                <div className="flex items-center gap-4 pt-3 border-t">
                  <Clock className="w-5 h-5 text-muted-foreground shrink-0" />
                  <span className="text-sm text-muted-foreground">{center.contact.office_hours}</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Form Box */}
            <Card className="border-border/60 shadow-sm bg-card">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">{isRTL ? 'لديك استفسار؟' : 'Have an inquiry?'}</h3>
                <ContactForm isRTL={isRTL} centerName={name} />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Centers */}
        {relatedCenters.length > 0 && (
          <div className="mt-20 pt-10 border-t border-border">
            <h2 className="text-2xl font-bold mb-8">
              {isRTL ? 'مراكز مشابهة' : 'Related Centers'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCenters.map(rel => (
                <LanguageCenterCard key={rel.id} center={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      <CourseDetailsModal 
        course={selectedCourse} 
        open={courseModalOpen} 
        onOpenChange={setCourseModalOpen} 
      />
    </div>
  );
}
