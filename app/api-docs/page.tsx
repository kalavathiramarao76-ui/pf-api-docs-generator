import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineCode } from 'react-icons/ai';
import { MdOutlineSettings } from 'react-icons/md';
import { TbBrandGithub } from 'react-icons/tb';
import { FaRegClone } from 'react-icons/fa';
import Link from 'next/link';
import { getApiDocs } from '../utils/api-docs';
import Layout from '../components/layout';
import { SEO } from '../components/seo';

export default function ApiDocsPage() {
  const router = useRouter();
  const [apiDocs, setApiDocs] = useState([]);
  const [filteredApiDocs, setFilteredApiDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('title');
  const [filterTags, setFilterTags] = useState([]);
  const [filterCategories, setFilterCategories] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const [suggestions, setSuggestions] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const storedRecentlyViewed = localStorage.getItem('recentlyViewed');
    return storedRecentlyViewed ? JSON.parse(storedRecentlyViewed) : [];
  });

  useEffect(() => {
    const fetchApiDocs = async () => {
      setLoading(true);
      try {
        const data = await getApiDocs();
        setApiDocs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchApiDocs();
  }, []);

  useEffect(() => {
    const filteredDocs = apiDocs.filter((doc) =>
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    ).filter((doc) => {
      if (filterTags.length > 0) {
        return doc.tags.some((tag) => filterTags.includes(tag));
      }
      return true;
    }).filter((doc) => {
      if (filterCategories.length > 0) {
        return doc.categories.some((category) => filterCategories.includes(category));
      }
      return true;
    });

    const sortedDocs = filteredDocs.sort((a, b) => {
      if (sortOrder === 'asc') {
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        } else if (sortBy === 'description') {
          return a.description.localeCompare(b.description);
        }
      } else {
        if (sortBy === 'title') {
          return b.title.localeCompare(a.title);
        } else if (sortBy === 'description') {
          return b.description.localeCompare(a.description);
        }
      }
    });

    setFilteredApiDocs(sortedDocs);
  }, [apiDocs, searchTerm, sortOrder, sortBy, filterTags, filterCategories]);

  useEffect(() => {
    const handleSearchTermChange = () => {
      if (searchTerm.length > 2) {
        const suggestions = apiDocs.filter((doc) =>
          doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.description.toLowerCase().includes(searchTerm.toLowerCase())
        ).map((doc) => doc.title);
        setSuggestions(suggestions.slice(0, 5));
      } else {
        setSuggestions([]);
      }
    };
    handleSearchTermChange();
  }, [searchTerm, apiDocs]);

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Layout>
      <SEO title="API Docs" />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-4">API Docs</h1>
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearchTermChange}
          placeholder="Search API Docs"
          className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-200 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500"
        />
        {suggestions.length > 0 && (
          <ul className="absolute bg-white border border-gray-200 rounded-md w-full mt-2">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                onClick={() => setSearchTerm(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4">
          {filteredApiDocs.map((doc) => (
            <div key={doc.title} className="mb-4">
              <h2 className="text-xl font-bold">{doc.title}</h2>
              <p>{doc.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}