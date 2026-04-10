import React, { useState } from 'react';
import { Translation } from '../types';
import { Loader2, CheckCircle } from 'lucide-react';

interface InquiryPageProps {
    t: Translation;
}

const InquiryPage: React.FC<InquiryPageProps> = ({ t }) => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        
        try {
            const formData = new FormData(e.target as HTMLFormElement);
            const data = Object.fromEntries(formData.entries());

            const response = await fetch('http://localhost:3001/api/send-inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus('success');
            } else {
                console.error('Server error response from inquiry API');
                setStatus('error'); // Alternatively handle error gracefully
            }
        } catch (error) {
            console.error('Error submitting inquiry:', error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                    <CheckCircle size={40} />
                </div>
                <h2 className="font-serif text-3xl mb-4">Inquiry Sent Successfully!</h2>
                <p className="font-sen text-stone-600 mb-8">We have received your inquiry and will get back to you soon.</p>
                <a href="/services" className="px-8 py-3 bg-stone-900 text-white uppercase tracking-widest text-sm font-bold hover:bg-gold-500 transition-colors">
                    Back to Services
                </a>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <h2 className="font-serif text-4xl text-center mb-12">Inquiry Form</h2>
            <div className="bg-white p-8 shadow-lg border border-stone-100 rounded-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Your Name</label>
                            <input required name="name" placeholder="John Doe" type="text" className="font-sen w-full bg-[#FAF9F6] border border-stone-200 p-3 rounded focus:border-gold-500 outline-none placeholder:text-stone-400" />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Email Address</label>
                            <input required name="email" placeholder="hello@gmail.com" type="email" className="font-sen w-full bg-[#FAF9F6] border border-stone-200 p-3 rounded focus:border-gold-500 outline-none placeholder:text-stone-400" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Phone Number</label>
                            <input required name="phone" placeholder="(012) 345-6789" type="tel" className="font-sen w-full bg-[#FAF9F6] border border-stone-200 p-3 rounded focus:border-gold-500 outline-none placeholder:text-stone-400" />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Convenience Fee</label>
                            <select name="travelfee" className="font-sen w-full bg-[#FAF9F6] border border-stone-200 p-3 rounded focus:border-gold-500 outline-none text-stone-700">
                                <option value="In-Studio">In-Studio</option>
                                <option value="Travel to you">Travel to you</option>
                                <option value="Out of State">Out of State</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Select Date</label>
                            <input required min={new Date().toISOString().split('T')[0]} name="date" type="date" className="font-sen w-full bg-[#FAF9F6] border border-stone-200 p-3 rounded focus:border-gold-500 outline-none text-stone-700" />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Select Time</label>
                            <select name="time" className="font-sen w-full bg-[#FAF9F6] border border-stone-200 p-3 rounded focus:border-gold-500 outline-none text-stone-700">
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
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Message</label>
                        <textarea name="message" id="message" className="font-sen w-full bg-[#FAF9F6] border border-stone-200 p-3 rounded focus:border-gold-500 outline-none text-stone-700"></textarea>
                    </div>

                    <div className="pt-6 border-t border-stone-100">
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full bg-stone-900 text-white py-4 uppercase tracking-widest font-bold hover:bg-gold-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                        >
                            {status === 'loading' ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Submitting...
                                </>
                            ) : (
                                `Submit Inquiry`
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InquiryPage;
