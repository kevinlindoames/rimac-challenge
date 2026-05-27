import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Step1_UserData = lazy(() => import('../pages/Step1_UserData'));
const Step2_QuoteAndPlans = lazy(() => import('../pages/Step2_QuoteAndPlans'));
const Step3_Summary = lazy(() => import('../pages/Step3_Summary'));

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Step1_UserData />} />
    <Route path="/step2" element={<Step2_QuoteAndPlans />} />
    <Route path="/step3" element={<Step3_Summary />} />
  </Routes>
);