import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle, Home, ArrowRight, AlertCircle } from 'lucide-react';
import { FadeInSection } from './FadeInSection';

const PaymentCanceled: React.FC = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-stone-50 px-4">
            <FadeInSection className="max-w-xl w-full bg-white p-8 md:p-12 rounded-sm shadow-xl border border-stone-100 text-center">
                <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 border bg-red-50 border-red-100">
                    <XCircle size={48} className="text-red-600" />
                </div>

                <h1 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">
                    Payment Canceled
                </h1>

                <p className="font-sen text-stone-600 mb-8 text-lg leading-relaxed">
                    Your payment was canceled and no charges were made. If you experienced an issue, please try again or contact us for assistance.
                </p>

                <div className="bg-stone-50 p-6 rounded-sm border border-stone-100 mb-8 text-left">
                    <h3 className="font-serif text-lg text-stone-900 mb-4 border-b border-stone-200 pb-2">Status Details</h3>
                    <div className="space-y-3 font-sen text-sm text-stone-600">
                        <div className="flex justify-between">
                            <span>Status:</span>
                            <span className="text-red-600 font-bold uppercase tracking-wider">
                                Canceled
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Message:</span>
                            <span>Transaction aborted by user</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="group flex-1 py-3 px-6 bg-stone-900 text-white font-outfit uppercase tracking-widest text-xs font-bold hover:bg-gold-500 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <Home size={16} />
                        Home
                    </Link>
                    <Link
                        to="/booking"
                        className="group flex-1 py-3 px-6 border border-stone-200 text-stone-600 font-outfit uppercase tracking-widest text-xs font-bold hover:border-gold-500 hover:text-gold-500 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        Try Again
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </FadeInSection>
        </div>
    );
};

export default PaymentCanceled;
