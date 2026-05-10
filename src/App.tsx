import Navbar from '@/sections/Navbar';
import Hero from '@/sections/Hero';
import Services from '@/sections/Services';
import Gallery from '@/sections/Gallery';
import Experience from '@/sections/Experience';
import Testimonials from '@/sections/Testimonials';
import Reservations from '@/sections/Reservations';
import Footer from '@/sections/Footer';
import './App.css';

export default function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      <Hero />
      <Services />
      <Gallery />
      <Experience />
      <Testimonials />
      <Reservations />
      <Footer />
    </div>
  );
}
