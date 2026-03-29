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
      <div className="dark-mode-toggle">
        <button onClick={handleDarkModeToggle}>
          {darkMode ? <IoSunny /> : <IoMoon />}
        </button>
      </div>
      <div className="search-bar">
        <input
          type="search"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search API documentation"
        />
      </div>
      <div className="api-docs-list">
        {paginatedApiDocs.map((doc) => (
          <div key={doc.id}>
            <h2>{doc.title}</h2>
            <p>{doc.description}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array(Math.ceil(filteredApiDocs.length / itemsPerPage))
          .fill(0)
          .map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={pageNumber === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
      </div>
      {loading && <p>Loading...</p>}
    </DashboardLayout>
  );
}