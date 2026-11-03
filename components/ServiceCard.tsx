import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Plus } from 'lucide-react';
import { Service, Translation } from '../types';
import { ScrollReveal, TiltSurface } from './ScrollCraftPrimitives';

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

    const categoryLabel =
        service.category === 'PartyEvent'
            ? 'Party & Event'
            : service.category === 'Photoshoot'
            ? 'Photoshoot & Stage'
            : service.category === 'Bridal'
            ? 'Bridal Couture'
            : service.category;

    const localizedName = t.services?.[service.id]?.name || service.name;
    const localizedDesc = t.services?.[service.id]?.description || service.description;

    return (
        <TiltSurface maxDegrees={4.5} className="h-full">
            <article className="group h-full bg-[#FFFDFA] border border-[#DFD3C8] hover:border-[#B98267] transition-colors duration-200 flex flex-col sc-surface-card">
                {/* Editorial Portrait Plate with ScrollReveal Wipe */}
                <ScrollReveal direction="up" className="relative w-full aspect-[4/5] overflow-hidden bg-[#EFE6DD]">
                    <Link to={`/services/${service.id}`} className="block w-full h-full">
                        <img
                            src={service.image}
                            alt={localizedName}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        />
                        {/* Directional subtle bottom scrim for category folio */}
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#241B16]/55 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                            <span className="px-2.5 py-1 bg-[#241B16]/65 backdrop-blur-sm text-[#F7EFE8] font-sen text-[10px] uppercase tracking-[0.18em] font-bold">
                                {categoryLabel}
                            </span>
                            {service.price > 0 && (
                                <span className="px-2.5 py-1 bg-[#FFFDFA]/90 backdrop-blur-sm text-[#342923] font-serif text-base font-bold sc-nums tabular-nums">
                                    ${service.price}
                                </span>
                            )}
                        </div>
                    </Link>
                </ScrollReveal>

                {/* Editorial Ledger Body */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                        <div className="flex items-start justify-between gap-3 mb-2.5">
                            <Link to={`/services/${service.id}`} className="group/title">
                                <h3 className="font-serif text-2xl leading-[1.08] tracking-[-0.02em] text-[#342923] group-hover/title:text-[#B98267] transition-colors">
                                    {localizedName}
                                </h3>
                            </Link>
                        </div>

                        <p className="font-sen text-[#756258] text-sm leading-relaxed mb-6 whitespace-pre-line line-clamp-4">
                            {localizedDesc}
                        </p>
                    </div>

                    {/* Action Bar with 120-160ms UI transitions & press feedback */}
                    <div className="pt-4 border-t border-[#E6DCD2] flex items-center gap-2.5">
                        {service.category === 'Bridal' ? (
                            <Link
                                to="/inquiry"
                                state={{ serviceName: localizedName }}
                                className="font-sen flex-1 py-3 px-4 uppercase text-[11px] font-bold tracking-[0.16em] bg-[#342923] text-white hover:bg-[#B98267] active:scale-[0.98] transition-all duration-150 flex justify-center items-center gap-1.5"
                            >
                                <span>Inquiry</span>
                                <ArrowUpRight size={14} />
                            </Link>
                        ) : (
                            <button
                                type="button"
                                onClick={handleAdd}
                                disabled={isAdded}
                                className={`font-sen flex-1 py-3 px-4 uppercase text-[11px] font-bold tracking-[0.16em] active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-1.5 ${
                                    isAdded
                                        ? 'bg-green-700 text-white'
                                        : 'bg-[#342923] text-white hover:bg-[#B98267]'
                                }`}
                            >
                                {isAdded ? (
                                    <>
                                        <Check size={14} />
                                        <span>{t.servicePage.added}</span>
                                    </>
                                ) : (
                                    <>
                                        <Plus size={14} />
                                        <span>{t.servicePage.addToCart}</span>
                                    </>
                                )}
                            </button>
                        )}
                        <Link
                            to={`/services/${service.id}`}
                            className="font-sen px-4 py-3 border border-[#342923] text-[#342923] hover:bg-[#342923] hover:!text-white active:scale-[0.98] transition-all duration-150 text-[11px] font-bold uppercase tracking-[0.14em]"
                        >
                            {t.serviceDetail.view}
                        </Link>
                    </div>
                </div>
            </article>
        </TiltSurface>
    );
};
