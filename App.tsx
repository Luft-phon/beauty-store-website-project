
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { Language, Service } from './types';
import { INITIAL_SERVICES, TRANSLATIONS, GALLERIES } from './constants';
import { MOCK_CATEGORIES, MOCK_STATISTICS, MOCK_WHY_CHOOSE_US, MOCK_FEATURED_SERVICE_IDS, MOCK_TESTIMONIALS, MOCK_PROCESS_STEPS } from './data';
import Layout from './components/Layout';
import Chatbot from './components/Chatbot';
import AdminDashboard from './components/AdminDashboard';
import ServiceDetail from './components/ServiceDetail';
import { Camera, Star, Calendar, MapPin, ShoppingBag, Trash2, ArrowRight, Users, Award, Shield, Heart, Sparkles, Trophy, CheckCircle } from 'lucide-react';

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
  
  const Home = () => {
    const featuredServices = services.filter(s => MOCK_FEATURED_SERVICE_IDS.includes(s.id));
    const recentTestimonials = MOCK_TESTIMONIALS.slice(0, 3);

    const getIconForCategory = (iconType: string) => {
      switch(iconType) {
        case 'star': return <Star size={32} />;
        case 'circle': return <div className="w-8 h-8 rounded-full border-2 border-gold-500" />;
        case 'brush': return <div className="w-8 h-1 bg-gold-500 rotate-45" />;
        case 'camera': return <Camera size={32} />;
        default: return <Star size={32} />;
      }
    };

    const getIconForStat = (iconType: string) => {
      switch(iconType) {
        case 'users': return <Users size={32} />;
        case 'star': return <Star size={32} />;
        case 'calendar': return <Calendar size={32} />;
        case 'award': return <Award size={32} />;
        default: return <Star size={32} />;
      }
    };

    const getIconForFeature = (iconType: string) => {
      switch(iconType) {
        case 'trophy': return <Trophy size={40} />;
        case 'shield': return <Shield size={40} />;
        case 'heart': return <Heart size={40} />;
        case 'sparkles': return <Sparkles size={40} />;
        default: return <Trophy size={40} />;
      }
    };

    return (
      <div>
        {/* Hero */}
        <div className="relative h-[85vh] md:h-[90vh] w-full overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="https://picsum.photos/id/325/1920/1080" 
              alt="Hero Background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
          </div>
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4 md:mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 max-w-5xl">
              {t.hero.title}
            </h1>
            <p className="text-stone-200 text-base sm:text-lg md:text-xl tracking-wider uppercase mb-8 md:mb-10 max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 px-4">
              {t.hero.subtitle}
            </p>
            <a 
              href="#/booking" 
              className="px-6 sm:px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-stone-900 transition-all duration-300 uppercase tracking-widest text-xs sm:text-sm font-bold animate-in fade-in duration-1000 delay-500 inline-flex items-center gap-2 group"
            >
              {t.hero.cta}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Statistics Bar */}
        <div className="bg-stone-50 border-y border-stone-200">
          <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {MOCK_STATISTICS.map((stat) => (
                <div key={stat.id} className="text-center group">
                  <div className="text-gold-500 flex justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    {getIconForStat(stat.icon)}
                  </div>
                  <div className="font-serif text-3xl md:text-4xl text-stone-900 mb-2">{stat.value}</div>
                  <div className="text-stone-600 text-sm uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Services Categories */}
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-stone-900 mb-4">Our Services</h2>
            <div className="w-20 h-0.5 bg-gold-500 mx-auto mb-6"></div>
            <p className="text-stone-600 max-w-2xl mx-auto text-base md:text-lg px-4">
              Discover our comprehensive range of beauty and wedding services, crafted to perfection by our expert team.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {MOCK_CATEGORIES.map((category) => (
              <a 
                href={category.link}
                key={category.id} 
                className="group flex flex-col items-center text-center p-6 md:p-8 border border-stone-100 hover:shadow-xl hover:border-gold-200 transition-all duration-300 rounded-sm bg-white"
              >
                <div className="mb-4 md:mb-6 text-gold-500 group-hover:scale-110 group-hover:text-gold-600 transition-all duration-300">
                  {getIconForCategory(category.icon)}
                </div>
                <h3 className="font-serif text-xl md:text-2xl mb-3 text-stone-900 group-hover:text-gold-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-4">
                  {category.description}
                </p>
                <span className="text-gold-600 text-sm font-medium uppercase tracking-wider group-hover:gap-2 flex items-center gap-1 transition-all">
                  Explore <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Featured Services */}
        <div className="bg-stone-50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-stone-900 mb-4">Featured Services</h2>
              <div className="w-20 h-0.5 bg-gold-500 mx-auto mb-6"></div>
              <p className="text-stone-600 max-w-2xl mx-auto text-base md:text-lg px-4">
                Our most popular services, trusted by thousands of satisfied clients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuredServices.map((service) => (
                <div key={service.id} className="bg-white rounded-sm overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-gold-500 text-white px-3 py-1 text-sm font-medium rounded-full">
                      ${service.price}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-xs uppercase tracking-wider text-gold-600 mb-2">{service.category}</div>
                    <h3 className="font-serif text-xl md:text-2xl text-stone-900 mb-3">{service.name}</h3>
                    <p className="text-stone-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                    <div className="flex gap-3">
                      <Link 
                        to={`/service/${service.id}`}
                        className="flex-1 text-center py-2 px-4 border border-stone-300 text-stone-700 hover:bg-stone-50 transition-colors text-sm font-medium"
                      >
                        Learn More
                      </Link>
                      <button
                        onClick={() => addToCart(service)}
                        className="flex-1 py-2 px-4 bg-gold-500 text-white hover:bg-gold-600 transition-colors text-sm font-medium"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10 md:mt-12">
              <a 
                href="#/services"
                className="inline-flex items-center gap-2 px-6 md:px-8 py-3 border-2 border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white transition-all duration-300 text-sm font-medium uppercase tracking-wider group"
              >
                View All Services
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-stone-900 mb-4">Why Choose Us</h2>
            <div className="w-20 h-0.5 bg-gold-500 mx-auto mb-6"></div>
            <p className="text-stone-600 max-w-2xl mx-auto text-base md:text-lg px-4">
              Excellence in every detail, care in every service.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {MOCK_WHY_CHOOSE_US.map((item) => (
              <div key={item.id} className="text-center p-6 group hover:bg-stone-50 transition-colors duration-300 rounded-sm">
                <div className="text-gold-500 flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {getIconForFeature(item.icon)}
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-stone-900 mb-3">{item.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-br from-stone-900 to-stone-800 text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">How It Works</h2>
              <div className="w-20 h-0.5 bg-gold-500 mx-auto mb-6"></div>
              <p className="text-stone-300 max-w-2xl mx-auto text-base md:text-lg px-4">
                Your journey to beauty, simplified in four easy steps.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
              {MOCK_PROCESS_STEPS.map((step, index) => (
                <div key={step.id} className="relative">
                  <div className="text-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 rounded-full border-2 border-gold-500 flex items-center justify-center bg-stone-800">
                      <span className="font-serif text-2xl md:text-3xl text-gold-500">{step.step}</span>
                    </div>
                    <h3 className="font-serif text-xl md:text-2xl mb-3">{step.title}</h3>
                    <p className="text-stone-300 text-sm leading-relaxed">{step.description}</p>
                  </div>
                  {index < MOCK_PROCESS_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gold-500/30 -translate-x-1/2"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-stone-900 mb-4">Client Reviews</h2>
            <div className="w-20 h-0.5 bg-gold-500 mx-auto mb-6"></div>
            <p className="text-stone-600 max-w-2xl mx-auto text-base md:text-lg px-4">
              Don't just take our word for it – hear from our satisfied clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {recentTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-stone-50 p-6 md:p-8 rounded-sm border border-stone-100 hover:border-gold-200 hover:shadow-lg transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <p className="text-stone-700 italic mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="border-t border-stone-200 pt-4">
                  <div className="font-medium text-stone-900">{testimonial.author}</div>
                  {testimonial.service && (
                    <div className="text-sm text-stone-500 mt-1">{testimonial.service}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="https://picsum.photos/id/1027/1920/600" 
              alt="CTA Background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4 md:mb-6 max-w-4xl">
              Ready to Transform Your Look?
            </h2>
            <p className="text-stone-200 text-base md:text-lg mb-8 md:mb-10 max-w-2xl">
              Book your appointment today and experience the difference
            </p>
            <a 
              href="#/booking"
              className="px-6 sm:px-8 py-3 md:py-4 bg-gold-500 text-white hover:bg-gold-600 transition-all duration-300 uppercase tracking-widest text-xs sm:text-sm font-bold inline-flex items-center gap-2 group shadow-lg"
            >
              Get Started
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    );
  };

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
              <Link to={`/services/${service.id}`} className="h-64 overflow-hidden relative block">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                />
              </Link>
              <div className="p-6 text-center flex-grow flex flex-col">
                <span className="text-xs text-gold-500 uppercase tracking-widest font-bold">{service.category}</span>
                <Link to={`/services/${service.id}`}>
                  <h3 className="font-serif text-2xl my-2 hover:text-gold-600 transition-colors">{service.name}</h3>
                </Link>
                <p className="text-stone-500 text-sm mb-4 flex-grow">{service.description}</p>
                <div className="text-lg font-bold text-stone-900 mb-4">${service.price}</div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={handleAdd}
                    disabled={isAdded}
                    className={`flex-1 py-3 px-4 uppercase text-xs font-bold tracking-widest transition-colors duration-300 ${
                      isAdded 
                        ? 'bg-green-600 text-white' 
                        : 'bg-stone-900 text-white hover:bg-gold-500'
                    }`}
                  >
                    {isAdded ? t.servicePage.added : t.servicePage.addToCart}
                  </button>
                  <Link 
                    to={`/services/${service.id}`}
                    className="px-4 py-3 border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white transition-colors text-xs font-bold uppercase"
                  >
                    {t.serviceDetail.view}
                  </Link>
                </div>
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
          <Route path="/services/:id" element={<ServiceDetail services={services} onAddToCart={addToCart} currentLang={currentLang} />} />
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
