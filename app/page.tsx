use client;

import { useState } from 'react';
import Link from 'next/link';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { motion } from 'framer-motion';

interface Feature {
  title: string;
  description: string;
}

interface PricingPlan {
  name: string;
  price: string;
  features: string[];
}

interface FAQ {
  question: string;
  answer: string;
}

const features: Feature[] = [
  {
    title: 'Automatic API Documentation Generation',
    description: 'Save time and reduce errors with our automatic API documentation generation.',
  },
  {
    title: 'Support for Multiple Programming Languages',
    description: 'Our tool supports a wide range of programming languages and frameworks.',
  },
  {
    title: 'Customizable Documentation Templates',
    description: 'Easily customize your API documentation templates to fit your needs.',
  },
  {
    title: 'Collaboration Features for Teams',
    description: 'Collaborate with your team members in real-time with our collaboration features.',
  },
  {
    title: 'Change Tracking and Updates',
    description: 'Track changes and updates to your API with our change tracking feature.',
  },
  {
    title: 'Integration with Popular Development Tools',
    description: 'Our tool integrates seamlessly with popular development tools.',
  },
];

const pricingPlans: PricingPlan[] = [
  {
    name: 'Free',
    price: '$0',
    features: ['Up to 5 users', 'Basic support'],
  },
  {
    name: 'Pro',
    price: '$99',
    features: ['Up to 10 users', 'Priority support'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: ['Unlimited users', 'Dedicated support'],
  },
];

const faqs: FAQ[] = [
  {
    question: 'What is API documentation?',
    answer: 'API documentation is a detailed description of an API, including its endpoints, parameters, and response formats.',
  },
  {
    question: 'How does your tool work?',
    answer: 'Our tool uses advanced algorithms to automatically generate API documentation from your code.',
  },
  {
    question: 'Can I customize the documentation templates?',
    answer: 'Yes, our tool allows you to easily customize your API documentation templates to fit your needs.',
  },
];

export default function Page() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <header className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 text-center">
        <h1 className="text-3xl font-bold">AutoGenerate API Documentation</h1>
        <p className="text-lg">Save time and reduce errors with our automatic API documentation generation.</p>
        <Link href="/dashboard" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Get Started
        </Link>
      </header>
      <main className="max-w-7xl mx-auto p-4 pt-6 md:p-6 lg:p-8">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-4 rounded shadow-md"
            >
              <h2 className="text-lg font-bold">{feature.title}</h2>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </section>
        <section className="mt-8">
          <h2 className="text-2xl font-bold">Pricing Plans</h2>
          <table className="w-full table-auto">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2">Plan</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Features</th>
              </tr>
            </thead>
            <tbody>
              {pricingPlans.map((plan, index) => (
                <tr key={index} className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <td className="px-4 py-2">{plan.name}</td>
                  <td className="px-4 py-2">{plan.price}</td>
                  <td className="px-4 py-2">
                    <ul>
                      {plan.features.map((feature, index) => (
                        <li key={index} className="text-gray-600 dark:text-gray-400">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="mt-8">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <ul>
            {faqs.map((faq, index) => (
              <li key={index} className="bg-white dark:bg-gray-800 p-4 rounded shadow-md mb-4">
                <h3 className="text-lg font-bold">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <footer className="bg-gray-100 dark:bg-gray-800 p-4 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; 2024 AutoGenerate API Documentation</p>
      </footer>
    </div>
  );
}