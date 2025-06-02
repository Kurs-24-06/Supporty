import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import HomePage from './pages/HomePage';
import TicketsPage from './pages/TicketsPage';
import ArbeitsSchutz from './pages/ArbeitsSchutz';
import Contact from './pages/Contact';
import Imprint from './pages/Imprint';
import Services from './pages/Services';
import Support from './pages/Support';
import KnowledgePage from './pages/KnowledgePage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AlertProvider } from './context/AlertContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Loading from './components/Loading';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <ThemeProvider>
        <LanguageProvider>
          <AlertProvider>
            <AuthProvider>
              <GlobalStyles />
              <AppRoutes />
            </AuthProvider>
          </AlertProvider>
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
}

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tickets" element={
        <ProtectedRoute>
          <TicketsPage />
        </ProtectedRoute>
      } />
      <Route path="/knowledge" element={
        <ProtectedRoute>
          <KnowledgePage />
        </ProtectedRoute>
      } />
      <Route path="/Imprint" element={<Imprint />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Services" element={<Services />} />
      <Route path="/ArbeitsSchutz" element={<ArbeitsSchutz />} />
      <Route path="/Support" element={<Support />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;