
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Phone, Mail, Instagram, Facebook, ShoppingBag } from 'lucide-react';
import { Language, Theme } from '../types';
import { TRANSLATIONS } from '../constants';
import ThemeSelector from './ThemeSelector';

interface LayoutProps {
  children: React.ReactNode;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  cartCount: number;
}

const Layout: React.FC<LayoutProps> = ({ children, currentLang, onLanguageChange, currentTheme, onThemeChange, cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLang];
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navClasses = (path: string) => `
    uppercase tracking-widest text-sm font-semibold transition-colors duration-300
    ${isActive(path) ? 'text-gold-500' : 'text-stone-600 hover:text-gold-500'}
  `;

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-stone-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.location.hash = '/'}>
              <span className="font-serif text-2xl font-bold text-stone-900 tracking-tighter">LUMIÈRE</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={navClasses('/')}>{t.nav.home}</Link>
              <Link to="/about" className={navClasses('/about')}>{t.nav.about}</Link>
              <Link to="/services" className={navClasses('/services')}>{t.nav.services}</Link>
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

              <Link to="/booking" className="px-5 py-2 bg-stone-900 text-white text-sm uppercase tracking-widest hover:bg-gold-500 transition-colors">
                {t.nav.booking}
              </Link>
              
              {/* Theme Switcher */}
              <ThemeSelector 
                currentTheme={currentTheme}
                onThemeChange={onThemeChange}
              />
              
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
              <Link to="/services" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-stone-600 hover:text-gold-500 uppercase text-sm tracking-widest">{t.nav.services}</Link>
              <Link to="/gallery" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-stone-600 hover:text-gold-500 uppercase text-sm tracking-widest">{t.nav.gallery}</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-stone-600 hover:text-gold-500 uppercase text-sm tracking-widest">{t.nav.contact}</Link>
              <Link to="/booking" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 font-bold text-gold-700 uppercase text-sm tracking-widest">{t.nav.booking}</Link>
               <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-400 uppercase text-xs tracking-widest">{t.nav.admin}</Link>
              <div className="flex space-x-2 py-2">
                {Object.values(Language).map((lang) => (
                  <button key={lang} onClick={() => { onLanguageChange(lang); setIsMenuOpen(false); }} className="text-xs border border-stone-200 px-2 py-1 rounded">
                    {lang === Language.VI ? 'VI' : lang === Language.EN ? 'EN' : lang.substring(0,2).toUpperCase()}
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
      <footer className="bg-stone-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="font-serif text-2xl mb-4">LUMIÈRE</h3>
              <p className="text-stone-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                Dedicated to enhancing your natural beauty through exceptional artistry and care.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start space-y-2">
              <h4 className="uppercase tracking-widest text-sm font-bold mb-2">Contact</h4>
              <div className="flex items-center space-x-2 text-stone-400 text-sm">
                <Phone size={16} /> <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-stone-400 text-sm">
                <Mail size={16} /> <span>hello@lumierebeauty.com</span>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-end">
               <h4 className="uppercase tracking-widest text-sm font-bold mb-4">Follow Us</h4>
               <div className="flex space-x-4">
                 <a href="#" className="hover:text-gold-500 transition-colors"><Instagram /></a>
                 <a href="#" className="hover:text-gold-500 transition-colors"><Facebook /></a>
               </div>
            </div>
          </div>
          <div className="border-t border-stone-800 mt-10 pt-6 text-center text-xs text-stone-500">
            <p>&copy; {new Date().getFullYear()} Lumière Beauty & Wedding. {t.footer.rights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
