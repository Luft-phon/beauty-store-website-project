
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { Language, Service } from './types';
import { INITIAL_SERVICES, TRANSLATIONS, GALLERIES } from './constants';
import Layout from './components/Layout';
import Chatbot from './components/Chatbot';
import AdminDashboard from './components/AdminDashboard';
import { Camera, Star, Calendar, MapPin, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>(Language.EN);
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [cart, setCart] = useState<Service[]>([]);
  const t = TRANSLATIONS[currentLang];

  const handleUpdateService = (updated: Service) => {
    setServices(prev => prev.map(s => s.id === updated.id ? updated : s));
  };

  const addToCart = (service: Service) => {
    setCart(prev => [...prev, service]);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Page Components defined locally to access 't' and 'services'
  
  const Home = () => (
    <div>
      {/* Hero */}
      <div className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/id/325/1920/1080" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {t.hero.title}
          </h1>
          <p className="text-stone-200 text-lg md:text-xl tracking-wider uppercase mb-10 max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            {t.hero.subtitle}
          </p>
          <a 
            href="#/booking" 
            className="px-8 py-3 border border-white text-white hover:bg-white hover:text-stone-900 transition-all duration-300 uppercase tracking-widest text-sm font-bold animate-in fade-in duration-1000 delay-500"
          >
            {t.hero.cta}
          </a>
        </div>
      </div>

      {/* Intro Categories */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {['Makeup', 'Nails', 'Tattooing', 'Photography'].map((cat, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-6 border border-stone-100 hover:shadow-lg transition-shadow duration-300 rounded-sm">
                    <div className="mb-4 text-gold-500">
                        {idx === 0 && <Star size={32} />}
                        {idx === 1 && <div className="w-8 h-8 rounded-full border-2 border-gold-500" />}
                        {idx === 2 && <div className="w-8 h-1 bg-gold-500 rotate-45" />}
                        {idx === 3 && <Camera size={32} />}
                    </div>
                    <h3 className="font-serif text-xl mb-2">{cat}</h3>
                    <p className="text-stone-500 text-sm">Premium services tailored to your needs.</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div className="animate-in fade-in duration-500">
      {/* About Hero */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/id/64/1920/800" 
            alt="About Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/40"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 text-white">
          <h1 className="font-serif text-4xl md:text-5xl mb-4">{t.aboutPage.title}</h1>
          <p className="uppercase tracking-widest text-sm opacity-90">{t.aboutPage.subtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-6">
            <h2 className="font-serif text-3xl text-stone-900">{t.aboutPage.storyTitle}</h2>
            <div className="w-16 h-0.5 bg-gold-500"></div>
            <p className="text-stone-600 leading-relaxed text-lg">
              {t.aboutPage.storyText}
            </p>
            <p className="text-stone-600 leading-relaxed">
              From the delicate brush strokes of our makeup artists to the capturing eyes of our photographers, we pride ourselves on a multidisciplinary approach that ensures your special days are not just remembered, but cherished.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-gold-200 z-0"></div>
            <img 
              src="https://picsum.photos/id/129/800/600" 
              alt="Our Story" 
              className="relative z-10 shadow-xl w-full"
            />
          </div>
        </div>

        {/* Philosophy */}
        <div className="bg-stone-50 p-12 text-center rounded-lg border border-stone-100 mb-20">
          <h2 className="font-serif text-3xl mb-6">{t.aboutPage.philosophyTitle}</h2>
          <p className="max-w-3xl mx-auto text-stone-600 text-lg leading-relaxed italic">
            "{t.aboutPage.philosophyText}"
          </p>
        </div>

        {/* Team */}
        <div className="text-center">
          <h2 className="font-serif text-3xl mb-12">{t.aboutPage.teamTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { name: 'Sarah L.', role: 'Lead Makeup Artist', img: 'https://picsum.photos/id/64/400/400' },
               { name: 'David C.', role: 'Senior Photographer', img: 'https://picsum.photos/id/91/400/400' },
               { name: 'Elena R.', role: 'Brow Specialist', img: 'https://picsum.photos/id/338/400/400' },
             ].map((member, i) => (
               <div key={i} className="group">
                 <div className="overflow-hidden mb-4 rounded-sm relative">
                   <img 
                     src={member.img} 
                     alt={member.name} 
                     className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                   />
                 </div>
                 <h3 className="font-serif text-xl">{member.name}</h3>
                 <p className="text-stone-500 text-sm uppercase tracking-wide">{member.role}</p>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ServicesPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="font-serif text-4xl text-center mb-12">{t.nav.services}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map(service => {
          const [isAdded, setIsAdded] = useState(false);
          
          const handleAdd = () => {
            addToCart(service);
            setIsAdded(true);
            setTimeout(() => setIsAdded(false), 2000);
          };

          return (
            <div key={service.id} className="bg-white group hover:shadow-xl transition-all duration-300 border border-stone-100 overflow-hidden flex flex-col">
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="p-6 text-center flex-grow flex flex-col">
                <span className="text-xs text-gold-500 uppercase tracking-widest font-bold">{service.category}</span>
                <h3 className="font-serif text-2xl my-2">{service.name}</h3>
                <p className="text-stone-500 text-sm mb-4 flex-grow">{service.description}</p>
                <div className="text-lg font-bold text-stone-900 mb-4">${service.price}</div>
                
                <button 
                  onClick={handleAdd}
                  disabled={isAdded}
                  className={`w-full py-3 px-4 uppercase text-xs font-bold tracking-widest transition-colors duration-300 ${
                    isAdded 
                      ? 'bg-green-600 text-white' 
                      : 'bg-stone-900 text-white hover:bg-gold-500'
                  }`}
                >
                  {isAdded ? t.servicePage.added : t.servicePage.addToCart}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const GalleryPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="font-serif text-4xl text-center mb-4">{t.nav.gallery}</h2>
      <p className="text-center text-stone-500 mb-12 tracking-widest uppercase text-sm">Real Clients, Real Moments</p>
      <div className="columns-1 md:columns-3 gap-4 space-y-4">
        {GALLERIES.map((src, idx) => (
          <div key={idx} className="break-inside-avoid overflow-hidden rounded-sm">
             <img src={src} alt={`Gallery ${idx}`} className="w-full hover:opacity-90 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
  );

  const CartPage = () => {
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

    if (cart.length === 0) {
      return (
         <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
            <ShoppingBag size={64} className="text-stone-300 mb-6" />
            <h2 className="font-serif text-3xl mb-4">{t.cart.empty}</h2>
            <p className="text-stone-500 mb-8">Please browse our services to add items to your cart.</p>
            <Link to="/services" className="px-8 py-3 bg-stone-900 text-white uppercase tracking-widest text-sm font-bold hover:bg-gold-500 transition-colors">
              {t.cart.continue}
            </Link>
         </div>
      );
    }

    return (
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="font-serif text-4xl text-center mb-12">{t.cart.title}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           {/* Item List */}
           <div className="lg:col-span-2 space-y-6">
              {cart.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white p-4 border border-stone-100 shadow-sm rounded-lg">
                      <div className="flex items-center space-x-4">
                          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                          <div>
                              <h4 className="font-serif text-lg font-bold text-stone-900">{item.name}</h4>
                              <span className="text-xs text-stone-500 uppercase tracking-wider">{item.category}</span>
                          </div>
                      </div>
                      <div className="flex items-center space-x-6">
                          <span className="font-bold text-stone-800">${item.price}</span>
                          <button onClick={() => removeFromCart(idx)} className="text-stone-400 hover:text-red-500 transition-colors p-2">
                              <Trash2 size={18} />
                          </button>
                      </div>
                  </div>
              ))}
           </div>

           {/* Summary */}
           <div className="lg:col-span-1">
              <div className="bg-stone-50 p-8 rounded-lg border border-stone-200 sticky top-24">
                  <h3 className="font-serif text-2xl mb-6">{t.cart.subtotal}</h3>
                  <div className="space-y-4 border-b border-stone-200 pb-6 mb-6">
                      <div className="flex justify-between text-stone-600">
                          <span>{cart.length} items</span>
                          <span>${totalAmount}</span>
                      </div>
                  </div>
                  <div className="flex justify-between font-bold text-xl text-stone-900 mb-8">
                      <span>{t.cart.total}</span>
                      <span>${totalAmount}</span>
                  </div>
                  <Link to="/booking" className="block w-full bg-stone-900 text-white text-center py-4 uppercase tracking-widest font-bold hover:bg-gold-500 transition-colors duration-300 flex items-center justify-center space-x-2">
                      <span>{t.cart.proceed}</span>
                      <ArrowRight size={18} />
                  </Link>
                  <Link to="/services" className="block text-center mt-4 text-stone-500 text-sm hover:text-gold-500 underline">
                      {t.cart.continue}
                  </Link>
              </div>
           </div>
        </div>
      </div>
    );
  };

  const BookingPage = () => {
    const [booked, setBooked] = useState(false);
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
    const depositAmount = cart.length * 50;

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setBooked(true);
      clearCart();
      // In a real app, this would send data to backend
    };

    if (booked) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
            <Star size={40} fill="currentColor" />
          </div>
          <h2 className="font-serif text-3xl mb-4">{t.booking.success}</h2>
          <p className="text-stone-600 mb-8">We have received your deposit and appointment details.</p>
          <button onClick={() => setBooked(false)} className="text-gold-700 underline hover:text-gold-500">Book another</button>
        </div>
      );
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <ShoppingBag size={64} className="text-stone-300 mb-6" />
                <h2 className="font-serif text-3xl mb-4">{t.booking.emptyRedirect}</h2>
                <Link to="/services" className="px-8 py-3 bg-stone-900 text-white uppercase tracking-widest text-sm font-bold hover:bg-gold-500 transition-colors">
                    {t.cart.continue}
                </Link>
            </div>
        );
    }

    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
         <h2 className="font-serif text-4xl text-center mb-12">{t.booking.title}</h2>
         
         <div className="grid grid-cols-1 gap-12">
            <div className="bg-white p-8 shadow-lg border border-stone-100">
                <div className="mb-8 pb-8 border-b border-stone-100">
                    <h3 className="font-serif text-2xl mb-4">{t.booking.summary}</h3>
                    <div className="flex justify-between text-stone-600 mb-2">
                        <span>{cart.length} {t.booking.items}</span>
                        <span className="font-bold">${totalAmount}</span>
                    </div>
                    <div className="flex justify-between text-gold-600 font-medium">
                         <span>{t.booking.deposit} Required</span>
                         <span>${depositAmount}</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">{t.booking.name}</label>
                            <input required type="text" className="w-full bg-stone-50 border border-stone-200 p-3 rounded focus:border-gold-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">{t.booking.email}</label>
                            <input required type="email" className="w-full bg-stone-50 border border-stone-200 p-3 rounded focus:border-gold-500 outline-none" />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">{t.booking.selectDate}</label>
                            <input required type="date" className="w-full bg-stone-50 border border-stone-200 p-3 rounded focus:border-gold-500 outline-none" />
                        </div>
                        <div>
                             <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">{t.booking.selectTime}</label>
                             <select className="w-full bg-stone-50 border border-stone-200 p-3 rounded focus:border-gold-500 outline-none">
                                <option>09:00 AM</option>
                                <option>10:00 AM</option>
                                <option>11:00 AM</option>
                                <option>12:00 PM</option>
                                <option>01:00 PM</option>
                                <option>02:00 PM</option>
                                <option>03:00 PM</option>
                                <option>04:00 PM</option>
                                <option>05:00 PM</option>
                             </select>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-stone-100">
                        <button type="submit" className="w-full bg-stone-900 text-white py-4 uppercase tracking-widest font-bold hover:bg-gold-500 transition-colors duration-300">
                            {t.booking.deposit} (${depositAmount}) & {t.booking.confirm}
                        </button>
                        <p className="text-center text-xs text-stone-400 mt-4">Secure payment processing provided by Stripe (Mock).</p>
                    </div>
                </form>
            </div>
         </div>
      </div>
    );
  };

  const ContactPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
                 <h2 className="font-serif text-4xl mb-4">{t.nav.contact}</h2>
                 <p className="text-stone-600 leading-relaxed">
                    We would love to hear from you. Whether it's for a bridal consultation or a quick inquiry about our brow services, our team is ready to assist.
                 </p>
                 <div className="space-y-4">
                     <div className="flex items-center space-x-4">
                         <div className="w-10 h-10 bg-gold-100 flex items-center justify-center text-gold-700 rounded-full"><MapPin size={20}/></div>
                         <div>
                             <h4 className="font-bold text-stone-900">Studio Location</h4>
                             <p className="text-stone-500 text-sm">123 Elegance Blvd, Beverly Hills, CA 90210</p>
                         </div>
                     </div>
                     <div className="flex items-center space-x-4">
                         <div className="w-10 h-10 bg-gold-100 flex items-center justify-center text-gold-700 rounded-full"><Calendar size={20}/></div>
                         <div>
                             <h4 className="font-bold text-stone-900">Business Hours</h4>
                             <p className="text-stone-500 text-sm">Mon-Sat: 09:00 - 19:00</p>
                         </div>
                     </div>
                 </div>
            </div>
            <div className="h-80 lg:h-auto bg-stone-200 rounded-lg overflow-hidden relative">
                 {/* Mock Map */}
                 <img src="https://picsum.photos/seed/map/800/600" alt="Map" className="w-full h-full object-cover opacity-50 grayscale" />
                 <div className="absolute inset-0 flex items-center justify-center">
                     <span className="bg-white px-4 py-2 shadow-md rounded font-bold text-stone-800">Google Maps Integration Placeholder</span>
                 </div>
            </div>
        </div>
    </div>
  );

  return (
    <HashRouter>
      <Layout currentLang={currentLang} onLanguageChange={setCurrentLang} cartCount={cart.length}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin" element={<AdminDashboard services={services} onUpdateService={handleUpdateService} />} />
        </Routes>
      </Layout>
      <Chatbot language={currentLang} services={services} />
    </HashRouter>
  );
};

export default App;
