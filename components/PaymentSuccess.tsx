import React, { useEffect, useState, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Home, ArrowRight, Loader2, XCircle, Clock } from 'lucide-react';
import { FadeInSection } from './FadeInSection';

const BACKEND_BASE_URL = 'https://beauty-store-website-project.onrender.com';

const PaymentSuccess: React.FC = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const paymentIntent = searchParams.get('payment_intent');
    const [status, setStatus] = useState<'processing' | 'success' | 'pending' | 'error'>('processing');
    const [message, setMessage] = useState('Verifying payment status with our server...');
    const hasFetched = useRef(false);

    type PendingBooking = {
        clientName?: string;
        clientEmail?: string;
        clientAddress?: string;
        phone?: string;
        serviceName?: string;
        date?: string;
        time?: string;
    };

    const [pendingBooking, setPendingBooking] = useState<PendingBooking | null>(null);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const raw = localStorage.getItem('pendingBooking');
        if (raw) {
            try {
                setPendingBooking(JSON.parse(raw));
            } catch {
                // Ignore malformed localStorage data
            }
            localStorage.removeItem('pendingBooking');
        }

        // If no Stripe session_id is present in the URL, do NOT claim verified payment confirmation
        if (!sessionId) {
            setStatus('pending');
            setMessage(
                'Your checkout submission was received. Your appointment will be confirmed by email once payment is verified by Stripe.'
            );
            return;
        }

        const verifySessionStatus = async () => {
            try {
                const response = await fetch(
                    `${BACKEND_BASE_URL}/api/stripe/session-status?session_id=${encodeURIComponent(sessionId)}`,
                    { method: 'GET' }
                );

                if (!response.ok) {
                    setStatus('pending');
                    setMessage(
                        'Checkout completed! We are finalizing your payment verification with Stripe and will send your confirmation email shortly.'
                    );
                    return;
                }

                const data = await response.json();
                if (data.bookingData) {
                    setPendingBooking(prev => prev || data.bookingData);
                }

                if (data.status === 'PAID') {
                    setStatus('success');
                    setMessage('Thank you for your deposit. Your payment is verified and your appointment has been secured.');
                } else if (data.status === 'PAYMENT_FAILED' || data.status === 'CANCELED') {
                    setStatus('error');
                    setMessage('Your payment could not be completed. No confirmation was issued. Please try again or contact us.');
                } else {
                    // PENDING_PAYMENT (e.g. US Bank Account ACH settlement in progress)
                    setStatus('pending');
                    setMessage(
                        'Your payment is currently processing (ACH bank transfers take 2–4 business days to settle). You will receive your booking confirmation email automatically once Stripe confirms settlement.'
                    );
                }
            } catch {
                setStatus('pending');
                setMessage(
                    'Checkout completed! Your appointment confirmation email will be sent automatically once our server verifies payment with Stripe.'
                );
            }
        };

        verifySessionStatus();
    }, [sessionId]);

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-stone-50 px-4">
            <FadeInSection className="max-w-xl w-full bg-white p-8 md:p-12 rounded-sm shadow-xl border border-stone-100 text-center">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 border ${
                    status === 'success' ? 'bg-green-50 border-green-100' :
                    status === 'error' ? 'bg-red-50 border-red-100' :
                    'bg-gold-50 border-gold-100'
                }`}>
                    {status === 'success' && <CheckCircle size={48} className="text-green-600" />}
                    {status === 'error' && <XCircle size={48} className="text-red-600" />}
                    {status === 'pending' && <Clock size={48} className="text-gold-600" />}
                    {status === 'processing' && <Loader2 size={48} className="text-gold-600 animate-spin" />}
                </div>

                <h1 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">
                    {status === 'processing'
                        ? 'Verifying Payment...'
                        : status === 'error'
                            ? 'Payment Not Confirmed'
                            : status === 'pending'
                                ? 'Payment Processing'
                                : 'Payment Successful!'}
                </h1>

                <p className="font-sen text-stone-600 mb-8 text-lg leading-relaxed">
                    {message}
                </p>

                <div className="bg-stone-50 p-6 rounded-sm border border-stone-100 mb-8 text-left">
                    <h3 className="font-serif text-lg text-stone-900 mb-4 border-b border-stone-200 pb-2">Booking Details</h3>
                    <div className="space-y-3 font-sen text-sm text-stone-600">
                        <div className="flex justify-between">
                            <span>Status:</span>
                            <span className={`${
                                status === 'success' ? 'text-green-600' :
                                status === 'error' ? 'text-red-600' :
                                'text-gold-600'
                            } font-bold uppercase tracking-wider`}>
                                {status === 'success'
                                    ? 'Confirmed'
                                    : status === 'error'
                                        ? 'Not Confirmed'
                                        : status === 'pending'
                                            ? 'Pending Verification'
                                            : 'Verifying...'}
                            </span>
                        </div>
                        {(paymentIntent || sessionId) && (
                            <div className="flex justify-between">
                                <span>Ref Code:</span>
                                <span className="font-mono text-stone-400">
                                    {(paymentIntent || sessionId || '').slice(-8).toUpperCase()}
                                </span>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <span>Email:</span>
                            {pendingBooking && (
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>{pendingBooking.clientEmail}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {pendingBooking?.clientAddress && (
                            <div className="flex justify-between">
                                <span>Address:</span>
                                <div className="space-y-2 text-sm text-right max-w-[200px]">
                                    <span>{pendingBooking.clientAddress}</span>
                                </div>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <span>Date:</span>
                            {pendingBooking && (
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>{pendingBooking.date}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-between">
                            <span>Time:</span>
                            {pendingBooking && (
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>{pendingBooking.time}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-between">
                            <span>Service:</span>
                            {pendingBooking && (
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>{pendingBooking.serviceName}</span>
                                    </div>
                                </div>
                            )}
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
                        to="/services"
                        className="group flex-1 py-3 px-6 border border-stone-200 text-stone-600 font-outfit uppercase tracking-widest text-xs font-bold hover:border-gold-500 hover:text-gold-500 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        Book Another
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </FadeInSection>
        </div>
    );
};

export default PaymentSuccess;
