import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Landing from './components/Landing.jsx';
import Dashboard from './components/Dashboard.jsx';
import TweaksPanel from './theme/TweaksPanel.jsx';
import { useTweaks } from './theme/useTweaks.js';

export default function App() {
  const { tweaks, setTweak, resetTweaks } = useTweaks();

  return (
    <BrowserRouter>
      <Atmosphere tweaks={tweaks} />
      <AnimatedRoutes />
      <TweaksPanel tweaks={tweaks} setTweak={setTweak} resetTweaks={resetTweaks} />
    </BrowserRouter>
  );
}

function Atmosphere({ tweaks }) {
  return (
    <>
      {tweaks.gridOverlay && (
        <div
          aria-hidden="true"
          className="fixed inset-0 grid-radial opacity-30 pointer-events-none z-0"
        />
      )}
      {tweaks.ambientGlow && (
        <div
          aria-hidden="true"
          className="fixed top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-[0.06] pointer-events-none z-0"
          style={{ background: tweaks.accentColor }}
        />
      )}
    </>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname.split('/')[1] || 'root'}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <Landing />
            </motion.div>
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <Dashboard />
            </motion.div>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}
