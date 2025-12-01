import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Service } from '../types';
import { ArrowLeft, Check, Star, Calendar, Clock, ShoppingBag } from 'lucide-react';

interface ServiceDetailProps {
  services: Service[];
  onAddToCart: (service: Service) => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ services, onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isAdded, setIsAdded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const service = services.find(s => s.id === id);

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h2 className="font-serif text-3xl mb-4">Service Not Found</h2>
        <Link to="/services" className="text-gold-500 underline hover:text-gold-700">
          Back to Services
        </Link>
      </div>
    );
  }

  // Generate related images (for gallery)
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

  // Service benefits based on category
  const getBenefits = () => {
    switch (service.category) {
      case 'Makeup':
        return [
          'Professional makeup artist',
          'Premium products used',
          'Complimentary touch-up kit',
          'Photo-ready finish',
          'Skin consultation included'
        ];
      case 'Nails':
        return [
          'Long-lasting gel formula',
          'Cuticle care & shaping',
          'Hand/foot massage',
          'Sterilized tools',
          'Wide color selection'
        ];
      case 'Tattooing':
        return [
          'Semi-permanent results',
          'Natural-looking finish',
          'Numbing cream provided',
          'Free touch-up session',
          'Aftercare kit included'
        ];
      case 'Photography':
        return [
          'Professional photographers',
          'High-resolution images',
          'Online gallery access',
          'Edited & retouched photos',
          'Print rights included'
        ];
      default:
        return ['Premium service', 'Expert professionals', 'Quality guaranteed'];
    }
  };

  const benefits = getBenefits();

  // Related services
  const relatedServices = services
    .filter(s => s.category === service.category && s.id !== service.id)
    .slice(0, 3);

  return (
    <div className="animate-in fade-in duration-500">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-stone-600 hover:text-gold-500 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm uppercase tracking-wider">Back</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-xl">
              <img
                src={imageGallery[selectedImage]}
                alt={service.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-gold-500 text-white px-4 py-1 text-xs uppercase tracking-widest font-bold">
                  {service.category}
                </span>
              </div>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {imageGallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-md overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? 'border-gold-500 scale-95'
                      : 'border-transparent hover:border-stone-300'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Service Info */}
          <div className="space-y-6">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-3">
                {service.name}
              </h1>
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex text-gold-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <span className="text-stone-500 text-sm">(4.9 rating)</span>
              </div>
              <p className="text-stone-600 text-lg leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Price */}
            <div className="border-y border-stone-200 py-6">
              <div className="flex items-baseline space-x-3">
                <span className="text-4xl font-bold text-stone-900">${service.price}</span>
                <span className="text-stone-500">per session</span>
              </div>
              <p className="text-sm text-stone-400 mt-2">
                <span className="text-gold-600 font-medium">$50 deposit</span> required to secure booking
              </p>
            </div>

            {/* What's Included */}
            <div>
              <h3 className="font-serif text-2xl mb-4 text-stone-900">What's Included</h3>
              <ul className="space-y-3">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <div className="w-5 h-5 rounded-full bg-gold-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={14} className="text-gold-600" />
                    </div>
                    <span className="text-stone-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Duration */}
            <div className="bg-stone-50 p-6 rounded-lg border border-stone-100">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <Clock size={20} className="text-gold-500" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-500 uppercase tracking-wider">Duration</p>
                    <p className="font-bold text-stone-900">
                      {service.category === 'Photography' ? '2-8 hours' : '60-90 min'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <Calendar size={20} className="text-gold-500" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-500 uppercase tracking-wider">Booking</p>
                    <p className="font-bold text-stone-900">Advance required</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`w-full py-4 px-6 flex items-center justify-center space-x-3 uppercase text-sm font-bold tracking-widest transition-all duration-300 ${
                  isAdded
                    ? 'bg-green-600 text-white'
                    : 'bg-stone-900 text-white hover:bg-gold-500'
                }`}
              >
                <ShoppingBag size={20} />
                <span>{isAdded ? 'Added to Cart!' : 'Add to Cart'}</span>
              </button>
              
              <Link
                to="/booking"
                className="w-full py-4 px-6 flex items-center justify-center space-x-3 border-2 border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white uppercase text-sm font-bold tracking-widest transition-all duration-300"
              >
                <Calendar size={20} />
                <span>Book Now</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Info Tabs */}
        <div className="border-t border-stone-200 pt-12 mb-16">
          <div className="max-w-4xl">
            <h3 className="font-serif text-3xl mb-6">Service Details</h3>
            <div className="space-y-6 text-stone-600 leading-relaxed">
              <p>
                Our {service.name.toLowerCase()} service is designed to provide you with exceptional results 
                using premium products and techniques. Our experienced professionals ensure that every detail 
                is perfected to your satisfaction.
              </p>
              <div className="bg-rose-50 border border-rose-100 p-6 rounded-lg">
                <h4 className="font-bold text-stone-900 mb-2 flex items-center space-x-2">
                  <span className="text-gold-500">★</span>
                  <span>Important Information</span>
                </h4>
                <ul className="text-sm space-y-2 text-stone-700">
                  <li>• Please arrive 10 minutes early for your appointment</li>
                  <li>• Cancellations require 24-hour notice</li>
                  <li>• Consultation available before booking</li>
                  <li>• Patch test may be required for certain services</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <div className="border-t border-stone-200 pt-12">
            <h3 className="font-serif text-3xl mb-8 text-center">You May Also Like</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedServices.map((relatedService) => (
                <Link
                  key={relatedService.id}
                  to={`/services/${relatedService.id}`}
                  className="group bg-white border border-stone-100 hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={relatedService.image}
                      alt={relatedService.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-gold-500 uppercase tracking-widest font-bold">
                      {relatedService.category}
                    </span>
                    <h4 className="font-serif text-xl my-2 text-stone-900 group-hover:text-gold-600 transition-colors">
                      {relatedService.name}
                    </h4>
                    <p className="text-stone-500 text-sm mb-3">{relatedService.description}</p>
                    <div className="text-lg font-bold text-stone-900">${relatedService.price}</div>
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
