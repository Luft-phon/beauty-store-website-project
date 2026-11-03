import React, { useState, useEffect, startTransition } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, Instagram, Facebook, ShoppingBag } from 'lucide-react';
import { Language, Service } from '../types';
import { TRANSLATIONS } from '../constants';
import ScrollToTop from './ScrollToTop';

interface LayoutProps {
  children: React.ReactNode;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  cartCount: number;
  services: Service[];
}

const Layout: React.FC<LayoutProps> = ({ children, currentLang, onLanguageChange, cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLang];
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to top and close mobile menu on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
    setIsServicesMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const navClasses = (path: string) => `
    font-serif uppercase tracking-widest text-sm font-semibold transition-colors duration-150
    ${isActive(path) ? 'text-[#B98267]' : 'text-[#5E4D44] hover:text-[#B98267]'}
  `;

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDFA]">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-[#FFFDFA]/92 backdrop-blur-md border-b border-[#E3D7CB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Logo */}
            <div
              className="flex-shrink-0 flex items-start cursor-pointer flex-col"
              onClick={() => navigate('/')}
            >
              <span className="font-serif text-2xl font-bold text-[#342923] tracking-tight leading-none">
                LE ’ CHARME
              </span>
              <span className="font-sen text-[10px] font-bold text-[#856F63] tracking-[0.22em] uppercase mt-1">
                Beauté Boutique
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={navClasses('/')}>{t.nav.home}</Link>
              <Link to="/about" className={navClasses('/about')}>{t.nav.about}</Link>

              {/* Services Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setIsServicesMenuOpen(true)}
                onMouseLeave={() => setIsServicesMenuOpen(false)}
              >
                <div className="flex items-center gap-1 cursor-pointer">
                  <Link to="/services/party" className={navClasses('/services/party')}>{t.nav.services}</Link>
                </div>

                {/* Dropdown Menu */}
                <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 w-64 transition-all duration-150 ${isServicesMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1'}`}>
                  <div className="bg-[#FFFDFA] shadow-xl border border-[#DFD1C5] overflow-hidden py-2">
                    <Link to="/services/party" className="block px-5 py-3 text-xs font-sen uppercase tracking-[0.16em] text-[#342923] hover:bg-[#F4ECE5] hover:text-[#B98267] transition-colors">Party / Event Makeup</Link>
                    <Link to="/services/photoshoot" className="block px-5 py-3 text-xs font-sen uppercase tracking-[0.16em] text-[#342923] hover:bg-[#F4ECE5] hover:text-[#B98267] transition-colors">Photoshoot / Stage</Link>
                    <Link to="/services/bridal" className="block px-5 py-3 text-xs font-sen uppercase tracking-[0.16em] text-[#342923] hover:bg-[#F4ECE5] hover:text-[#B98267] transition-colors">Bridal Packages</Link>
                    <Link to="/services/guest" className="block px-5 py-3 text-xs font-sen uppercase tracking-[0.16em] text-[#342923] hover:bg-[#F4ECE5] hover:text-[#B98267] transition-colors">Guest Services</Link>
                    <Link to="/services/education" className="block px-5 py-3 text-xs font-sen uppercase tracking-[0.16em] text-[#342923] hover:bg-[#F4ECE5] hover:text-[#B98267] transition-colors">Personal Makeup Classes</Link>
                  </div>
                </div>
              </div>

              <Link to="/gallery" className={navClasses('/gallery')}>{t.nav.gallery}</Link>
              <Link to="/contact" className={navClasses('/contact')}>{t.nav.contact}</Link>

              {/* Cart Icon */}
              <Link to="/cart" className="relative text-[#5E4D44] hover:text-[#B98267] transition-colors" aria-label="Shopping cart">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#B98267] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full sc-nums tabular-nums">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link
                to="/booking"
                className="px-5 py-2.5 bg-[#342923] text-white font-sen text-xs font-bold uppercase tracking-[0.16em] hover:bg-[#B98267] active:scale-[0.97] transition-all duration-150 whitespace-nowrap"
              >
                {t.nav.booking}
              </Link>

              {/* Language Switcher */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center space-x-1 text-[#5E4D44] hover:text-[#B98267] transition-colors"
                >
                  <Globe size={17} />
                  <span className="text-xs font-sen">{currentLang.split(' ')[0]}</span>
                </button>

                {isLangMenuOpen && (
                  <div className="absolute right-0 mt-3 w-36 bg-[#FFFDFA] shadow-lg py-1.5 border border-[#DFD1C5]">
                    {Object.values(Language).map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => {
                          onLanguageChange(lang);
                          setIsLangMenuOpen(false);
                        }}
                        className="block px-4 py-2 text-xs font-sen text-[#342923] hover:bg-[#F4ECE5] w-full text-left"
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <Link to="/cart" className="relative text-[#5E4D44] hover:text-[#B98267]" aria-label="Shopping cart">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#B98267] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full sc-nums tabular-nums">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                type="button"
                onClick={() => {
                  startTransition(() => {
                    setIsMenuOpen(!isMenuOpen);
                  });
                }}
                aria-label="Toggle menu"
                className="text-[#342923] p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#FFFDFA] border-b border-[#E3D7CB]">
            <div className="px-4 pt-3 pb-5 space-y-1.5 flex flex-col items-center">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-[#342923] hover:text-[#B98267] uppercase text-xs font-sen font-bold tracking-[0.18em]">{t.nav.home}</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-[#342923] hover:text-[#B98267] uppercase text-xs font-sen font-bold tracking-[0.18em]">{t.nav.about}</Link>
              {/* Mobile Services Submenu */}
              <div className="w-full text-center">
                <Link to="/services/party" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-[#342923] hover:text-[#B98267] uppercase text-xs font-sen font-bold tracking-[0.18em]">{t.nav.services}</Link>
                <div className="bg-[#F6EFE8] py-2.5 space-y-2 border-y border-[#E3D7CB]">
                  <Link to="/services/party" onClick={() => setIsMenuOpen(false)} className="block text-[11px] font-sen text-[#5E4D44] hover:text-[#B98267] uppercase tracking-widest">Party / Event</Link>
                  <Link to="/services/photoshoot" onClick={() => setIsMenuOpen(false)} className="block text-[11px] font-sen text-[#5E4D44] hover:text-[#B98267] uppercase tracking-widest">Photoshoot / Stage</Link>
                  <Link to="/services/bridal" onClick={() => setIsMenuOpen(false)} className="block text-[11px] font-sen text-[#5E4D44] hover:text-[#B98267] uppercase tracking-widest">Bridal Packages</Link>
                  <Link to="/services/guest" onClick={() => setIsMenuOpen(false)} className="block text-[11px] font-sen text-[#5E4D44] hover:text-[#B98267] uppercase tracking-widest">Guest Services</Link>
                  <Link to="/services/education" onClick={() => setIsMenuOpen(false)} className="block text-[11px] font-sen text-[#5E4D44] hover:text-[#B98267] uppercase tracking-widest">Classes</Link>
                </div>
              </div>
              <Link to="/gallery" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-[#342923] hover:text-[#B98267] uppercase text-xs font-sen font-bold tracking-[0.18em]">{t.nav.gallery}</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-[#342923] hover:text-[#B98267] uppercase text-xs font-sen font-bold tracking-[0.18em]">{t.nav.contact}</Link>
              <Link to="/booking" onClick={() => setIsMenuOpen(false)} className="block px-6 py-2.5 mt-2 bg-[#342923] text-white font-sen font-bold uppercase text-xs tracking-[0.18em]">{t.nav.booking}</Link>
              <div className="flex flex-wrap justify-center gap-1.5 pt-3">
                {Object.values(Language).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => { onLanguageChange(lang); setIsMenuOpen(false); }}
                    className="text-[11px] font-sen border border-[#D8C9BC] px-2.5 py-1 text-[#342923]"
                  >
                    {lang === Language.VI ? 'VI' : lang === Language.EN ? 'EN' : lang.substring(0, 2).toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Editorial Colophon Footer */}
      <footer className="bg-[#FAF6F1] text-[#342923] pt-16 pb-12 border-t border-[#DFD1C5]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-24">

            {/* Left Column: Brand, Atelier Note, Socials */}
            <div className="flex-1 max-w-lg">
              <div className="mb-8">
                <img src="/images/logo/logo4.png" alt="LE'CHARME" className="w-[220px] h-[88px] object-cover border border-[#E3D7CB]" />
              </div>

              <p className="font-sen text-[#5E4D44] text-sm mb-8 leading-relaxed max-w-md">
                With a passion for artistry and an eye for detail, our team is dedicated to delivering flawless, long-lasting results for weddings, special events, photoshoots, and everyday elegance.
              </p>

              {/* Social Icons */}
              <div className="flex items-center space-x-4">
                <a
                  href="https://www.instagram.com/lecharme.beauteboutique"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="bg-[#342923] text-white p-2.5 rounded-full hover:bg-[#B98267] transition-colors duration-150"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="https://www.facebook.com/lecharmebeauteboutique"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="bg-[#342923] text-white p-2.5 rounded-full hover:bg-[#B98267] transition-colors duration-150"
                >
                  <Facebook size={16} fill="white" className="stroke-none" />
                </a>
              </div>
            </div>

            {/* Right Columns: Links */}
            <div className="flex flex-row gap-16 lg:gap-28">
              {/* Site Map */}
              <div>
                <h4 className="font-mono uppercase tracking-[0.2em] text-[11px] font-bold mb-6 text-[#A46F55]">
                  Site Map
                </h4>
                <ul className="space-y-3 text-sm text-[#5E4D44]">
                  <li><Link to="/about" className="font-sen hover:text-[#342923] transition-colors">About Us</Link></li>
                  <li><Link to="/services/party" className="font-sen hover:text-[#342923] transition-colors">Services</Link></li>
                  <li><Link to="/gallery" className="font-sen hover:text-[#342923] transition-colors">Gallery</Link></li>
                  <li><Link to="/booking" className="font-sen hover:text-[#342923] transition-colors">Book Appointment</Link></li>
                  <li><Link to="/contact" className="font-sen hover:text-[#342923] transition-colors">Find A Studio</Link></li>
                </ul>
              </div>

              {/* Assistance */}
              <div>
                <h4 className="font-mono uppercase tracking-[0.2em] text-[11px] font-bold mb-6 text-[#A46F55]">
                  Assistance
                </h4>
                <ul className="space-y-3 text-sm text-[#5E4D44]">
                  <li><Link to="/contact" className="font-sen hover:text-[#342923] transition-colors">Contact</Link></li>
                  <li><Link to="/inquiry" className="font-sen hover:text-[#342923] transition-colors">Bridal Inquiry</Link></li>
                  <li><Link to="/terms" className="font-sen hover:text-[#342923] transition-colors">Terms of Service</Link></li>
                  <li><Link to="/policy" className="font-sen hover:text-[#342923] transition-colors">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>

          </div>

          <div className="mt-16 pt-8 border-t border-[#E3D7CB] flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-[#856F63] uppercase tracking-[0.18em]">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <span>&copy; {new Date().getFullYear()} Le’Charme Beauté Boutique · Huntington Beach, CA</span>
            </div>
            <div>
              <span><Globe size={13} className="inline mr-1" /> United States (USD $)</span>
            </div>
          </div>
        </div>
      </footer>
      <ScrollToTop />
    </div>
  );
};

export default Layout;
