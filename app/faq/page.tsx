use client;

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { FAQ } from '../types';

const faqs: FAQ[] = [
  {
    question: 'What is AutoGen Docs?',
    answer: 'AutoGen Docs generates high-quality API documentation automatically, saving developers time and effort.',
  },
  {
    question: 'What programming languages are supported?',
    answer: 'AutoGen Docs supports multiple programming languages, including JavaScript, Python, and Java.',
  },
  {
    question: 'Can I customize the documentation?',
    answer: 'Yes, AutoGen Docs allows for customization and collaboration, so you can tailor the documentation to your needs.',
  },
  {
    question: 'Is AutoGen Docs integrated with popular API frameworks?',
    answer: 'Yes, AutoGen Docs is integrated with popular API frameworks, making it easy to get started.',
  },
  {
    question: 'Are documentation updates in real-time?',
    answer: 'Yes, AutoGen Docs provides real-time documentation updates, so you can always have the latest information.',
  },
];

const FAQPage = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
      <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4">
          <button
            className="flex justify-between w-full text-left p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
            onClick={() => handleToggle(faq.question)}
          >
            <span className="text-lg font-medium">{faq.question}</span>
            {expanded === faq.question ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
          </button>
          {expanded === faq.question && (
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="text-lg">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQPage;