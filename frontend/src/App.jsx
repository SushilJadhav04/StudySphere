import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import FeatureNavbar from './components/layout/FeatureNavbar';
import Home from './pages/Home';
import Summarization from './pages/Summarization';
import BookRepository from './pages/BookRepository';
import Translation from './pages/Translation';
import Chat from './pages/Chat';
import StudySparks from './pages/StudySparks';
import Login from './pages/Login';
import AboutUs from './pages/AboutUs';
import ContactUS from './pages/Contacts';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfServices';
import { ThemeProvider } from './components/context/ThemeContext';
import YouTubeSummarizer from './pages/YoutubeSummarizer';
import { AuthProvider ,AuthContext} from './components/context/AuthContext';


  // Hide navbar on specific paths
  const hideNavbarPaths = [
    "/aboutus",
    "/login",
    "/contactus",
    "/privacypolicy",
    "/termsofservice",
    "/Aboutus"
  ];


  const NavigationWrapper = () => {
    const location = useLocation();
    const path = location.pathname.toLowerCase();

  if (hideNavbarPaths.includes(path)) {
    return null;
  }

  return path === "/" ? <Navbar /> : <FeatureNavbar />;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <NavigationWrapper />
            
            <main className="flex-1 overflow-y-auto">
            <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/summarization" element={<Summarization />} />
      <Route path="/books" element={<BookRepository />} />
      <Route path="/translation" element={<Translation />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/studysparks" element={<StudySparks />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/contactus" element={<ContactUS />} />
      <Route path="/privacypolicy" element={<PrivacyPolicy />} />
      <Route path="/termsofservice" element={<TermsOfService />} />
      <Route path="/youtube" element={<YouTubeSummarizer />} />
    </Routes>
            </main>
    
            </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
