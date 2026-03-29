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
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const router = useRouter();

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
        try {
          const response = await client.get('/api-documentation', {
            params: {
              limit: itemsPerPage, // fetch only the first page of api docs
              offset: 0,
            },
          });
          setApiDocs(response.data);
          setHasMore(response.data.length === itemsPerPage);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchApiDocs();
  }, [apiDocs]);

  useEffect(() => {
    const debouncedFilter = setTimeout(() => {
      const filteredDocs = apiDocs.filter((item) => {
        const title = item.title.toLowerCase();
        const description = item.description.toLowerCase();
        return title.includes(searchQuery) || description.includes(searchQuery);
      });
      setFilteredApiDocs(filteredDocs);
    }, 300);
    return () => clearTimeout(debouncedFilter);
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
    setPageNumber(1);
    setApiDocs([]);
  };

  const handlePageChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
    if (pageNumber > Math.ceil(apiDocs.length / itemsPerPage)) {
      fetchMoreApiDocs();
    }
  };

  const fetchMoreApiDocs = async () => {
    setLoading(true);
    try {
      const response = await client.get('/api-documentation', {
        params: {
          limit: itemsPerPage,
          offset: apiDocs.length,
        },
      });
      setApiDocs([...apiDocs, ...response.data]);
      setHasMore(response.data.length === itemsPerPage);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={handleDarkModeToggle}
        >
          {darkMode ? <IoSunny size={24} /> : <IoMoon size={24} />
        </button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="search"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search API Docs"
          className="w-full p-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
        />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {paginatedApiDocs.map((doc) => (
            <div key={doc.id} className="mb-4">
              <h2 className="text-lg font-bold">{doc.title}</h2>
              <p>{doc.description}</p>
            </div>
          ))}
          {hasMore && (
            <button
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => handlePageChange(pageNumber + 1)}
            >
              Load More
            </button>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}