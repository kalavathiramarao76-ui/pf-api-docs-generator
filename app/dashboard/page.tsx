import client from '../api/client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoMoon, IoSunny } from 'react-icons/io5';
import Link from 'next/link';
import DashboardLayout from '../../components/DashboardLayout';

export default function DashboardPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
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
      <div className="mb-4">
        <input
          type="search"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search API documentation"
          className="p-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 w-full"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          { href: '/api-documentation', title: 'API Documentation', description: 'Generate high-quality API documentation automatically' },
          { href: '/settings', title: 'Settings', description: 'Customize your API documentation experience' },
          { href: '/collaboration', title: 'Collaboration', description: 'Invite team members to collaborate on API documentation' },
        ].filter((item) => {
          const title = item.title.toLowerCase();
          const description = item.description.toLowerCase();
          return title.includes(searchQuery) || description.includes(searchQuery);
        }).map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg"
          >
            <h2 className="text-lg font-bold">{item.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
            <AiOutlinePlus size={24} className="text-gray-600 dark:text-gray-400" />
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
}