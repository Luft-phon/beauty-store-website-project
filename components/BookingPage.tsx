import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Calendar, Loader2 } from 'lucide-react';
import { Translation, Service } from '../types';

interface BookingPageProps {
    t: Translation;
    cart: Service[];
    clearCart: () => void;
}
const BookingPage: React.FC<BookingPageProps> = ({ t, cart, clearCart }) => {
    const [booked, setBooked] = useState(false);
    const [apiStatus, setApiStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [calendarLink, setCalendarLink] = useState<string | null>(null);

    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
    const depositAmount = totalAmount * 0.5;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setApiStatus('loading');

        const formData = new FormData(e.target as HTMLFormElement);
        const bookingData = {
            clientName: formData.get('name') as string,
            clientEmail: formData.get('email') as string,
            date: formData.get('date') as string,
            time: formData.get('time') as string,
            serviceName: cart.map(c => c.name).join(', '),
        };

        // Save booking details for after payment
        localStorage.setItem('pendingBooking', JSON.stringify(bookingData));

        try {
            // Prepare items for Stripe (50% deposit)
            const lineItems = cart.map(item => ({
                name: `Deposit: ${item.name}`,
                price: item.price * 0.5, // 50% deposit
                image: item.image
            }));

            const response = await fetch(`http://localhost:3001/create-checkout-session`, {
                // const response = await fetch(`https://beauty-store-website-project.vercel.app/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items: lineItems }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error('Stripe session creation failed:', data);
                setApiStatus('error');
            }
        } catch (error) {
            console.error('Payment initialization error:', error);
            setApiStatus('error');
        }
    };

    if (booked) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                    <Star size={40} fill="currentColor" />
                </div>
                <h2 className="font-serif text-3xl mb-4">{t.booking.success}</h2>
                <p className="font-sen text-stone-600 mb-8">We have received your appointment details.</p>

                {apiStatus === 'error' ? (
                    <div className="mb-6">
                        <p className="text-red-500 font-bold mb-1">Error: {errorMessage}</p>
                        <p className="text-stone-500 text-sm">Could not automatically add to booking calendar.</p>
                    </div>
                ) : (
                    <div className="mb-8">
                        <p className="text-green-600 mb-4 font-bold">Successfully booked!</p>
                        {/* {calendarLink && (
                            <a
                                href={calendarLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                            >
                                <Calendar size={18} />
                                View on Google Calendar
                            </a>
                        )} */}
                    </div>
                )}

                <a href="/services" className="text-gold-700 underline hover:text-gold-500">Book another</a>
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
                            <span>{t.booking.deposit} Required (50%)</span>
                            <span>${depositAmount}</span>
                        </div>
                    </div>

                    {/* <form action="/create-checkout-session" method="POST" onSubmit={handleSubmit} className="space-y-6"> */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">{t.booking.name}</label>
                                <input required name="name" type="text" className="w-full bg-stone-50 border border-stone-200 p-3 rounded focus:border-gold-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">{t.booking.email}</label>
                                <input required name="email" type="email" className="w-full bg-stone-50 border border-stone-200 p-3 rounded focus:border-gold-500 outline-none" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">{t.booking.selectDate}</label>
                                <input required min={new Date().toISOString().split('T')[0]} name="date" type="date" className="w-full bg-stone-50 border border-stone-200 p-3 rounded focus:border-gold-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">{t.booking.selectTime}</label>
                                <select name="time" className="w-full bg-stone-50 border border-stone-200 p-3 rounded focus:border-gold-500 outline-none">
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
                            <button
                                type="submit"
                                disabled={apiStatus === 'loading'}
                                className="w-full bg-stone-900 text-white py-4 uppercase tracking-widest font-bold hover:bg-gold-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                            >
                                {apiStatus === 'loading' ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        Processing...
                                    </>
                                ) : (
                                    `Proceed to Payment ($${depositAmount})`
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
