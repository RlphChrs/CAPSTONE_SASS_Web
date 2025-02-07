import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import './index.css';

import Landing from './Pages/Landing';
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import Dashboard from './Pages/Dashboard';
import ProfilePage from './Pages/ProfilePage';
import BillingPage from './Pages/BillingPage';
import Billing from './Pages/Billing';
import AddAppointment from './Pages/Add-appointment';
import CalendarDaysView from './Pages/CalendarDaysView';
import CalendarMonthView from './Pages/CalendarMonthView';
import Report from './Pages/Report';
import UploadKnowledgePage from './Pages/Uploadknowledge-Page';
import ViewReport from './Pages/ViewReport';
import ViewSpecificDayPage from './Pages/ViewSpecificDayPage';
import Wrapper from './components/Wrapper';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/billing-page" element={<BillingPage />} />
          <Route path="/add-appointment" element={<AddAppointment />} />
          <Route path="/calendar-days" element={<CalendarDaysView />} />
          <Route path="/calendar-month" element={<CalendarMonthView />} />
          <Route path="/report" element={<Report />} />
          <Route path="/upload-knowledge" element={<UploadKnowledgePage />} />
          <Route path="/view-report" element={<ViewReport />} />
          <Route path="/view-specific-day" element={<ViewSpecificDayPage />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  </StrictMode>
);
