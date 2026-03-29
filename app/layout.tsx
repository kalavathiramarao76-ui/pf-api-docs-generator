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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', String(!darkMode));
  };

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <html lang="en" className={darkMode ? 'dark' : ''}>
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>AutoGen Docs</title>
        <meta name="description" content="AutoGen Docs generates high-quality API documentation automatically, saving developers time and effort." />
        <meta name="keywords" content="API documentation tools, API documentation generator, auto generate API docs, API doc generator, swagger alternative" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000" />
        <meta property="og:title" content="AutoGen Docs" />
        <meta property="og:description" content="AutoGen Docs generates high-quality API documentation automatically, saving developers time and effort." />
        <meta property="og:url" content="https://autogen-docs.com" />
        <meta property="og:image" content="https://autogen-docs.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AutoGen Docs" />
        <meta name="twitter:description" content="AutoGen Docs generates high-quality API documentation automatically, saving developers time and effort." />
        <meta name="twitter:image" content="https://autogen-docs.com/twitter-image.png" />
      </head>
      <body className="font-sans text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900">
        <header className="fixed top-0 left-0 right-0 z-10 bg-white dark:bg-gray-800 shadow-md">
          <nav className="container mx-auto flex justify-between items-center py-4">
            <Link href="/" className="text-lg font-bold">
              AutoGen Docs
            </Link>
            <button className="lg:hidden" onClick={toggleNav}>
              {navOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
            </button>
            <ul className={`lg:flex lg:items-center lg:space-x-4 ${navOpen ? 'block' : 'hidden lg:block'} md:space-x-6`}>
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link href="/api-documentation">API Documentation</Link>
              </li>
              <li>
                <Link href="/settings">Settings</Link>
              </li>
              <li>
                <Link href="/collaboration">Collaboration</Link>
              </li>
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
            </ul>
            <button className="lg:ml-4" onClick={toggleDarkMode}>
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </nav>
        </header>
        <main className="container mx-auto p-4 pt-16 md:p-6 lg:p-8 xl:p-12">
          {children}
        </main>
        <footer className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 p-4 md:p-6 lg:p-8 xl:p-12">
          <div className="container mx-auto flex flex-col items-center justify-center">
            <p className="text-sm">
              &copy; 2024 AutoGen Docs. All rights reserved.
            </p>
            <ul className="flex space-x-4 mt-4">
              <li>
                <Link href="/terms">Terms</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </footer>
      </body>
    </html>
  );
}