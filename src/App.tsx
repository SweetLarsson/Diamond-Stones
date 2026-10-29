/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageType, Programme, Story } from './types';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { FacilitatorsPage } from './pages/FacilitatorsPage';
import { ProgrammesPage } from './pages/ProgrammesPage';
import { ImpactPage } from './pages/ImpactPage';
import { ChaptersPage } from './pages/ChaptersPage';
import { StoriesPage } from './pages/StoriesPage';
import { GetInvolvedPage } from './pages/GetInvolvedPage';
import { ContactPage } from './pages/ContactPage';
import { SupportModal } from './components/modals/SupportModal';
import { PrivacyModal } from './components/modals/PrivacyModal';
import { ScrollToTopButton } from './components/common/ScrollToTopButton';
import { motion, AnimatePresence } from 'motion/react';
import { preloadAllAssets } from './services/assetPreloader';

export default function App() {
  // Sync with window.location.hash for direct linking and reload support
  const getInitialPage = (): PageType => {
    const hash = window.location.hash.replace('#', '');
    const validPages: PageType[] = [
      'home',
      'about',
      'facilitators',
      'programmes',
      'impact',
      'chapters',
      'stories',
      'get-involved',
      'contact',
    ];
    if (validPages.includes(hash as PageType)) {
      return hash as PageType;
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageType>(getInitialPage);
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [supportCategory, setSupportCategory] = useState<string>('General Humanitarian Relief');
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  // Selected item passing between pages
  const [selectedProgramme, setSelectedProgramme] = useState<Programme | null>(null);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [contactPreselectedChapter, setContactPreselectedChapter] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Kick off parallel asset preloading and GPU image decoding on initial site mount
    preloadAllAssets();

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validPages: PageType[] = [
        'home',
        'about',
        'facilitators',
        'programmes',
        'impact',
        'chapters',
        'stories',
        'get-involved',
        'contact',
      ];
      if (validPages.includes(hash as PageType)) {
        setCurrentPage(hash as PageType);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSupport = (category?: string) => {
    if (category) {
      setSupportCategory(category);
    } else {
      setSupportCategory('General Humanitarian Relief');
    }
    setSupportModalOpen(true);
  };

  const handleContactWithChapter = (chapterName: string) => {
    setContactPreselectedChapter(chapterName);
    handleNavigate('contact');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFC] text-[#243247] font-['Montserrat',sans-serif] selection:bg-[#E7F7EF] selection:text-[#0B6B45]">
      {/* Navigation Top Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSupportModal={() => handleOpenSupport()}
      />

      {/* Main Page Content with Animated Page Fade Transitions */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-full"
          >
            {currentPage === 'home' && (
              <HomePage
                onNavigate={handleNavigate}
                onOpenSupportModal={() => handleOpenSupport()}
                onSelectProgramme={(prog) => setSelectedProgramme(prog)}
                onSelectStory={(story) => setSelectedStory(story)}
              />
            )}

            {currentPage === 'about' && (
              <AboutPage
                onNavigate={handleNavigate}
                onOpenSupportModal={() => handleOpenSupport()}
              />
            )}

            {currentPage === 'facilitators' && (
              <FacilitatorsPage
                onNavigate={handleNavigate}
                onOpenSupportModal={() => handleOpenSupport()}
              />
            )}

            {currentPage === 'programmes' && (
              <ProgrammesPage
                onNavigate={handleNavigate}
                onOpenSupportModal={handleOpenSupport}
                selectedProgrammeInit={selectedProgramme}
              />
            )}

            {currentPage === 'impact' && (
              <ImpactPage
                onNavigate={handleNavigate}
                onOpenSupportModal={() => handleOpenSupport()}
              />
            )}

            {currentPage === 'chapters' && (
              <ChaptersPage
                onNavigate={handleNavigate}
                onContactWithChapter={handleContactWithChapter}
              />
            )}

            {currentPage === 'stories' && (
              <StoriesPage
                onNavigate={handleNavigate}
                onOpenSupportModal={() => handleOpenSupport()}
                selectedStoryInit={selectedStory}
              />
            )}

            {currentPage === 'get-involved' && (
              <GetInvolvedPage
                onNavigate={handleNavigate}
                onOpenSupportModal={() => handleOpenSupport()}
              />
            )}

            {currentPage === 'contact' && (
              <ContactPage
                onNavigate={handleNavigate}
                initialChapter={contactPreselectedChapter}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
        onOpenSupportModal={() => handleOpenSupport()}
      />

      {/* Global Support Our Work Modal */}
      <SupportModal
        isOpen={supportModalOpen}
        onClose={() => setSupportModalOpen(false)}
        defaultCategory={supportCategory}
      />

      {/* Global Safeguarding & Privacy Modal */}
      <PrivacyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />

      {/* Persistent Floating Scroll to Top Action Button */}
      <ScrollToTopButton />
    </div>
  );
}
