use client;

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoMoon, IoSunny } from 'react-icons/io5';
import Link from 'next/link';
import DashboardLayout from '../../components/DashboardLayout';

export default function DashboardPage() {
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
    localStorage.setItem('darkMode', darkMode ? 'false' : 'true');
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={handleDarkModeToggle}
        >
          {darkMode ? <IoSunny size={24} /> : <IoMoon size={24} />}
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/api-documentation"
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg"
        >
          <h2 className="text-lg font-bold">API Documentation</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Generate high-quality API documentation automatically
          </p>
          <AiOutlinePlus size={24} className="text-gray-600 dark:text-gray-400" />
        </Link>
        <Link
          href="/settings"
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg"
        >
          <h2 className="text-lg font-bold">Settings</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Customize your API documentation experience
          </p>
          <AiOutlinePlus size={24} className="text-gray-600 dark:text-gray-400" />
        </Link>
        <Link
          href="/collaboration"
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg"
        >
          <h2 className="text-lg font-bold">Collaboration</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Invite team members to collaborate on API documentation
          </p>
          <AiOutlinePlus size={24} className="text-gray-600 dark:text-gray-400" />
        </Link>
      </div>
    </DashboardLayout>
  );
}