use client;

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PricingPlan } from '../components/PricingPlan';
import { Button } from '../components/Button';
import { Heading } from '../components/Heading';
import { Text } from '../components/Text';

export default function Page() {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const router = useRouter();

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      features: ['1 API', '100 requests/day'],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 9.99,
      features: ['10 APIs', '1000 requests/day'],
    },
    {
      id: 'business',
      name: 'Business',
      price: 29.99,
      features: ['50 APIs', '5000 requests/day'],
    },
  ];

  const handlePlanChange = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleUpgrade = () => {
    // Upgrade logic here
    router.push('/settings');
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
      <Heading level={1} className="mb-4">
        Pricing
      </Heading>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {plans.map((plan) => (
          <PricingPlan
            key={plan.id}
            plan={plan}
            isSelected={selectedPlan === plan.id}
            onChange={() => handlePlanChange(plan.id)}
          />
        ))}
      </div>
      <Button onClick={handleUpgrade} className="mb-4">
        Upgrade to {selectedPlan === 'monthly' ? 'Pro' : 'Business'}
      </Button>
      <Text className="text-gray-500">
        By upgrading, you agree to our{' '}
        <a href="/terms" className="text-blue-500 hover:text-blue-700">
          Terms of Service
        </a>
        .
      </Text>
    </div>
  );
}