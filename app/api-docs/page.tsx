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
    }
  }, []);

  const handleFavorite = (doc) => {
    const existingFavorite = favorites.find((favorite) => favorite.id === doc.id);
    if (existingFavorite) {
      const newFavorites = favorites.filter((favorite) => favorite.id !== doc.id);
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } else {
      const newFavorites = [...favorites, doc];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };

  const handleRemoveFavorite = (doc) => {
    const newFavorites = favorites.filter((favorite) => favorite.id !== doc.id);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <Layout>
      <SEO title="API Documentation" />
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
        <h1 className="text-3xl font-bold mb-4">API Documentation</h1>
        <div className="flex flex-wrap justify-center mb-4">
          <Link href="/api-docs" className="mr-4">
            All API Docs
          </Link>
          <Link href="/api-docs/favorites" className="mr-4">
            Favorites
          </Link>
        </div>
        <div className="mb-4">
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search API Docs"
            className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div className="mb-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="title">Title</option>
            <option value="description">Description</option>
          </select>
        </div>
        <div className="mb-4">
          <ul>
            {filterTags.map((tag) => (
              <li key={tag} className="inline-block mr-2">
                <span className="bg-gray-200 p-2 rounded-md">{tag}</span>
                <button
                  onClick={() => setFilterTags(filterTags.filter((t) => t !== tag))}
                  className="ml-2 text-gray-600 hover:text-gray-900"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <ul>
            {filterCategories.map((category) => (
              <li key={category} className="inline-block mr-2">
                <span className="bg-gray-200 p-2 rounded-md">{category}</span>
                <button
                  onClick={() => setFilterCategories(filterCategories.filter((c) => c !== category))}
                  className="ml-2 text-gray-600 hover:text-gray-900"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">API Docs</h2>
          <ul>
            {filteredApiDocs.map((doc) => (
              <li key={doc.id} className="mb-4">
                <h3 className="text-xl font-bold mb-2">{doc.title}</h3>
                <p className="text-gray-600">{doc.description}</p>
                <div className="flex justify-between mb-2">
                  <button
                    onClick={() => handleFavorite(doc)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Favorite
                  </button>
                  {favorites.find((favorite) => favorite.id === doc.id) && (
                    <button
                      onClick={() => handleRemoveFavorite(doc)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Remove Favorite
                    </button>
                  )}
                </div>
                <ul>
                  {doc.tags.map((tag) => (
                    <li key={tag} className="inline-block mr-2">
                      <span className="bg-gray-200 p-2 rounded-md">{tag}</span>
                    </li>
                  ))}
                </ul>
                <ul>
                  {doc.categories.map((category) => (
                    <li key={category} className="inline-block mr-2">
                      <span className="bg-gray-200 p-2 rounded-md">{category}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Favorites</h2>
          <ul>
            {favorites.map((favorite) => (
              <li key={favorite.id} className="mb-4">
                <h3 className="text-xl font-bold mb-2">{favorite.title}</h3>
                <p className="text-gray-600">{favorite.description}</p>
                <button
                  onClick={() => handleRemoveFavorite(favorite)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Remove Favorite
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}