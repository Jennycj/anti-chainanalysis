import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router} from 'react-router-dom';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <HeroSection />
      <Footer />
    </Router>
    </>
  );
}

export default App;
