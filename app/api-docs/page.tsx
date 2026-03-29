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
  }, [searchTerm]);

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

  const isFavorite = (doc) => {
    return favorites.find((favorite) => favorite.id === doc.id) !== undefined;
  };

  return (
    <Layout>
      <SEO title="API Documentation" />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">API Documentation</h1>
        <div className="flex flex-wrap justify-center mb-4">
          {filteredApiDocs.map((doc) => (
            <div key={doc.id} className="w-full md:w-1/2 xl:w-1/3 p-4">
              <div className="bg-white rounded shadow p-4">
                <h2 className="text-xl font-bold mb-2">{doc.title}</h2>
                <p className="text-gray-600">{doc.description}</p>
                <div className="flex justify-between mt-4">
                  <Link href={`/api-docs/${doc.id}`}>
                    <a className="text-blue-600 hover:text-blue-800">View Details</a>
                  </Link>
                  <button
                    className={`text-blue-600 hover:text-blue-800 ${isFavorite(doc) ? 'text-red-600 hover:text-red-800' : ''}`}
                    onClick={() => handleFavorite(doc)}
                  >
                    {isFavorite(doc) ? 'Unfavorite' : 'Favorite'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center mb-4">
          <h2 className="text-2xl font-bold mb-4">Favorites</h2>
          {favorites.map((doc) => (
            <div key={doc.id} className="w-full md:w-1/2 xl:w-1/3 p-4">
              <div className="bg-white rounded shadow p-4">
                <h2 className="text-xl font-bold mb-2">{doc.title}</h2>
                <p className="text-gray-600">{doc.description}</p>
                <div className="flex justify-between mt-4">
                  <Link href={`/api-docs/${doc.id}`}>
                    <a className="text-blue-600 hover:text-blue-800">View Details</a>
                  </Link>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleFavorite(doc)}
                  >
                    Unfavorite
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}