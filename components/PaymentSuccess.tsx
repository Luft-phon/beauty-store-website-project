import React, { useEffect, useState, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Home, ArrowRight, Loader2, XCircle } from 'lucide-react';
import { FadeInSection } from './FadeInSection';

const PaymentSuccess: React.FC = () => {
    const [searchParams] = useSearchParams();
    const paymentIntent = searchParams.get('payment_intent');
    const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
    const [message, setMessage] = useState('Verifying payment and securing your appointment...');
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

    // useEffect(() => {
    //     const createEvent = async () => {
    //         if (hasFetched.current) return;
    //         hasFetched.current = true;

    //         const raw = localStorage.getItem('pendingBooking');

    //         if (!raw) {
    //             setStatus('success');
    //             setMessage('Payment received! Please contact us if you do not receive a booking confirmation.');
    //             return;
    //         }

    //         const bookingData = JSON.parse(raw);

    //         // ✅ LƯU VÀO STATE ĐỂ HIỂN THỊ
    //         setPendingBooking(bookingData);

    //         try {
    //             const response = await fetch(`https://beauty-store-website-project.onrender.com/api/calendar/create-event`, {
    //                 // const response = await fetch('http://localhost:3001/api/calendar/create-event', {
    //                 method: 'POST',
    //                 headers: { 'Content-Type': 'application/json' },
    //                 body: JSON.stringify(bookingData),
    //             });

    //             if (response.ok) {
    //                 setStatus('success');
    //                 setMessage('Thank you for your deposit. Your appointment has been secured.');
    //                 localStorage.removeItem('pendingBooking');
    //             } else {
    //                 setStatus('error');
    //                 setMessage('Payment successful, but we could not automatically create the calendar event.');
    //             }
    //         } catch {
    //             setStatus('error');
    //             setMessage('Payment successful, but a network error occurred.');
    //         }
    //     };

    //     createEvent();
    // }, []);
    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const raw = localStorage.getItem('pendingBooking');

        if (!raw) {
            setStatus('success');
            setMessage('Payment received! Please contact us if you do not receive a booking confirmation.');
            return;
        }

        const bookingData = JSON.parse(raw);

        // vẫn giữ để hiển thị thông tin trên UI nếu bạn cần
        setPendingBooking(bookingData);

        // KHÔNG tạo lịch ở đây nữa
        setStatus('success');
        setMessage('Thank you for your deposit. Your appointment has been secured.');

        // có thể xóa localStorage vì webhook đã xử lý
        localStorage.removeItem('pendingBooking');
    }, []);
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-stone-50 px-4">
            <FadeInSection className="max-w-xl w-full bg-white p-8 md:p-12 rounded-sm shadow-xl border border-stone-100 text-center">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 border ${status === 'success' ? 'bg-green-50 border-green-100' :
                    status === 'error' ? 'bg-red-50 border-red-100' :
                        'bg-gold-50 border-gold-100'
                    }`}>
                    {status === 'success' && <CheckCircle size={48} className="text-green-600" />}
                    {status === 'error' && <XCircle size={48} className="text-red-600" />}
                    {status === 'processing' && <Loader2 size={48} className="text-gold-600 animate-spin" />}
                </div>

                <h1 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">
                    {status === 'processing' ? 'Processing...' : status === 'error' ? 'Booking Issue' : 'Payment Successful!'}
                </h1>

                <p className="font-sen text-stone-600 mb-8 text-lg leading-relaxed">
                    {message}
                </p>

                <div className="bg-stone-50 p-6 rounded-sm border border-stone-100 mb-8 text-left">
                    <h3 className="font-serif text-lg text-stone-900 mb-4 border-b border-stone-200 pb-2">Booking Details</h3>
                    <div className="space-y-3 font-sen text-sm text-stone-600">
                        <div className="flex justify-between">
                            <span>Status:</span>
                            <span className={`${status === 'success' ? 'text-green-600' :
                                status === 'error' ? 'text-red-600' :
                                    'text-gold-600'
                                } font-bold uppercase tracking-wider`}>
                                {status === 'success' ? 'Confirmed' : status === 'error' ? 'Attention Needed' : 'Finalizing...'}
                            </span>
                        </div>
                        {paymentIntent && (
                            <div className="flex justify-between">
                                <span>Ref Code:</span>
                                <span className="font-mono text-stone-400">{paymentIntent.slice(-8).toUpperCase()}</span>
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
