import { useRef, useState } from 'react';
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';
import ExecutiveOverview from './ExecutiveOverview.jsx';
import InquiryDetail from './InquiryDetail.jsx';
import ComingSoonPanel from './ComingSoonPanel.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';
import { InquiryNotFound } from './EmptyStates.jsx';
import { getInquiryById } from '../data/repository.js';

export default function Dashboard() {
  const navigate = useNavigate();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const hamburgerRef = useRef(null);

  const goToOverview = () => navigate('/dashboard');
  const goToLanding = () => navigate('/');
  const goToInquiry = (id) => {
    if (id == null) goToOverview();
    else navigate(`/dashboard/inquiry/${id}`);
  };

  return (
    <div className="min-h-dvh bg-bg text-ink-primary flex">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:px-3 focus:py-2 focus:rounded-md focus:bg-accent focus:text-bg focus:font-semibold focus:text-sm"
      >
        Skip to main content
      </a>
      <Sidebar
        onBackToLanding={goToLanding}
        onSelectInquiry={(id) => {
          goToInquiry(id);
          setMobileNavOpen(false);
        }}
        onNavigate={(to) => {
          navigate(to);
          setMobileNavOpen(false);
        }}
        mobileOpen={mobileNavOpen}
        onMobileClose={() => {
          setMobileNavOpen(false);
          hamburgerRef.current?.focus();
        }}
      />
      <div className="flex-1 flex flex-col min-w-0 relative">
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent blur-3xl opacity-[0.04] pointer-events-none"
          aria-hidden="true"
        />
        <Header
          ref={hamburgerRef}
          onMenuToggle={() => setMobileNavOpen((v) => !v)}
        />
        <main id="main-content" className="flex-1 overflow-y-auto relative z-10">
          <ErrorBoundary>
            <Routes>
              <Route index element={<ExecutiveOverview onSelectInquiry={goToInquiry} />} />
              <Route path="map" element={<ComingSoonPanel kind="map" />} />
              <Route path="voices" element={<ComingSoonPanel kind="voices" />} />
              <Route
                path="inquiry/:inquiryId"
                element={<InquiryRoute onBack={goToOverview} />}
              />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}

function InquiryRoute({ onBack }) {
  const { inquiryId } = useParams();
  const inquiry = getInquiryById(inquiryId);

  if (!inquiry) return <InquiryNotFound onBack={onBack} />;
  return <InquiryDetail inquiry={inquiry} onBack={onBack} />;
}

