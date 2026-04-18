import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Calendar, Loader2, MapPin } from 'lucide-react';
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
    const [travelFee, setTravelFee] = useState("in-studio");
    // Address & Distance State
    const [address, setAddress] = useState('');
    const [distance, setDistance] = useState<string | null>(null);
    const [calculatingDistance, setCalculatingDistance] = useState(false);

    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
    const depositAmount = totalAmount * 0.5;

    // Store Coordinates (7862 Warner Ave Ste A, Huntington Beach, CA 92646)
    // For Google API we can just use the address string
    const STORE_ADDRESS = "7862 Warner Ave Ste A, Huntington Beach, CA 92646";

    const calculateDistance = async () => {
        if (!address) return;
        setCalculatingDistance(true);
        setDistance(null);

        try {
            // Call our backend to keep API key hidden
            const response = await fetch('http://localhost:3001/api/calculate-distance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    origin: address,
                    destination: STORE_ADDRESS
                }),
            });

            const data = await response.json();

            if (data.status === 'OK' && data.rows[0].elements[0].status === 'OK') {
                const element = data.rows[0].elements[0];
                setDistance(`${element.distance.text} (${element.duration.text}) from store`);
            } else {
                setDistance('Could not calculate distance. Please check the address.');
            }
        } catch (error) {
            console.error('Error calculating distance:', error);
            setDistance('Error calculating distance');
        } finally {
            setCalculatingDistance(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setApiStatus('loading');

        const formData = new FormData(e.target as HTMLFormElement);
        const bookingData = {
            clientName: formData.get('name') as string,
            clientEmail: formData.get('email') as string,
            clientAddress: formData.get('address') as string,
            date: formData.get('date') as string,
            time: formData.get('time') as string,
            serviceName: cart.map(c => c.name).join(', '),
            clientPhone: formData.get('phone') as string,
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
                // const response = await fetch(`https://beauty-store-website-project.onrender.com/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: lineItems,
                    date: bookingData.date,
                    time: bookingData.time
                }),
            });

            const data = await response.json();

            if (response.status === 409 && data.redirectUrl) {
                window.location.href = data.redirectUrl;
                return;
            }

            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error('Stripe session creation failed:', data);
                setApiStatus('error');
                setErrorMessage(data.error || 'Payment initialization failed');
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
                                <input required name="name" placeholder="John Doe" type="text" className="w-full bg-stone-50 border border-stone-200 p-3 rounded focus:border-gold-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">{t.booking.email}</label>
                                <input required name="email" placeholder="hello@gmail.com" type="email" className="w-full bg-stone-50 border border-stone-200 p-3 rounded focus:border-gold-500 outline-none" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">{t.booking.phone}</label>
                                <input required name="phone" placeholder="(012) 345-6789" type="text" className="w-full bg-stone-50 border border-stone-200 p-3 rounded focus:border-gold-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">{t.booking.travelfee}</label>
                                <select name="travelfee"
                                    id="travelfee"
                                    value={travelFee}
                                    onChange={(e) => setTravelFee(e.target.value)}
                                    className="w-full bg-stone-50 border border-stone-200 p-3 rounded focus:border-gold-500 outline-none">
                                    <option value="in-studio">{t.booking.travelmethod1}</option>
                                    <option value="to-you">{t.booking.travelmethod2}</option>
                                    <option value="out-of-state">{t.booking.travelmethod3}</option>
                                </select>
                            </div>
                        </div>
                        {/* Address Input Section */}
                        {travelFee !== "in-studio" && (
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">{t.booking.address}</label>
                                <div className="flex gap-2">
                                    <input
                                        required
                                        name="address"
                                        type="text"
                                        placeholder="123 Main St, Anytown, USA"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        // onBlur={calculateDistance} 
                                        className="w-full bg-stone-50 border border-stone-200 p-3 rounded focus:border-gold-500 outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={calculateDistance}
                                        className="px-4 bg-stone-100 border border-stone-200 text-stone-600 rounded hover:bg-gold-50 hover:text-gold-600 hover:border-gold-200 transition-colors"
                                        title="Calculate Distance"
                                    >
                                        <MapPin size={20} />
                                    </button>
                                </div>
                                {calculatingDistance && <p className="text-xs text-stone-400 mt-1 italic">Calculating distance...</p>}
                                {distance && (
                                    <p className="text-sm text-gold-600 mt-1 font-medium flex items-center gap-1">
                                        <MapPin size={14} />
                                        {distance}
                                    </p>
                                )}
                                <p className="font-sans text-sm text-gray-500 mt-1 font-medium flex items-center gap-1">
                                    (Your travel fee will be charged on the day of the appointment.)
                                </p>
                            </div>
                        )}


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">{t.booking.selectDate}</label>
                                <input required min={new Date().toISOString().split('T')[0]} name="date" type="date" className="w-full bg-stone-50 border border-stone-200 p-3 rounded focus:border-gold-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">{t.booking.selectTime}</label>
                                <select name="time" className="w-full bg-stone-50 border border-stone-200 p-3 rounded focus:border-gold-500 outline-none">
                                    <option value="09:00">09:00 AM</option>
                                    <option value="10:00">10:00 AM</option>
                                    <option value="11:00">11:00 AM</option>
                                    <option value="12:00">12:00 PM</option>
                                    <option value="13:00">01:00 PM</option>
                                    <option value="14:00">02:00 PM</option>
                                    <option value="15:00">03:00 PM</option>
                                    <option value="16:00">04:00 PM</option>
                                    <option value="17:00">05:00 PM</option>
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
