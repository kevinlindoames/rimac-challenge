import { Routes, Route } from 'react-router-dom';
import { Step1_UserData } from '../pages/Step1_UserData';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Step1_UserData />} />
      <Route path="/step2" element={<div className="p-8 text-center">Pantalla 2 (próximamente)</div>} />
    </Routes>
  );
};