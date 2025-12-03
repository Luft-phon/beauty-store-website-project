import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Service, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { ArrowLeft, Check, Star, Calendar, Clock, ShoppingBag } from 'lucide-react';

interface ServiceDetailProps {
  services: Service[];
  onAddToCart: (service: Service) => void;
  currentLang: Language;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ services, onAddToCart, currentLang }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isAdded, setIsAdded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const t = TRANSLATIONS[currentLang];

  const service = services.find(s => s.id === id);

  if (!service) {
    return (
      <div className='min-h-[60vh] flex flex-col items-center justify-center px-4'>
        <h2 className='font-serif text-2xl md:text-3xl mb-4'>{t.serviceDetail.notFound}</h2>
        <Link to='/services' className='text-gold-500 underline hover:text-gold-700'>
          {t.serviceDetail.backToServices}
        </Link>
      </div>
    );
  }

  const imageGallery = [
    service.image,
    `https://picsum.photos/id/${Math.floor(Math.random() * 500)}/800/600`,
    `https://picsum.photos/id/${Math.floor(Math.random() * 500)}/800/600`,
    `https://picsum.photos/id/${Math.floor(Math.random() * 500)}/800/600`,
  ];

  const handleAddToCart = () => {
    onAddToCart(service);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const getBenefits = () => {
    switch (service.category) {
      case 'Makeup':
        return ['Professional makeup artist', 'Premium products used', 'Complimentary touch-up kit', 'Photo-ready finish', 'Skin consultation included'];
      case 'Nails':
        return ['Long-lasting gel formula', 'Cuticle care & shaping', 'Hand/foot massage', 'Sterilized tools', 'Wide color selection'];
      case 'Tattooing':
        return ['Semi-permanent results', 'Natural-looking finish', 'Numbing cream provided', 'Free touch-up session', 'Aftercare kit included'];
      case 'Photography':
        return ['Professional photographers', 'High-resolution images', 'Online gallery access', 'Edited & retouched photos', 'Print rights included'];
      default:
        return ['Premium service', 'Expert professionals', 'Quality guaranteed'];
    }
  };

  const benefits = getBenefits();

  const getDuration = () => {
    switch (service.category) {
      case 'Makeup': return t.serviceDetail.durationMakeup;
      case 'Nails': return t.serviceDetail.durationNails;
      case 'Tattooing': return t.serviceDetail.durationTattooing;
      case 'Photography': return t.serviceDetail.durationPhotography;
      default: return '60-90 min';
    }
  };

  const relatedServices = services.filter(s => s.category === service.category && s.id !== service.id).slice(0, 3);

  return (
    <div className='animate-in fade-in duration-500'>
      <div className='max-w-7xl mx-auto px-4 py-4 md:py-6'>
        <button onClick={() => navigate(-1)} className='flex items-center space-x-2 text-stone-600 hover:text-gold-500 transition-colors group'>
          <ArrowLeft size={20} className='group-hover:-translate-x-1 transition-transform' />
          <span className='text-sm uppercase tracking-wider'>{t.serviceDetail.back}</span>
        </button>
      </div>
      <div className='max-w-7xl mx-auto px-4 pb-12 md:pb-16'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 md:mb-16'>
          <div className='space-y-3 md:space-y-4'>
            <div className='relative aspect-[4/3] overflow-hidden rounded-lg shadow-xl'>
              <img src={imageGallery[selectedImage]} alt={service.name} className='w-full h-full object-cover' />
              <div className='absolute top-3 left-3 md:top-4 md:left-4'>
                <span className='bg-gold-500 text-white px-3 py-1 md:px-4 text-xs uppercase tracking-widest font-bold'>{service.category}</span>
              </div>
            </div>
            <div className='grid grid-cols-4 gap-2'>
              {imageGallery.map((img, idx) => (
                <button key={idx} onClick={() => setSelectedImage(idx)} className={`aspect-square rounded-md overflow-hidden border-2 transition-all ${selectedImage === idx ? 'border-gold-500 scale-95' : 'border-transparent hover:border-stone-300'}`}>
                  <img src={img} alt={`${t.serviceDetail.view} ${idx + 1}`} className='w-full h-full object-cover' />
                </button>
              ))}
            </div>
          </div>
          <div className='space-y-4 md:space-y-6'>
            <div>
              <h1 className='font-serif text-3xl md:text-4xl lg:text-5xl text-stone-900 mb-3'>{service.name}</h1>
              <div className='flex items-center space-x-2 mb-4 md:mb-6'>
                <div className='flex text-gold-500'>{[...Array(5)].map((_, i) => (<Star key={i} size={16} fill='currentColor' />))}</div>
                <span className='text-stone-500 text-sm'>(4.9 {t.serviceDetail.rating})</span>
              </div>
              <p className='text-stone-600 text-base md:text-lg leading-relaxed'>{service.description}</p>
            </div>
            <div className='border-y border-stone-200 py-4 md:py-6'>
              <div className='flex items-baseline space-x-3'>
                <span className='text-3xl md:text-4xl font-bold text-stone-900'>${service.price}</span>
                <span className='text-stone-500 text-sm md:text-base'>{t.serviceDetail.perSession}</span>
              </div>
              <p className='text-xs md:text-sm text-stone-400 mt-2'>
                <span className='text-gold-600 font-medium'>$50 {t.serviceDetail.depositRequired}</span> {t.serviceDetail.toSecureBooking}
              </p>
            </div>
            <div>
              <h3 className='font-serif text-xl md:text-2xl mb-3 md:mb-4 text-stone-900'>{t.serviceDetail.whatsIncluded}</h3>
              <ul className='space-y-2 md:space-y-3'>
                {benefits.map((benefit, idx) => (
                  <li key={idx} className='flex items-start space-x-3'>
                    <div className='w-5 h-5 rounded-full bg-gold-100 flex items-center justify-center flex-shrink-0 mt-0.5'>
                      <Check size={14} className='text-gold-600' />
                    </div>
                    <span className='text-stone-600 text-sm md:text-base'>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className='bg-stone-50 p-4 md:p-6 rounded-lg border border-stone-100'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='flex items-center space-x-3'>
                  <div className='w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0'><Clock size={20} className='text-gold-500' /></div>
                  <div>
                    <p className='text-xs text-stone-500 uppercase tracking-wider'>{t.serviceDetail.duration}</p>
                    <p className='font-bold text-stone-900 text-sm md:text-base'>{getDuration()}</p>
                  </div>
                </div>
                <div className='flex items-center space-x-3'>
                  <div className='w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0'><Calendar size={20} className='text-gold-500' /></div>
                  <div>
                    <p className='text-xs text-stone-500 uppercase tracking-wider'>{t.serviceDetail.bookingLabel}</p>
                    <p className='font-bold text-stone-900 text-sm md:text-base'>{t.serviceDetail.advanceRequired}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='space-y-3 pt-2 md:pt-4'>
              <button onClick={handleAddToCart} disabled={isAdded} className={`w-full py-3 md:py-4 px-6 flex items-center justify-center space-x-3 uppercase text-xs md:text-sm font-bold tracking-widest transition-all duration-300 ${isAdded ? 'bg-green-600 text-white' : 'bg-stone-900 text-white hover:bg-gold-500'}`}>
                <ShoppingBag size={20} />
                <span>{isAdded ? t.servicePage.added : t.servicePage.addToCart}</span>
              </button>
              <Link to='/booking' className='w-full py-3 md:py-4 px-6 flex items-center justify-center space-x-3 border-2 border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white uppercase text-xs md:text-sm font-bold tracking-widest transition-all duration-300'>
                <Calendar size={20} />
                <span>{t.serviceDetail.bookNow}</span>
              </Link>
            </div>
          </div>
        </div>
        <div className='border-t border-stone-200 pt-8 md:pt-12 mb-12 md:mb-16'>
          <div className='max-w-4xl'>
            <h3 className='font-serif text-2xl md:text-3xl mb-4 md:mb-6'>{t.serviceDetail.serviceDetails}</h3>
            <div className='space-y-4 md:space-y-6 text-stone-600 leading-relaxed text-sm md:text-base'>
              <p>Our {service.name.toLowerCase()} service is designed to provide you with exceptional results using premium products and techniques. Our experienced professionals ensure that every detail is perfected to your satisfaction.</p>
              <div className='bg-rose-50 border border-rose-100 p-4 md:p-6 rounded-lg'>
                <h4 className='font-bold text-stone-900 mb-2 flex items-center space-x-2 text-sm md:text-base'>
                  <span className='text-gold-500'>★</span>
                  <span>{t.serviceDetail.importantInfo}</span>
                </h4>
                <ul className='text-xs md:text-sm space-y-2 text-stone-700'>
                  <li>• {t.serviceDetail.importantInfoItems.arrive}</li>
                  <li>• {t.serviceDetail.importantInfoItems.cancellation}</li>
                  <li>• {t.serviceDetail.importantInfoItems.consultation}</li>
                  <li>• {t.serviceDetail.importantInfoItems.patchTest}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {relatedServices.length > 0 && (
          <div className='border-t border-stone-200 pt-8 md:pt-12'>
            <h3 className='font-serif text-2xl md:text-3xl mb-6 md:mb-8 text-center'>{t.serviceDetail.youMayLike}</h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8'>
              {relatedServices.map((relatedService) => (
                <Link key={relatedService.id} to={`/services/${relatedService.id}`} className='group bg-white border border-stone-100 hover:shadow-xl transition-all duration-300 overflow-hidden'>
                  <div className='aspect-[4/3] overflow-hidden'>
                    <img src={relatedService.image} alt={relatedService.name} className='w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700' />
                  </div>
                  <div className='p-4 md:p-5'>
                    <span className='text-xs text-gold-500 uppercase tracking-widest font-bold'>{relatedService.category}</span>
                    <h4 className='font-serif text-lg md:text-xl my-2 text-stone-900 group-hover:text-gold-600 transition-colors'>{relatedService.name}</h4>
                    <p className='text-stone-500 text-xs md:text-sm mb-3 line-clamp-2'>{relatedService.description}</p>
                    <div className='text-base md:text-lg font-bold text-stone-900'>${relatedService.price}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetail;
