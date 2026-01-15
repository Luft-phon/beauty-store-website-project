import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, Phone, Mail, Instagram, Facebook, ShoppingBag, Youtube } from 'lucide-react';
import { Language, Service } from '../types';
import Chatbot from './Chatbot';
import { TRANSLATIONS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  cartCount: number;
  services: Service[];
}

const Layout: React.FC<LayoutProps> = ({ children, currentLang, onLanguageChange, cartCount, services }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLang];
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const navClasses = (path: string) => `
    font-serif uppercase tracking-widest text-base font-semibold transition-colors duration-300
    ${isActive(path) ? 'text-gold-500' : 'text-stone-600 hover:text-gold-500'}
  `;

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-stone-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer flex-col" onClick={() => navigate('/')}>
              <span className="font-serif text-2xl font-bold text-stone-900 tracking-tighter">LE ' CHARME</span>
              <span className="font-serif text-1xl font-bold text-stone-900 tracking-tighter tracking-widest uppercase">Beauté Boutique</span>
              {/* <img src="/images/logo/logo4.png" alt="LE'CHARME" className="w-24 h-24 object-cover rounded-md" /> */}
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
                  <Link to="/services" className={navClasses('/services')}>{t.nav.services}</Link>
                </div>

                {/* Dropdown Menu */}
                <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 w-48 transition-all duration-300 ${isServicesMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                  <div className="bg-white shadow-xl border border-stone-100 rounded-sm overflow-hidden py-2 w-64">
                    <Link to="/services" className="block px-4 py-3 text-sm uppercase tracking-widest hover:bg-stone-50 hover:text-gold-500 transition-colors">All Services</Link>
                    <Link to="/services/party" className="block px-4 py-3 text-sm uppercase tracking-widest hover:bg-stone-50 hover:text-gold-500 transition-colors">Party / Event Makeup</Link>
                    <Link to="/services/photoshoot" className="block px-4 py-3 text-sm uppercase tracking-widest hover:bg-stone-50 hover:text-gold-500 transition-colors">Photoshoot / Stage</Link>
                    <Link to="/services/bridal" className="block px-4 py-3 text-sm uppercase tracking-widest hover:bg-stone-50 hover:text-gold-500 transition-colors">Bridal Packages</Link>
                    <Link to="/services/guest" className="block px-4 py-3 text-sm uppercase tracking-widest hover:bg-stone-50 hover:text-gold-500 transition-colors">Guest Services</Link>
                    <Link to="/services/education" className="block px-4 py-3 text-sm uppercase tracking-widest hover:bg-stone-50 hover:text-gold-500 transition-colors">Personal Makeup Classes</Link>
                  </div>
                </div>
              </div>
              <Link to="/gallery" className={navClasses('/gallery')}>{t.nav.gallery}</Link>
              <Link to="/contact" className={navClasses('/contact')}>{t.nav.contact}</Link>

              {/* Cart Icon */}
              <Link to="/cart" className="relative text-stone-600 hover:text-gold-500 transition-colors">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link to="/booking" className="rounded-[3px] px-5 py-2 bg-stone-900 text-white text-base uppercase tracking-widest hover:bg-gold-500 transition-colors">
                {t.nav.booking}
              </Link>

              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center space-x-1 text-stone-600 hover:text-gold-500"
                >
                  <Globe size={18} />
                  <span className="text-xs">{currentLang.split(' ')[0]}</span>
                </button>

                {isLangMenuOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 border border-stone-100">
                    {Object.values(Language).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          onLanguageChange(lang);
                          setIsLangMenuOpen(false);
                        }}
                        className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 w-full text-left"
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
              <Link to="/cart" className="relative text-stone-600 hover:text-gold-500">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-stone-600 p-2">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-stone-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-stone-600 hover:text-gold-500 uppercase text-sm tracking-widest">{t.nav.home}</Link>
              {/* Mobile Services Submenu */}
              <div className="w-full text-center">
                <Link to="/services" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-stone-600 hover:text-gold-500 uppercase text-sm tracking-widest">{t.nav.services}</Link>
                <div className="bg-stone-50 py-2 space-y-2">
                  <Link to="/services/party" onClick={() => setIsMenuOpen(false)} className="block text-xs text-stone-500 hover:text-gold-500 uppercase tracking-widest">Party / Event</Link>
                  <Link to="/services/photoshoot" onClick={() => setIsMenuOpen(false)} className="block text-xs text-stone-500 hover:text-gold-500 uppercase tracking-widest">Photoshoot / Stage</Link>
                  <Link to="/services/bridal" onClick={() => setIsMenuOpen(false)} className="block text-xs text-stone-500 hover:text-gold-500 uppercase tracking-widest">Bridal Packages</Link>
                  <Link to="/services/guest" onClick={() => setIsMenuOpen(false)} className="block text-xs text-stone-500 hover:text-gold-500 uppercase tracking-widest">Guest Services</Link>
                  <Link to="/services/education" onClick={() => setIsMenuOpen(false)} className="block text-xs text-stone-500 hover:text-gold-500 uppercase tracking-widest">Classes</Link>
                </div>
              </div>
              <Link to="/gallery" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-stone-600 hover:text-gold-500 uppercase text-sm tracking-widest">{t.nav.gallery}</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-stone-600 hover:text-gold-500 uppercase text-sm tracking-widest">{t.nav.contact}</Link>
              <Link to="/booking" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 font-bold text-gold-700 uppercase text-sm tracking-widest">{t.nav.booking}</Link>
              {/* <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-400 uppercase text-xs tracking-widest">{t.nav.admin}</Link> */}
              <div className="flex space-x-2 py-2">
                {Object.values(Language).map((lang) => (
                  <button key={lang} onClick={() => { onLanguageChange(lang); setIsMenuOpen(false); }} className="text-xs border border-stone-200 px-2 py-1 rounded">
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

      {/* Footer */}
      <footer className="bg-white text-stone-900 pt-16 pb-12 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-24">

            {/* Left Column: Brand, Newsletter, Socials */}
            <div className="flex-1 max-w-lg">
              {/* Logo */}
              <div className="mb-12">
                {/* <Link to="/" className="font-bebasNeue text-6xl tracking-tighter uppercase font-bold text-black" onClick={() => window.scrollTo(0, 0)}>
                  LE'CHARME
                </Link> */}
                <img src="/images/logo/logo4.png" alt="LE'CHARME" className="w-[250px] h-[100px] object-cover rounded-md" />

              </div>

              {/* Newsletter */}
              <div className="mb-10">
                <p className="font-sen text-stone-800 text-sm mb-6 leading-relaxed max-w-md">
                  Sign up to receive email updates with new arrivals, deals and more... unsubscribe anytime.
                </p>
                <form className="flex flex-col sm:flex-row gap-0 max-w-sm" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder="ENTER EMAIL"
                    className="flex-grow bg-white border border-stone-300 px-4 py-3 text-xs tracking-widest outline-none focus:border-black transition-colors uppercase placeholder:text-stone-400 rounded-none appearance-none"
                  />
                  <button
                    type="submit"
                    className="bg-black text-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-stone-800 transition-colors whitespace-nowrap"
                  >
                    Submit
                  </button>
                </form>
                <p className="text-[10px] text-stone-500 mt-3 leading-tight max-w-sm">
                  By clicking "Submit" you agree to receive emails from Le'Charme Beauty and agree to our privacy policy and terms of use.
                </p>
              </div>

              {/* Social Icons */}
              <div className="flex items-center space-x-6 mt-12">
                <a href="https://www.instagram.com/lecharme.beauteboutique" className="bg-black text-white p-2 rounded-full hover:bg-stone-700 transition-colors">
                  <Instagram size={16} />
                </a>
                <a href="https://www.facebook.com/lecharmebeauteboutique" className="bg-black text-white p-2 rounded-full hover:bg-stone-700 transition-colors">
                  <Facebook size={16} fill="white" className="stroke-none" />
                </a>
              </div>
            </div>

            {/* Right Columns: Links */}
            <div className="flex flex-row gap-16 lg:gap-32">
              {/* Site Map */}
              <div>
                <h4 className="uppercase tracking-widest text-xs font-bold mb-6 text-stone-900">Site Map</h4>
                <ul className="space-y-3 text-sm text-stone-600">
                  <li><Link to="/about" className="font-sen hover:text-black transition-colors">About Us</Link></li>
                  <li><Link to="/services" className="font-sen hover:text-black transition-colors">Services</Link></li>
                  <li><Link to="/gallery" className="font-sen hover:text-black transition-colors">Gallery</Link></li>
                  <li><Link to="/booking" className="font-sen hover:text-black transition-colors">Book Now</Link></li>
                  <li><Link to="/contact" className="font-sen hover:text-black transition-colors">Find A Studio</Link></li>
                </ul>
              </div>

              {/* Assistance */}
              <div>
                <h4 className="uppercase tracking-widest text-xs font-bold mb-6 text-stone-900">Assistance</h4>
                <ul className="space-y-3 text-sm text-stone-600">
                  <li><Link to="/contact" className="font-sen hover:text-black transition-colors">Contact</Link></li>
                  <li><Link to="#" className="font-sen hover:text-black transition-colors">Terms of Service</Link></li>
                  <li><Link to="#" className="font-sen hover:text-black transition-colors">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>

          </div>

          <div className="mt-20 pt-8 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-stone-400 uppercase tracking-widest">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <span>&copy; {new Date().getFullYear()} Le'Charme Beauty Boutique</span>
            </div>
            <div>
              <span className="cursor-pointer hover:text-black"><Globe size={14} className="inline mr-1" /> United States (USD $)</span>
            </div>
          </div>
        </div>
      </footer>
      <Chatbot language={currentLang} services={services} />
    </div>
  );
};

export default Layout;
