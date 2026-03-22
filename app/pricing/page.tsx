use client;

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Link from 'next/link';

export default function PricingPage() {
  const [activePlan, setActivePlan] = useState('monthly');
  const router = useRouter();

  const plans = [
    {
      name: 'Free',
      price: 0,
      features: ['Up to 5 API endpoints', 'Basic support'],
    },
    {
      {
        name: 'Pro',
        price: 29,
        features: ['Up to 50 API endpoints', 'Priority support', 'Customizable templates'],
      },
    {
      {
        name: 'Business',
        price: 99,
        features: ['Unlimited API endpoints', 'Dedicated support', 'Advanced collaboration features'],
      },
    },
  ];

  const handlePlanChange = (plan: string) => {
    setActivePlan(plan);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-4">Pricing</h1>
      <div className="flex flex-col md:flex-row justify-center mb-8">
        <button
          className={`${
            activePlan === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
          } py-2 px-4 rounded-md mr-2 mb-2`}
          onClick={() => handlePlanChange('monthly')}
        >
          Monthly
        </button>
        <button
          className={`${
            activePlan === 'yearly' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
          } py-2 px-4 rounded-md mb-2`}
          onClick={() => handlePlanChange('yearly')}
        >
          Yearly
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md"
          >
            <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
            <p className="text-4xl font-bold mb-4">${plan.price}</p>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature} className="mb-2">
                  <AiOutlineArrowRight className="mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href="/billing"
              className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
            >
              Sign up
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}