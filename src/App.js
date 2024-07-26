import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SignupLoginModel from './components/SignupLoginModel';
import PaymentSection from './components/PaymentSection';
import PayPalComponent from './components/PayPalComponent';
import { logEvent } from './firebase';

const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    logEvent('page_view', { page_path: location.pathname });
  }, [location]);

  return null;
}

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <PageTracker />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/paymentsection" element={<PaymentSection />} />
        <Route path="/signuploginmodel" element={<SignupLoginModel />} />
        <Route path="/PayPal" element={<PayPalComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
