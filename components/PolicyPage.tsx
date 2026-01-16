import React from 'react';
import { FadeInSection } from './FadeInSection';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const PolicyPage: React.FC = () => {
    return (
        <FadeInSection className="max-w-4xl mx-auto px-4 py-16 md:py-24">
            <div className="text-center mb-16">
                <span className="block font-serif text-4xl md:text-5xl uppercase tracking-wider text-[#4A3F35] mb-6">
                    Privacy & Store Policy
                </span>
                <div className="w-12 h-[1px] bg-[#C8997C] mx-auto mb-8"></div>
                <p className="font-sen text-stone-500 uppercase tracking-widest text-sm md:text-base max-w-2xl mx-auto">
                    Your privacy and satisfaction are our top priorities
                </p>
            </div>

            <div className="space-y-12">
                {/* Booking Policy */}
                <div className="bg-white p-8 md:p-10 border border-stone-100 shadow-sm rounded-lg">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="p-3 bg-gold-100 rounded-full text-gold-600">
                            <FileText size={24} />
                        </div>
                        <div>
                            <h3 className="font-serif text-2xl text-[#4A3F35] mb-2">Booking & Cancellation Policy</h3>
                            <p className="font-sen text-stone-500 text-sm italic">Effective immediately</p>
                        </div>
                    </div>
                    <div className="font-sen text-stone-600 space-y-4 leading-relaxed">
                        <p>
                            To secure your appointment, a deposit is required at the time of booking. This deposit is non-refundable but may be transferable if treated within the cancellation window.
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Cancellations made 48 hours in advance may reschedule without penalty.</li>
                            <li>Cancellations within 24-48 hours will forfeit the deposit.</li>
                            <li>No-shows or cancellations within 24 hours of the appointment time effectively forfeit the full service fee.</li>
                        </ul>
                    </div>
                </div>

                {/* Privacy Policy */}
                <div className="bg-white p-8 md:p-10 border border-stone-100 shadow-sm rounded-lg">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="p-3 bg-gold-100 rounded-full text-gold-600">
                            <Lock size={24} />
                        </div>
                        <div>
                            <h3 className="font-serif text-2xl text-[#4A3F35] mb-2">Privacy Policy</h3>
                            <p className="font-sen text-stone-500 text-sm italic">How we protect your data</p>
                        </div>
                    </div>
                    <div className="font-sen text-stone-600 space-y-4 leading-relaxed">
                        <p>
                            We collect information that you strictly provide to us for the purpose of booking services or purchasing products. This includes your name, email address, phone number, and payment information.
                        </p>
                        <h4 className="font-bold text-stone-900 mt-4">Data Usage</h4>
                        <p>
                            Your data is used solely for facilitating your appointments, processing transactions, and sending you service-related communications. We do not sell your personal data to third parties.
                        </p>
                        <h4 className="font-bold text-stone-900 mt-4">Security</h4>
                        <p>
                            We implement industry-standard security measures to protect your personal information. Payment processing is handled by secure third-party providers (Stripe) and we do not store your full credit card details on our servers.
                        </p>
                    </div>
                </div>

                {/* Cookie Policy */}
                <div className="bg-white p-8 md:p-10 border border-stone-100 shadow-sm rounded-lg">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="p-3 bg-gold-100 rounded-full text-gold-600">
                            <Eye size={24} />
                        </div>
                        <div>
                            <h3 className="font-serif text-2xl text-[#4A3F35] mb-2">Cookie Policy</h3>
                        </div>
                    </div>
                    <div className="font-sen text-stone-600 space-y-4 leading-relaxed">
                        <p>
                            Our website uses cookies to enhance your browsing experience and analyze site traffic. By continuing to use our site, you consent to our use of cookies.
                        </p>
                    </div>
                </div>
            </div>
        </FadeInSection>
    );
};

export default PolicyPage;
