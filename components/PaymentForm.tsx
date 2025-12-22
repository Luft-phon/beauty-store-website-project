import React, { useState } from 'react';
import { CreditCard, Calendar, Lock } from 'lucide-react';

interface PaymentFormProps {
    onSubmit?: (data: PaymentData) => void;
}

export interface PaymentData {
    cardNumber: string;
    expiry: string;
    cvc: string;
    zip: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<PaymentData>({
        cardNumber: '',
        expiry: '',
        cvc: '',
        zip: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // Basic formatting can go here (e.g. spacing for card number)
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // This component handles its own display, but the parent form will likely handle the actual submit event for the whole booking.
    // We can expose the data via a change handler if needed, or just let users type for now as part of the visual task.

    return (
        <div className="space-y-6 pt-6 border-t border-stone-100">
            <h3 className="font-serif text-xl mb-4 text-stone-900">Payment Details</h3>

            <div className="space-y-4">
                {/* Card Number */}
                <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Card Number</label>
                    <div className="relative">
                        <input
                            type="text"
                            name="cardNumber"
                            placeholder="0000 0000 0000 0000"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            className="w-full bg-stone-50 border border-stone-200 p-3 pl-10 rounded focus:border-gold-500 outline-none transition-colors"
                            maxLength={19}
                        />
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {/* Expiry */}
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Expiry Date</label>
                        <div className="relative">
                            <input
                                type="text"
                                name="expiry"
                                placeholder="MM/YY"
                                value={formData.expiry}
                                onChange={handleChange}
                                className="w-full bg-stone-50 border border-stone-200 p-3 pl-10 rounded focus:border-gold-500 outline-none transition-colors"
                                maxLength={5}
                            />
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                        </div>
                    </div>

                    {/* CVC */}
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">CVC</label>
                        <div className="relative">
                            <input
                                type="text"
                                name="cvc"
                                placeholder="123"
                                value={formData.cvc}
                                onChange={handleChange}
                                className="w-full bg-stone-50 border border-stone-200 p-3 pl-10 rounded focus:border-gold-500 outline-none transition-colors"
                                maxLength={4}
                            />
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                        </div>
                    </div>

                    {/* Zip Code */}
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Zip Code</label>
                        <input
                            type="text"
                            name="zip"
                            placeholder="12345"
                            value={formData.zip}
                            onChange={handleChange}
                            className="w-full bg-stone-50 border border-stone-200 p-3 rounded focus:border-gold-500 outline-none transition-colors"
                            maxLength={10}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentForm;
