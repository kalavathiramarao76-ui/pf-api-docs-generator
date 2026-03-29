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
  }, [apiDocs, itemsPerPage]);

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
      const offset = apiDocs.length;
      const response = await client.get('/api-documentation', {
        params: {
          limit: itemsPerPage,
          offset,
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
        <h1 className="text-2xl font-bold">AutoGen Docs</h1>
        <button
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
          onClick={handleDarkModeToggle}
        >
          {darkMode ? <IoSunny size={20} /> : <IoMoon size={20} />}
        </button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="search"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search API Docs"
          className="w-full py-2 pl-10 text-sm text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <Link href="/create-api-doc">
          <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
            <AiOutlinePlus size={20} />
            Create API Doc
          </a>
        </Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {paginatedApiDocs.map((apiDoc) => (
            <div key={apiDoc.id} className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-lg font-bold">{apiDoc.title}</h2>
              <p className="text-gray-600">{apiDoc.description}</p>
            </div>
          ))}
        </div>
      )}
      {hasMore && !loading && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          onClick={() => handlePageChange(pageNumber + 1)}
        >
          Load More
        </button>
      )}
    </DashboardLayout>
  );
}