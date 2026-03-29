use client;

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { FaGithub, FaTwitter } from 'react-icons/fa';

export default function Page() {
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode !== null) {
      setDarkMode(storedDarkMode === 'true');
    }
  }, []);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', String(!darkMode));
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <header className="bg-white dark:bg-gray-900 py-4">
        <nav className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-lg font-bold text-gray-900 dark:text-gray-100">
            AutoGen Docs
          </Link>
          <button
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 py-2 px-4 rounded-md"
            onClick={handleDarkModeToggle}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </nav>
      </header>
      <main>
        <section className="bg-gradient-to-r from-blue-500 to-purple-500 py-20">
          <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <h1 className="text-5xl font-bold text-white">AutoGen Docs</h1>
            <p className="text-2xl text-white mt-4">
              Generate high-quality API documentation automatically, saving developers time and effort.
            </p>
            <Link
              href="/dashboard"
              className="bg-orange-500 hover:bg-orange-600 py-2 px-4 rounded-md text-white mt-4"
            >
              Get Started
              <AiOutlineArrowRight className="ml-2" />
            </Link>
          </div>
        </section>
        <section className="py-20">
          <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Automatic API Documentation Generation</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Save time and effort by automatically generating high-quality API documentation.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Support for Multiple Programming Languages</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  AutoGen Docs supports a wide range of programming languages, including Java, Python, and C#.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Customization and Collaboration Tools</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Customize your API documentation with our intuitive tools and collaborate with your team in real-time.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        <section className="bg-gray-100 dark:bg-gray-800 py-20">
          <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-700 p-4 rounded-md shadow-md"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Free</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  $0/month
                </p>
                <ul className="list-disc pl-4 mt-2">
                  <li>1 project</li>
                  <li>100 API calls/month</li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-gray-700 p-4 rounded-md shadow-md"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Pro</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  $9.99/month
                </p>
                <ul className="list-disc pl-4 mt-2">
                  <li>5 projects</li>
                  <li>1,000 API calls/month</li>
                  <li>Priority support</li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white dark:bg-gray-700 p-4 rounded-md shadow-md"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Enterprise</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Custom pricing
                </p>
                <ul className="list-disc pl-4 mt-2">
                  <li>Unlimited projects</li>
                  <li>Unlimited API calls/month</li>
                  <li>Dedicated support</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
        <section className="py-20">
          <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Frequently Asked Questions</h2>
            <div className="mt-4">
              <details className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md">
                <summary className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  What is AutoGen Docs?
                </summary>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  AutoGen Docs is a tool that automatically generates high-quality API documentation.
                </p>
              </details>
              <details className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md mt-4">
                <summary className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  How do I get started with AutoGen Docs?
                </summary>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  To get started with AutoGen Docs, simply sign up for an account and follow the onboarding process.
                </p>
              </details>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-100 dark:bg-gray-800 py-4">
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
          <div className="flex justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400">
              &copy; 2024 AutoGen Docs
            </p>
            <div className="flex items-center">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 mr-4"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400"
              >
                <FaTwitter size={24} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}