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
      answer: 'AutoGenerate API Documentation is a tool that automatically generates API documentation from code, saving developers time and reducing errors. It supports multiple programming languages and frameworks, including JavaScript, Python, Java, and more, making it a versatile solution for software development and technical writing.',
    },
    {
      id: 2,
      question: 'What programming languages and frameworks are supported by AutoGenerate API Documentation for API documentation generation?',
      answer: 'AutoGenerate API Documentation supports multiple programming languages and frameworks, including JavaScript, Python, Java, and more, allowing for seamless integration with various software development projects and technical writing initiatives.',
    },
    {
      id: 3,
      question: 'Can I customize the API documentation templates in AutoGenerate API Documentation for my software development project?',
      answer: 'Yes, AutoGenerate API Documentation allows for easy customization of API documentation templates to fit your specific software development needs, enabling you to create tailored technical documentation that meets your project requirements.',
    },
    {
      id: 4,
      question: 'What collaboration features are available in AutoGenerate API Documentation for team-based software development projects?',
      answer: 'AutoGenerate API Documentation includes features for collaboration, such as real-time commenting and @mentions, to help teams work together more efficiently on software development projects and technical writing initiatives, ensuring that all stakeholders are aligned and informed.',
    },
    {
      id: 5,
      question: 'How does the change tracking and updates feature work in AutoGenerate API Documentation for version control and technical documentation?',
      answer: 'AutoGenerate API Documentation tracks changes and updates to the API, allowing you to easily see what has changed and when, providing a clear audit trail for version control and technical documentation purposes, and enabling you to maintain accurate and up-to-date API documentation.',
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
        <meta name="description" content="Discover the power of AutoGenerate API Documentation with our comprehensive FAQ section, covering API documentation generation, customization, collaboration, and version control." />
        <meta name="keywords" content="AutoGenerate API Documentation, API documentation, API documentation generation, API documentation tools, technical writing, software development, collaboration, version control" />
        <meta property="og:title" content="AutoGenerate API Documentation - Frequently Asked Questions" />
        <meta property="og:description" content="Discover the power of AutoGenerate API Documentation with our comprehensive FAQ section, covering API documentation generation, customization, collaboration, and version control." />
        <meta property="og:url" content="https://autogenerate-api-documentation.com/faq" />
        <meta property="og:site_name" content="AutoGenerate API Documentation" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="AutoGenerate API Documentation - Frequently Asked Questions" />
        <meta name="twitter:description" content="Discover the power of AutoGenerate API Documentation with our comprehensive FAQ section, covering API documentation generation, customization, collaboration, and version control." />
      </Head>
      {questions.map((question) => (
        <div key={question.id}>
          <h2 onClick={() => handleToggle(question.id)}>{question.question}</h2>
          {activeQuestion === question.id && <p>{question.answer}</p>}
          {activeQuestion === question.id && (
            <Link href="#top" passHref>
              <a>
                <AiOutlineArrowRight />
                Back to top
              </a>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}