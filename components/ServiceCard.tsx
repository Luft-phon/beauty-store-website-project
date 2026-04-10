import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Service, Translation } from '../types';

interface ServiceCardProps {
    service: Service;
    t: Translation;
    addToCart: (service: Service) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, t, addToCart }) => {
    const [isAdded, setIsAdded] = useState(false);

    const handleAdd = () => {
        addToCart(service);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="rounded-lg bg-white group hover:shadow-xl transition-all duration-300 border border-stone-100 overflow-hidden flex flex-col">
            <Link to={`/services/${service.id}`} className="w-full aspect-[3/4] overflow-hidden">
                <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
            </Link>
            <div className="p-6 text-center flex-grow flex flex-col">
                <span className="text-xs text-gold-500 uppercase tracking-widest font-bold">
                    {service.category === 'PartyEvent' ? 'Party / Event' :
                        service.category === 'Photoshoot' ? 'Photoshoot / Stage' :
                            service.category === 'Bridal' ? 'Bridal' :
                                service.category}

                </span>
                <Link to={`/services/${service.id}`}>
                    <h3 className="font-serif text-2xl my-2 hover:text-gold-600 transition-colors">
                        {t.services?.[service.id]?.name || service.name}
                    </h3>
                </Link>
                <p className="text-left text-stone-500 text-sm mb-4 flex-grow whitespace-pre-line">
                    {t.services?.[service.id]?.description || service.description}
                </p>
                <div className="text-lg font-bold text-stone-900 mb-4">${service.price}</div>

                <div className="flex gap-2">
                    {service.category === 'Bridal' ? (
                        <Link to='/inquiry' className={`font-sen flex-1 py-3 px-4 uppercase text-xs font-bold tracking-widest transition-colors duration-300 ${isAdded
                            ? 'bg-green-600 text-white'
                            : 'bg-stone-900 text-white hover:bg-gold-500'
                            }`}>
                            <span>Inquiry</span>
                        </Link>
                    ) : (
                        <button
                            onClick={handleAdd}
                            disabled={isAdded}
                            className={`font-sen flex-1 py-3 px-4 uppercase text-xs font-bold tracking-widest transition-colors duration-300 ${isAdded
                                ? 'bg-green-600 text-white'
                                : 'bg-stone-900 text-white hover:bg-gold-500'
                                }`}
                        >
                            {isAdded ? t.servicePage.added : t.servicePage.addToCart}
                        </button>
                    )}
                    <Link
                        to={`/services/${service.id}`}
                        className="font-sen px-4 py-3 border border-stone-900 text-stone-900 hover:bg-stone-900 hover:!text-white transition-colors text-xs font-bold uppercase"
                    >
                        {t.serviceDetail.view}
                    </Link>
                </div>
            </div>
        </div>
    );
};
