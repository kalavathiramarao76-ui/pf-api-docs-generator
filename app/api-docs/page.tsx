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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
    setSortOrder(e.target.dataset.order);
  };

  const handleFilterTags = (e) => {
    const tag = e.target.value;
    if (e.target.checked) {
      setFilterTags([...filterTags, tag]);
    } else {
      setFilterTags(filterTags.filter((t) => t !== tag));
    }
  };

  const handleFilterCategories = (e) => {
    const category = e.target.value;
    if (e.target.checked) {
      setFilterCategories([...filterCategories, category]);
    } else {
      setFilterCategories(filterCategories.filter((c) => c !== category));
    }
  };

  const handleFavorite = (doc) => {
    if (favorites.includes(doc.id)) {
      setFavorites(favorites.filter((id) => id !== doc.id));
    } else {
      setFavorites([...favorites, doc.id]);
    }
  };

  return (
    <Layout>
      <SEO title="API Docs" />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">API Docs</h1>
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search API Docs"
          className="w-full p-2 mb-4 border border-gray-400 rounded"
        />
        <div className="flex justify-between mb-4">
          <select value={sortBy} onChange={handleSort} className="p-2 border border-gray-400 rounded">
            <option value="title">Title</option>
            <option value="description">Description</option>
          </select>
          <button
            data-order={sortOrder === 'asc' ? 'desc' : 'asc'}
            onClick={handleSort}
            className="p-2 border border-gray-400 rounded"
          >
            {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
          </button>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Tags</h2>
          <ul>
            {apiDocs.map((doc) => (
              <li key={doc.id}>
                <input
                  type="checkbox"
                  value={doc.tags[0]}
                  checked={filterTags.includes(doc.tags[0])}
                  onChange={handleFilterTags}
                  className="mr-2"
                />
                <span>{doc.tags[0]}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Categories</h2>
          <ul>
            {apiDocs.map((doc) => (
              <li key={doc.id}>
                <input
                  type="checkbox"
                  value={doc.categories[0]}
                  checked={filterCategories.includes(doc.categories[0])}
                  onChange={handleFilterCategories}
                  className="mr-2"
                />
                <span>{doc.categories[0]}</span>
              </li>
            ))}
          </ul>
        </div>
        <h2 className="text-2xl font-bold mb-4">API Docs</h2>
        <ul>
          {filteredApiDocs.map((doc) => (
            <li key={doc.id} className="mb-4">
              <h3 className="text-xl font-bold mb-2">{doc.title}</h3>
              <p>{doc.description}</p>
              <button
                onClick={() => handleFavorite(doc)}
                className={`p-2 border border-gray-400 rounded ${favorites.includes(doc.id) ? 'bg-green-500 text-white' : ''}`}
              >
                {favorites.includes(doc.id) ? 'Unfavorite' : 'Favorite'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}