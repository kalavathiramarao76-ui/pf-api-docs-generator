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
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleFavorite = (doc) => {
    if (favorites.includes(doc)) {
      setFavorites(favorites.filter((favorite) => favorite !== doc));
    } else {
      setFavorites([...favorites, doc]);
    }
  };

  const handleRemoveFavorite = (doc) => {
    setFavorites(favorites.filter((favorite) => favorite !== doc));
  };

  return (
    <Layout>
      <SEO title="API Documentation" />
      <div className="container">
        <h1>API Documentation</h1>
        <div className="search-bar">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search API documentation"
          />
        </div>
        <div className="filter-tags">
          <h2>Filter by tags:</h2>
          <ul>
            {apiDocs.map((doc) => (
              <li key={doc.title}>
                <input
                  type="checkbox"
                  checked={filterTags.includes(doc.tags[0])}
                  onChange={() => {
                    if (filterTags.includes(doc.tags[0])) {
                      setFilterTags(filterTags.filter((tag) => tag !== doc.tags[0]));
                    } else {
                      setFilterTags([...filterTags, doc.tags[0]]);
                    }
                  }}
                />
                <span>{doc.tags[0]}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="filter-categories">
          <h2>Filter by categories:</h2>
          <ul>
            {apiDocs.map((doc) => (
              <li key={doc.title}>
                <input
                  type="checkbox"
                  checked={filterCategories.includes(doc.categories[0])}
                  onChange={() => {
                    if (filterCategories.includes(doc.categories[0])) {
                      setFilterCategories(filterCategories.filter((category) => category !== doc.categories[0]));
                    } else {
                      setFilterCategories([...filterCategories, doc.categories[0]]);
                    }
                  }}
                />
                <span>{doc.categories[0]}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="sort-order">
          <h2>Sort by:</h2>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="title">Title</option>
            <option value="description">Description</option>
          </select>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div className="api-docs-list">
          <h2>API Documentation</h2>
          <ul>
            {filteredApiDocs.map((doc) => (
              <li key={doc.title}>
                <Link href={`/api-docs/${doc.title}`}>
                  <a>
                    <h3>{doc.title}</h3>
                    <p>{doc.description}</p>
                  </a>
                </Link>
                <button onClick={() => handleFavorite(doc)}>
                  {favorites.includes(doc) ? 'Remove from favorites' : 'Add to favorites'}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="favorites-list">
          <h2>Favorites</h2>
          <ul>
            {favorites.map((doc) => (
              <li key={doc.title}>
                <Link href={`/api-docs/${doc.title}`}>
                  <a>
                    <h3>{doc.title}</h3>
                    <p>{doc.description}</p>
                  </a>
                </Link>
                <button onClick={() => handleRemoveFavorite(doc)}>Remove from favorites</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}