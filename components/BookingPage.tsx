import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Calendar } from 'lucide-react';
import PaymentForm from './PaymentForm';
import { Translation, Service } from '../types';
import { MOCK_COMPANY_INFO } from '../data/content.data';
interface BookingPageProps {
    t: Translation;
    cart: Service[];
    clearCart: () => void;
}
const BookingPage: React.FC<BookingPageProps> = ({ t, cart, clearCart }) => {
    const [booked, setBooked] = useState(false);
    const [bookingDetails, setBookingDetails] = useState<{ date: string; time: string } | null>(null);
    const [apiStatus, setApiStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [calendarLink, setCalendarLink] = useState<string | null>(null);
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
    const depositAmount = cart.length * 50;
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const date = formData.get('date') as string;
        const time = formData.get('time') as string;
        setBookingDetails({ date, time });
        setBooked(true);
        setApiStatus('loading');
        try {
            const response = await fetch('http://localhost:3001/api/calendar/create-event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clientName: name,
                    clientEmail: email,
                    serviceName: cart.map(c => c.name).join(', '),
                    date,
                    time
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setApiStatus('success');
                setCalendarLink(data.link);
            } else {
                console.error('API Error:', data.error);
                setErrorMessage(data.details || data.error || 'Unknown server error');
                setApiStatus('error');
            }
        } catch (error) {
            console.error('Network Error:', error);
            setErrorMessage(error instanceof Error ? error.message : 'Network connection failed');
            setApiStatus('error');
        }
        clearCart();
        // In a real app, this would send data to backend
    };
    if (booked) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                    <Star size={40} fill="currentColor" />
                </div>
                <h2 className="font-serif text-3xl mb-4">{t.booking.success}</h2>
                <p className="text-stone-600 mb-8">We have received your deposit and appointment details.</p>
                {apiStatus === 'loading' && <p className="text-stone-500 mb-6">Adding to calendar...</p>}
                {apiStatus === 'success' && calendarLink && (
                    <div className="mb-8">
                        <p className="text-green-600 mb-4 font-bold">Successfully added to our calendar!</p>
                        <a
                            href={calendarLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                        >
                            <Calendar size={18} />
                            View on Google Calendar
                        </a>
                    </div>
                )}
                {apiStatus === 'error' && (
                    <div className="mb-6">
                        <p className="text-red-500 font-bold mb-1">Error: {errorMessage}</p>
                        <p className="text-stone-500 text-sm">Could not automatically add to calendar. Please try the manual link below.</p>
                    </div>
                )}
                {/* Fallback Manual Link */}
                {bookingDetails && (
                    <a
                        href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Beauty Appointment')}&details=${encodeURIComponent('Appointment at Le’Charme Beauté Boutique')}&location=${encodeURIComponent('7862 Warner Ave Ste A, Huntington Beach, CA')}&add=${encodeURIComponent(MOCK_COMPANY_INFO.email)}&dates=${(() => {
                            const dateParts = bookingDetails.date.split('-');
                            const timeParts = bookingDetails.time.match(/(\d+):(\d+) (AM|PM)/);
                            if (!timeParts) return '';
                            let hours = parseInt(timeParts[1]);
                            const minutes = parseInt(timeParts[2]);
                            const isPM = timeParts[3] === 'PM';
                            if (isPM && hours !== 12) hours += 12;
                            if (!isPM && hours === 12) hours = 0;
                            const start = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]), hours, minutes);
                            const end = new Date(start.getTime() + 90 * 60000); // 90 mins duration
                            const format = (d: Date) => d.toISOString().replace(/-|:|\.\d+/g, '');
                            return `${format(start)}/${format(end)}`;
                        })()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mb-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <Calendar size={18} />
                        Add to Google Calendar
                    </a>
                )}
                <button onClick={() => setBooked(false)} className="text-gold-700 underline hover:text-gold-500">Book another</button>
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
                            <span>{t.booking.deposit} Required</span>
                            <span>${depositAmount}</span>
                        </div>
                    </div>
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
                                <input required name="date" type="date" className="w-full bg-stone-50 border border-stone-200 p-3 rounded focus:border-gold-500 outline-none" />
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
                        <PaymentForm />
                        <div className="pt-6 border-t border-stone-100">
                            <button type="submit" className="w-full bg-stone-900 text-white py-4 uppercase tracking-widest font-bold hover:bg-gold-500 transition-colors duration-300">
                                {t.booking.deposit} (${depositAmount}) & {t.booking.confirm}
                            </button>
                            <p className="text-center text-xs text-stone-400 mt-4">Secure payment processing provided by Stripe (Mock).</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default BookingPage;
