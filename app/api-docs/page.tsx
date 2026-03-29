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
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const suggestions = apiDocs.filter((doc) =>
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    ).map((doc) => doc.title);
    setSuggestions(suggestions.slice(0, 5));
  }, [apiDocs, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
    setSortOrder(e.target.dataset.order);
  };

  const handleFilterTags = (e) => {
    const tag = e.target.value;
    if (filterTags.includes(tag)) {
      setFilterTags(filterTags.filter((t) => t !== tag));
    } else {
      setFilterTags([...filterTags, tag]);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearchTerm(suggestion);
  };

  return (
    <Layout>
      <SEO title="API Documentation" />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-4">API Documentation</h1>
        <div className="flex flex-col items-center justify-center w-full">
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search API Documentation"
            className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-gray-500 focus:border-gray-500"
          />
          <ul className="absolute bg-white border border-gray-300 rounded-lg w-full">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion}
                onClick={() => handleSelectSuggestion(suggestion)}
                className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center w-full mt-4">
          <select
            value={sortBy}
            onChange={handleSort}
            className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-gray-500 focus:border-gray-500"
          >
            <option value="title" data-order="asc">
              Sort by Title (A-Z)
            </option>
            <option value="title" data-order="desc">
              Sort by Title (Z-A)
            </option>
            <option value="description" data-order="asc">
              Sort by Description (A-Z)
            </option>
            <option value="description" data-order="desc">
              Sort by Description (Z-A)
            </option>
          </select>
        </div>
        <div className="flex flex-col items-center justify-center w-full mt-4">
          <h2 className="text-xl font-bold mb-2">Filter by Tags</h2>
          <ul>
            {apiDocs.map((doc) => (
              <li key={doc.title}>
                <input
                  type="checkbox"
                  value={doc.tags[0]}
                  onChange={handleFilterTags}
                  className="mr-2"
                />
                <span>{doc.tags[0]}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center w-full mt-4">
          <h2 className="text-xl font-bold mb-2">Filter by Categories</h2>
          <ul>
            {apiDocs.map((doc) => (
              <li key={doc.title}>
                <input
                  type="checkbox"
                  value={doc.categories[0]}
                  onChange={handleFilterTags}
                  className="mr-2"
                />
                <span>{doc.categories[0]}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center w-full mt-4">
          <h2 className="text-xl font-bold mb-2">Favorites</h2>
          <ul>
            {favorites.map((favorite) => (
              <li key={favorite}>{favorite}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center w-full mt-4">
          <h2 className="text-xl font-bold mb-2">API Documentation</h2>
          <ul>
            {filteredApiDocs.map((doc) => (
              <li key={doc.title}>
                <h3 className="text-lg font-bold">{doc.title}</h3>
                <p>{doc.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}