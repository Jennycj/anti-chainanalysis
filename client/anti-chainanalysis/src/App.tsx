import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router} from 'react-router-dom';
import HeroSection from './components/HeroSection';
// import IntroSection from './components/IntroSection';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      {/* <IntroSection /> */}
      <HeroSection />
    </Router>
    
    </>
  );
}

export default App;
