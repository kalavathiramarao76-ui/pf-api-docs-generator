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
  const [apiDocs, setApiDocs] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filteredApiDocs, setFilteredApiDocs] = useState([]);
  const [paginatedApiDocs, setPaginatedApiDocs] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode !== null) {
      setDarkMode(storedDarkMode === 'true');
    }
  }, []);

  useEffect(() => {
    const fetchApiDocs = async () => {
      if (!apiDocs.length) {
        setLoading(true);
        const response = await client.get('/api-documentation');
        setApiDocs(response.data);
        setLoading(false);
      }
    };
    fetchApiDocs();
  }, [apiDocs]);

  useEffect(() => {
    const filteredDocs = apiDocs.filter((item) => {
      const title = item.title.toLowerCase();
      const description = item.description.toLowerCase();
      return title.includes(searchQuery) || description.includes(searchQuery);
    });
    setFilteredApiDocs(filteredDocs);
  }, [apiDocs, searchQuery]);

  useEffect(() => {
    const paginatedDocs = filteredApiDocs.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage);
    setPaginatedApiDocs(paginatedDocs);
  }, [filteredApiDocs, pageNumber, itemsPerPage]);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', darkMode ? 'false' : 'true');
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handlePageChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
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
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {paginatedApiDocs.map((item, index) => (
            <Link
              key={index}
              href={item.href}
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}