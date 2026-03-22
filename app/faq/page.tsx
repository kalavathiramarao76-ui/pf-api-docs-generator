use client;

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Link from 'next/link';

export default function FaqPage() {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const router = useRouter();

  const questions = [
    {
      id: 1,
      question: 'What is AutoGenerate API Documentation?',
      answer: 'AutoGenerate API Documentation is a tool that automatically generates API documentation from code, saving developers time and reducing errors.',
    },
    {
      id: 2,
      question: 'What programming languages and frameworks are supported?',
      answer: 'AutoGenerate API Documentation supports multiple programming languages and frameworks, including JavaScript, Python, Java, and more.',
    },
    {
      id: 3,
      question: 'Can I customize the documentation templates?',
      answer: 'Yes, AutoGenerate API Documentation allows for easy customization of documentation templates to fit your needs.',
    },
    {
      id: 4,
      question: 'What collaboration features are available?',
      answer: 'AutoGenerate API Documentation includes features for collaboration, such as real-time commenting and @mentions, to help teams work together more efficiently.',
    },
    {
      id: 5,
      question: 'How does the change tracking and updates feature work?',
      answer: 'AutoGenerate API Documentation tracks changes and updates to the API, allowing you to easily see what has changed and when.',
    },
  ];

  const handleToggle = (id) => {
    if (activeQuestion === id) {
      setActiveQuestion(null);
    } else {
      setActiveQuestion(id);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
      {questions.map((question) => (
        <div key={question.id} className="mb-4">
          <button
            className="flex justify-between w-full text-left p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
            onClick={() => handleToggle(question.id)}
          >
            <span className="text-lg font-medium">{question.question}</span>
            <AiOutlineArrowRight
              className={`text-lg transition-transform ${
                activeQuestion === question.id ? 'rotate-90' : ''
              }`}
            />
          </button>
          {activeQuestion === question.id && (
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mt-2">
              <p className="text-lg">{question.answer}</p>
            </div>
          )}
        </div>
      ))}
      <Link
        href="/docs"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
      >
        Learn More
      </Link>
    </div>
  );
}