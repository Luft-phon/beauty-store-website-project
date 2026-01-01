import React from 'react';
import { PaymentElement } from '@stripe/react-stripe-js';

const PaymentForm: React.FC = () => {
    return (
        <div className="space-y-6 pt-6 border-t border-stone-100">
            <h3 className="font-serif text-xl mb-4 text-stone-900">Payment Details</h3>
            <div className="bg-stone-50 p-4 rounded border border-stone-200">
                <PaymentElement />
            </div>
        </div>
    );
};

export default PaymentForm;
