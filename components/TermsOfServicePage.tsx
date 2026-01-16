import React from 'react';
import { FadeInSection } from './FadeInSection';
import { Scale, AlertCircle, HelpCircle } from 'lucide-react';

const TermsOfServicePage: React.FC = () => {
    return (
        <FadeInSection className="max-w-4xl mx-auto px-4 py-16 md:py-24">
            <div className="text-center mb-16">
                <span className="block font-serif text-4xl md:text-5xl uppercase tracking-wider text-[#4A3F35] mb-6">
                    Terms of Service
                </span>
                <div className="w-12 h-[1px] bg-[#C8997C] mx-auto mb-8"></div>
                <p className="font-sen text-stone-500 uppercase tracking-widest text-sm md:text-base max-w-2xl mx-auto">
                    Please read these terms carefully before using our services
                </p>
            </div>

            <div className="space-y-12">
                <div className="bg-white p-8 md:p-10 border border-stone-100 shadow-sm rounded-lg">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="p-3 bg-gold-100 rounded-full text-gold-600">
                            <Scale size={24} />
                        </div>
                        <div>
                            <h3 className="font-serif text-2xl text-[#4A3F35] mb-2">General Terms</h3>
                        </div>
                    </div>
                    <div className="font-sen text-stone-600 space-y-4 leading-relaxed">
                        <p>
                            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this websites particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                        </p>
                        <p>
                            ANY PARTICIPATION IN THIS SERVICE WILL CONSTITUTE ACCEPTANCE OF THIS AGREEMENT. IF YOU DO NOT AGREE TO ABIDE BY THE ABOVE, PLEASE DO NOT USE THIS SERVICE.
                        </p>
                    </div>
                </div>

                <div className="bg-white p-8 md:p-10 border border-stone-100 shadow-sm rounded-lg">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="p-3 bg-gold-100 rounded-full text-gold-600">
                            <AlertCircle size={24} />
                        </div>
                        <div>
                            <h3 className="font-serif text-2xl text-[#4A3F35] mb-2">Booking & Cancellation Policy</h3>
                        </div>
                    </div>
                    <div className="font-sen text-stone-600 space-y-4 leading-relaxed">
                        <ul className="list-disc pl-5 space-y-3">
                            <li>A 50% deposit is required to confirm your appointment.</li>
                            <li>No refunds will be issued for cancellations.</li>
                            <li>Rescheduling incurs a 20% fee of the total service cost.</li>
                            <li>A 10-minute grace period is allowed with no extra charge.</li>
                            <li>If you are 15–30 minutes late, a per-minute late fee will apply.</li>
                            <li>Arriving after 30 minutes late will result in an appointment cancellation with no deposit refund.</li>
                        </ul>
                        <p className="font-sen opacity-70 italic">Please arrive on time to ensure a smooth experience for you and our team.</p>
                    </div>
                </div>

                <div className="bg-white p-8 md:p-10 border border-stone-100 shadow-sm rounded-lg">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="p-3 bg-gold-100 rounded-full text-gold-600">
                            <HelpCircle size={24} />
                        </div>
                        <div>
                            <h3 className="font-serif text-2xl text-[#4A3F35] mb-2">Other Policies</h3>
                        </div>
                    </div>
                    <div className="font-sen text-stone-600 space-y-4 leading-relaxed">
                        <li>All services are non-refundable.</li>
                        <li>If you are unsatisfied with the quality of our work, we will redo the service at no cost, provided you notify us immediately.</li>
                        <li>You will be charged for any repair costs resulting from damage caused by you.</li>
                        <li>Once you leave the salon, it is understood that you have accepted and are satisfied with the service provided.</li>

                    </div>
                </div>
            </div>
        </FadeInSection>
    );
};

export default TermsOfServicePage;
