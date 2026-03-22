use client;

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Link from 'next/link';
import Head from 'next/head';

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
    <div>
      <Head>
        <title>AutoGenerate API Documentation - Frequently Asked Questions</title>
        <meta name="description" content="Get answers to frequently asked questions about AutoGenerate API Documentation, including features, customization, and collaboration for API documentation, software development, and technical writing." />
        <meta name="keywords" content="AutoGenerate API Documentation, API documentation, API documentation tool, FAQ, frequently asked questions, software development, technical writing, API documentation generator, automatic API documentation, api docs, documentation generator, technical documentation, developer tools" />
        <meta property="og:title" content="AutoGenerate API Documentation - Frequently Asked Questions" />
        <meta property="og:description" content="Get answers to frequently asked questions about AutoGenerate API Documentation, including features, customization, and collaboration for API documentation, software development, and technical writing." />
        <meta property="og:url" content={`${router.asPath}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="AutoGenerate API Documentation - Frequently Asked Questions" />
        <meta name="twitter:description" content="Get answers to frequently asked questions about AutoGenerate API Documentation, including features, customization, and collaboration for API documentation, software development, and technical writing." />
      </Head>
      <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
        <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions about AutoGenerate API Documentation</h1>
        <p className="text-lg mb-8">Find answers to common questions about AutoGenerate API Documentation, including features, customization, and collaboration.</p>
        {questions.map((question) => (
          <div key={question.id} className="mb-6">
            <button
              className={`flex justify-between w-full text-lg font-medium ${activeQuestion === question.id ? 'text-blue-600' : 'text-gray-900'}`}
              onClick={() => handleToggle(question.id)}
            >
              <span>{question.question}</span>
              <AiOutlineArrowRight className={`text-lg ${activeQuestion === question.id ? 'rotate-90' : ''}`} />
            </button>
            {activeQuestion === question.id && (
              <div className="mt-4 text-lg">
                <p>{question.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}