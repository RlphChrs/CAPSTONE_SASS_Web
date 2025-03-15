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
import AddAppointment from './Pages/Add-appointment';
import CalendarMonthView from './Pages/CalendarMonthView';
import Report from './Pages/Report';
import UploadKnowledgePage from './Pages/UploadKnowledge-Page';
import ViewReport from './Pages/ViewReport';
import Subscription from './Pages/Subscription';
import SubscriptionDetails from './Pages/SubscriptionDetails';
import SubscriptionPlans from './components/SubscriptionPlans';
import Information from './components/subcriptiondetails';
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
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/subscriptiondetails" element={<SubscriptionDetails />} />
          <Route path="/subsinformation" element={<Information />} />
          <Route path="/subscriptionplans" element={<SubscriptionPlans />} />
          <Route path="/add-appointment" element={<AddAppointment />} />
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
