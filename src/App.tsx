import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Volunteers from './pages/Volunteers';
import Timeline from './pages/Timeline';
import Team from './pages/Team';
import Speakers from './pages/Speakers';
import Tickets from './pages/Tickets';
import About from './pages/About';
import Register from './pages/Register';
import Login from './pages/Login';
import VerifyEmail from './pages/auth/VerifyEmail';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import SetPassword from './pages/auth/SetPassword';

import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAttendees from './pages/admin/AdminAttendees';
import AdminVolunteers from './pages/admin/AdminVolunteers';

import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import DashboardTickets from './pages/dashboard/DashboardTickets';
import DashboardShop from './pages/dashboard/DashboardShop';
import DashboardProfile from './pages/dashboard/DashboardProfile';
import ScrollToTop from './components/ScrollToTop';
import { HelmetProvider } from 'react-helmet-async';

const App = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="volunteers" element={<Volunteers />} />
          <Route path="timeline" element={<Timeline />} />
          <Route path="team" element={<Team />} />
          <Route path="speakers" element={<Speakers />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="about" element={<About />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="set-password" element={<SetPassword />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="tickets" element={<DashboardTickets />} />
          <Route path="shop" element={<DashboardShop />} />
          <Route path="profile" element={<DashboardProfile />} />
        </Route>

        <Route path="/admin">
          <Route path="login" element={<AdminLogin />} />
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="dashboard/attendees" element={<AdminAttendees />} />
            <Route path="dashboard/volunteers" element={<AdminVolunteers />} />
          </Route>
        </Route>
      </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;