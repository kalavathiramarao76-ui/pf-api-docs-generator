use client;

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
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

  const handleNavToggle = () => {
    setNavOpen(!navOpen);
  };

  return (
    <html lang="en" className={darkMode ? 'dark' : ''}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>AutoGenerate API Documentation</title>
        <meta
          name="description"
          content="Automatically generates API documentation from code, saving developers time and reducing errors."
        />
        <meta
          name="keywords"
          content="API documentation tools, API documentation generator, auto generate API docs, API doc generator, API documentation software"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000" />
        <meta property="og:title" content="AutoGenerate API Documentation" />
        <meta
          property="og:description"
          content="Automatically generates API documentation from code, saving developers time and reducing errors."
        />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://autogenerate-api-docs.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AutoGenerate API Documentation" />
        <meta
          name="twitter:description"
          content="Automatically generates API documentation from code, saving developers time and reducing errors."
        />
        <meta name="twitter:image" content="/twitter-image.png" />
      </head>
      <body className="font-sans text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900">
        <nav className="fixed top-0 left-0 right-0 z-10 bg-white dark:bg-gray-900 shadow-md">
          <div className="container mx-auto px-4 py-2 flex justify-between items-center">
            <Link href="/" className="text-lg font-bold">
              AutoGenerate API Documentation
            </Link>
            <button
              className="lg:hidden"
              onClick={handleNavToggle}
            >
              {navOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
            </button>
            <ul
              className={`lg:flex lg:items-center lg:justify-end lg:space-x-4 ${navOpen ? 'block' : 'hidden'
                } lg:block`}
            >
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link href="/api-docs">API Docs</Link>
              </li>
              <li>
                <Link href="/settings">Settings</Link>
              </li>
              <li>
                <Link href="/billing">Billing</Link>
              </li>
              <li>
                <Link href="/docs">Docs</Link>
              </li>
            </ul>
            <button
              className="lg:ml-4"
              onClick={handleDarkModeToggle}
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </nav>
        <main className="container mx-auto px-4 py-12 md:py-24 lg:py-36">
          {children}
        </main>
        <footer className="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 py-12">
          <div className="container mx-auto px-4">
            <p>&copy; 2024 AutoGenerate API Documentation</p>
          </div>
        </footer>
      </body>
    </html>
  );
}