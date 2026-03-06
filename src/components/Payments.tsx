import React, { useEffect, useRef } from 'react';
import { CreditCard, ShieldCheck } from 'lucide-react';
import { Currency } from '../types';

interface PayPalButtonsProps {
  amount: number;
  currency: Currency;
  onSuccess: (details: any) => void;
  type: 'checkout' | 'subscribe';
  planId?: string;
}

export const PayPalButtons: React.FC<PayPalButtonsProps> = ({ amount, currency, onSuccess, type, planId }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // In a real app, you'd load the PayPal SDK here
    // For this demo, we'll simulate the buttons
    console.log(`Loading PayPal ${type} buttons for ${amount} ${currency}`);
  }, [amount, currency, type]);

  return (
    <div className="space-y-4">
      <div className="p-6 bg-stone-50 rounded-2xl border border-black/5">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-stone-600" />
            <span className="font-medium text-stone-900">Payment Method</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
            <ShieldCheck className="w-3 h-3" />
            <span>Secure SSL</span>
          </div>
        </div>

        <div className="space-y-3">
          <button 
            onClick={() => onSuccess({ status: 'COMPLETED', id: 'FAKE_ID' })}
            className="w-full py-3 bg-[#ffc439] hover:bg-[#f2ba36] text-[#111] rounded-lg font-bold flex items-center justify-center gap-2 transition-all"
          >
            <span className="italic font-serif">PayPal</span>
            <span>{type === 'subscribe' ? 'Subscribe' : 'Checkout'}</span>
          </button>
          
          <button 
            onClick={() => onSuccess({ status: 'COMPLETED', id: 'FAKE_ID' })}
            className="w-full py-3 bg-[#2c2e2f] hover:bg-[#232526] text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-all"
          >
            <span>Debit or Credit Card</span>
          </button>
        </div>

        <p className="text-[10px] text-stone-400 text-center mt-4 uppercase tracking-widest leading-relaxed">
          Powered by PayPal. Secure, encrypted payments.
        </p>
      </div>
    </div>
  );
};

export const PricingTable: React.FC<{ currency: Currency, onSelect: (plan: any) => void }> = ({ currency, onSelect }) => {
  const plans = [
    {
      id: 'weekly',
      name: 'Weekly Sessions',
      description: 'One private lesson every week.',
      prices: { USD: 25, GBP: 20, INR: 900 },
      period: 'week'
    },
    {
      id: 'monthly',
      name: 'Monthly Mastery',
      description: 'Four private lessons per month.',
      prices: { USD: 90, GBP: 70, INR: 3200 },
      period: 'month',
      popular: true
    }
  ];

  const getCurrencySymbol = () => {
    switch (currency) {
      case 'INR': return '₹';
      case 'GBP': return '£';
      default: return '$';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {plans.map((plan) => (
        <div 
          key={plan.id}
          className={cn(
            "relative p-8 rounded-3xl border transition-all",
            plan.popular 
              ? "bg-stone-900 text-white border-stone-900 shadow-2xl scale-105 z-10" 
              : "bg-white text-stone-900 border-black/5 hover:border-stone-200"
          )}
        >
          {plan.popular && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
              Most Popular
            </div>
          )}
          <h3 className="text-xl font-serif italic mb-2">{plan.name}</h3>
          <p className={cn("text-sm mb-6", plan.popular ? "text-stone-400" : "text-stone-500")}>
            {plan.description}
          </p>
          <div className="flex items-baseline gap-1 mb-8">
            <span className="text-4xl font-bold">{getCurrencySymbol()}{plan.prices[currency]}</span>
            <span className={cn("text-sm", plan.popular ? "text-stone-400" : "text-stone-500")}>/{plan.period}</span>
          </div>
          <button
            onClick={() => onSelect(plan)}
            className={cn(
              "w-full py-4 rounded-xl font-bold transition-all",
              plan.popular 
                ? "bg-white text-stone-900 hover:bg-stone-100" 
                : "bg-stone-900 text-white hover:bg-stone-800"
            )}
          >
            Choose Plan
          </button>
        </div>
      ))}
    </div>
  );
};

import { cn } from '../lib/utils';
