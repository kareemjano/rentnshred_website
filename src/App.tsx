/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar, Footer } from './components/Navigation';
import { Home } from './pages/Home';
import { EquipmentList } from './pages/EquipmentList';
import { ProductDetail } from './pages/ProductDetail';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Legal } from './pages/Legal';
import { ThemeProvider } from './contexts/ThemeContext';
import { SHOW_ABOUT_PAGE, HIDE_CONTACT_PAGE } from './data';

// Helper to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-brand-bg transition-colors duration-300">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/equipment" element={<EquipmentList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/about" element={SHOW_ABOUT_PAGE ? <About /> : <Navigate to="/" replace />} />
              <Route path="/contact" element={HIDE_CONTACT_PAGE ? <Navigate to="/" replace /> : <Contact />} />
              <Route path="/impressum" element={<Legal />} />
              <Route path="/privacy" element={<Legal />} />
              <Route path="/terms" element={<Legal />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

