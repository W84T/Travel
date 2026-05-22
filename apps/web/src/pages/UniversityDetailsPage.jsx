
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MapPin, Trophy, Users, BookOpen, Calendar, Globe, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { useUniversities } from '@/hooks/useUniversities.js';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import UniversityGallery from '@/components/UniversityGallery.jsx';
import UniversityContactForm from '@/components/UniversityContactForm.jsx';
import UniversityRelatedSection from '@/components/UniversityRelatedSection.jsx';

export default function UniversityDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  
  const { getUniversityById, loading } = useUniversities();
  const [university, setUniversity] = useState(null);

  useEffect(() => {
    if (!loading) {
      const data = getUniversityById(id);
      setUniversity(data);
    }
  }, [id, loading, getUniversityById]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Skeleton className="w-full h-[50vh]" />
        <div className="container mx-auto px-4 py-12 space-y-8">
          <Skeleton className="w-1/3 h-10" />
          <Skeleton className="w-full h-64 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!university) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center px-4">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          {isRTL ? 'الجامعة غير موجودة' : 'University not found'}
        </h2>
        <Button onClick={() => navigate('/universities')} variant="outline">
          {isRTL ? 'العودة للقائمة' : 'Back to List'}
        </Button>
      </div>
    );
  }

  const name = isRTL ? university.name.ar : university.name.en;
  const description = isRTL ? university.description.ar : university.description.en;
  const mission = isRTL ? university.mission.ar : university.mission.en;
  const vision = isRTL ? university.vision.ar : university.vision.en;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end pb-12">
        <div className="absolute inset-0 z-0">
          <img 
            src={university.banner_image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-black/40" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/universities')}
            className="mb-6 text-foreground/80 hover:text-foreground bg-background/20 backdrop-blur-sm"
          >
            {isRTL ? <ArrowRight className="w-4 h-4 ml-2" /> : <ArrowLeft className="w-4 h-4 mr-2" />}
            {isRTL ? 'العودة للجامعات' : 'Back to Universities'}
          </Button>

          <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-white p-2 shadow-xl shrink-0 border border-border">
              <img src={university.logo_image} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                  {university.type}
                </Badge>
                <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
                  <Trophy className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0 text-secondary" />
                  {isRTL ? `تصنيف عالمي: ${university.world_ranking}` : `World Rank: ${university.world_ranking}`}
                </Badge>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">{name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm md:text-base">
                <span className="flex items-center"><MapPin className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" /> {university.city}, {university.location}</span>
                <span className="flex items-center"><Calendar className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" /> {isRTL ? `تأسست ${university.founded_year}` : `Est. ${university.founded_year}`}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start overflow-x-auto bg-muted/50 p-1 h-auto flex-wrap rounded-xl">
                <TabsTrigger value="overview" className="rounded-lg py-2.5">{isRTL ? 'نظرة عامة' : 'Overview'}</TabsTrigger>
                <TabsTrigger value="programs" className="rounded-lg py-2.5">{isRTL ? 'البرامج الأكاديمية' : 'Programs'}</TabsTrigger>
                <TabsTrigger value="admissions" className="rounded-lg py-2.5">{isRTL ? 'القبول' : 'Admissions'}</TabsTrigger>
                <TabsTrigger value="facilities" className="rounded-lg py-2.5">{isRTL ? 'المرافق' : 'Facilities'}</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 space-y-8 animate-in fade-in-50">
                <section>
                  <h2 className="text-2xl font-bold mb-4">{isRTL ? 'عن الجامعة' : 'About University'}</h2>
                  <p className="text-muted-foreground leading-relaxed text-lg">{description}</p>
                </section>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-primary/5 border-primary/10 shadow-none">
                    <CardHeader>
                      <CardTitle className="text-primary flex items-center text-lg">
                        <Globe className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
                        {isRTL ? 'الرؤية' : 'Vision'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent><p className="text-foreground/80">{vision}</p></CardContent>
                  </Card>
                  <Card className="bg-secondary/5 border-secondary/10 shadow-none">
                    <CardHeader>
                      <CardTitle className="text-secondary-foreground flex items-center text-lg">
                        <BookOpen className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
                        {isRTL ? 'الرسالة' : 'Mission'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent><p className="text-foreground/80">{mission}</p></CardContent>
                  </Card>
                </div>

                <section>
                  <h3 className="text-xl font-bold mb-4">{isRTL ? 'الاعتمادات والشراكات' : 'Accreditations & Partnerships'}</h3>
                  <div className="flex flex-wrap gap-2">
                    {university.accreditations.map((acc, i) => (
                      <Badge key={i} variant="outline" className="px-3 py-1 text-sm bg-background">{acc}</Badge>
                    ))}
                  </div>
                </section>
              </TabsContent>

              <TabsContent value="programs" className="mt-6 space-y-6 animate-in fade-in-50">
                <h2 className="text-2xl font-bold mb-6">{isRTL ? 'البرامج المتاحة' : 'Available Programs'}</h2>
                <div className="grid gap-4">
                  {university.programs.map(prog => (
                    <Card key={prog.id} className="overflow-hidden border-border/50 hover:border-primary/30 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                          <div>
                            <Badge className="mb-2 bg-muted text-muted-foreground hover:bg-muted">{prog.degree_level}</Badge>
                            <h3 className="text-xl font-bold text-foreground">{isRTL ? prog.name.ar : prog.name.en}</h3>
                            <p className="text-sm text-primary font-medium mt-1">{prog.category}</p>
                          </div>
                          <div className="text-left md:text-right rtl:md:text-left bg-muted/30 p-3 rounded-lg">
                            <div className="font-bold text-lg">{prog.tuition_fee}</div>
                            <div className="text-sm text-muted-foreground">{prog.duration}</div>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">{isRTL ? prog.description.ar : prog.description.en}</p>
                        <div className="bg-accent/50 p-3 rounded-md text-sm">
                          <span className="font-semibold mr-2 rtl:ml-2 rtl:mr-0">{isRTL ? 'متطلبات القبول:' : 'Entry Requirements:'}</span>
                          <span className="text-muted-foreground">{isRTL ? prog.entry_requirements.ar : prog.entry_requirements.en}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="admissions" className="mt-6 space-y-8 animate-in fade-in-50">
                <Card className="border-border/50 shadow-sm">
                  <CardHeader>
                    <CardTitle>{isRTL ? 'متطلبات القبول العامة' : 'General Admission Requirements'}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-bold text-foreground mb-2 flex items-center">
                        <CheckCircle2 className="w-4 h-4 text-primary mr-2 rtl:ml-2 rtl:mr-0" />
                        {isRTL ? 'المتطلبات الأكاديمية' : 'Academic Requirements'}
                      </h4>
                      <p className="text-muted-foreground text-sm pl-6 rtl:pr-6">{isRTL ? university.admission_requirements.academic_requirements.ar : university.admission_requirements.academic_requirements.en}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-2 flex items-center">
                        <CheckCircle2 className="w-4 h-4 text-primary mr-2 rtl:ml-2 rtl:mr-0" />
                        {isRTL ? 'متطلبات اللغة' : 'Language Requirements'}
                      </h4>
                      <p className="text-muted-foreground text-sm pl-6 rtl:pr-6">{isRTL ? university.admission_requirements.language_requirements.ar : university.admission_requirements.language_requirements.en}</p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-xl mt-4">
                      <h4 className="font-bold text-foreground mb-2">{isRTL ? 'المواعيد النهائية' : 'Application Deadlines'}</h4>
                      <p className="text-primary font-medium">{university.admission_requirements.deadlines}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="facilities" className="mt-6 space-y-8 animate-in fade-in-50">
                <UniversityGallery facilities={university.campus_facilities} isRTL={isRTL} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="border-border/50 shadow-sm bg-card">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div className="flex items-center text-muted-foreground">
                    <Users className="w-5 h-5 mr-3 rtl:ml-3 rtl:mr-0 text-primary" />
                    <span>{isRTL ? 'إجمالي الطلاب' : 'Total Students'}</span>
                  </div>
                  <span className="font-bold text-lg">{(university.total_students / 1000).toFixed(1)}k</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div className="flex items-center text-muted-foreground">
                    <BookOpen className="w-5 h-5 mr-3 rtl:ml-3 rtl:mr-0 text-primary" />
                    <span>{isRTL ? 'أعضاء هيئة التدريس' : 'Faculty Members'}</span>
                  </div>
                  <span className="font-bold text-lg">{university.total_faculty}+</span>
                </div>
                <div className="pt-2">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-lg font-bold shadow-md">
                    {isRTL ? 'تقديم الطلب الآن' : 'Apply Now'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="border-border/50 shadow-sm bg-card">
              <CardHeader>
                <CardTitle className="text-lg">{isRTL ? 'معلومات التواصل' : 'Contact Information'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 rtl:ml-3 rtl:mr-0 text-muted-foreground shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/80">{isRTL ? university.contact.address.ar : university.contact.address.en}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 rtl:ml-3 rtl:mr-0 text-muted-foreground shrink-0" />
                  <span className="text-sm text-foreground/80" dir="ltr">{university.contact.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 rtl:ml-3 rtl:mr-0 text-muted-foreground shrink-0" />
                  <span className="text-sm text-foreground/80">{university.contact.email}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-5 h-5 mr-3 rtl:ml-3 rtl:mr-0 text-muted-foreground shrink-0" />
                  <a href={university.contact.website} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">
                    {university.contact.website.replace('https://', '')}
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card className="border-border/50 shadow-sm bg-card">
              <CardHeader>
                <CardTitle className="text-lg">{isRTL ? 'استفسر الآن' : 'Inquire Now'}</CardTitle>
              </CardHeader>
              <CardContent>
                <UniversityContactForm isRTL={isRTL} />
              </CardContent>
            </Card>
          </div>
        </div>

        <UniversityRelatedSection currentUniversityId={university.id} isRTL={isRTL} />
      </div>
    </div>
  );
}
