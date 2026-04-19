import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DomainPage from './pages/DomainPage';
import Footer from './components/Footer';
import AdminPage from './pages/AdminPage';
import { SiteProvider } from './context/SiteContext';
import BackgroundSpline from './components/BackgroundSpline';
import './index.css';

export default function App() {
  return (
    <SiteProvider>
      <BrowserRouter>
        <div className="gradient-bg" />
        <div className="grid-overlay" />
        <BackgroundSpline />

        <img className="side-flag side-flag-left" src="/algeria-flag.svg" alt="" aria-hidden="true" />
        <img className="side-flag side-flag-right" src="/algeria-flag.svg" alt="" aria-hidden="true" />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/domain/:id" element={<DomainPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </SiteProvider>
  );
}
