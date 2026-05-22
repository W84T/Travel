
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'sonner';
import { LanguageProvider } from '@/contexts/LanguageContext.jsx';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import Header from '@/components/Header.jsx';
import HomePage from '@/pages/HomePage.jsx';
import TravelPlansPage from '@/pages/TravelPlansPage.jsx';
import TravelPlanDetailsPage from '@/pages/TravelPlanDetailsPage.jsx';
import UniversitiesListingPage from '@/pages/UniversitiesListingPage.jsx';
import UniversityDetailsPage from '@/pages/UniversityDetailsPage.jsx';
import LanguageCentersListingPage from '@/pages/LanguageCentersListingPage.jsx';
import LanguageCenterDetailsPage from '@/pages/LanguageCenterDetailsPage.jsx';
import ContactPage from '@/pages/ContactPage.jsx';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/travel-plans" element={<TravelPlansPage />} />
              <Route path="/travel-plans/:id" element={<TravelPlanDetailsPage />} />
              <Route path="/universities" element={<UniversitiesListingPage />} />
              <Route path="/universities/:id" element={<UniversityDetailsPage />} />
              <Route path="/language-centers" element={<LanguageCentersListingPage />} />
              <Route path="/language-centers/:id" element={<LanguageCenterDetailsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
        </div>
        <Toaster position="top-center" richColors />
      </Router>
    </LanguageProvider>
  );
}

export default App;
