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
        return filterTags.every((tag) => doc.tags.includes(tag));
      }
      return true;
    }).filter((doc) => {
      if (filterCategories.length > 0) {
        return filterCategories.some((category) => doc.category === category);
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

  return (
    <Layout>
      <SEO title="API Documentation" />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">API Documentation</h1>
        <div className="flex justify-between mb-4">
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search API documentation"
            className="w-1/2 p-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          <select
            value={sortBy}
            onChange={handleSort}
            data-order="asc"
            className="p-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            <option value="title">Sort by title</option>
            <option value="description">Sort by description</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="p-2 pl-5 pr-5 bg-gray-600 text-gray-100 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </button>
        </div>
        <div className="flex flex-wrap mb-4">
          {apiDocs.map((doc) => (
            <div key={doc.title} className="w-1/2 p-2">
              <label>
                <input
                  type="checkbox"
                  value={doc.category}
                  checked={filterCategories.includes(doc.category)}
                  onChange={handleFilterCategories}
                  className="mr-2"
                />
                {doc.category}
              </label>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap mb-4">
          {apiDocs.map((doc) => (
            <div key={doc.title} className="w-1/2 p-2">
              {doc.tags.map((tag) => (
                <label key={tag} className="mr-2">
                  <input
                    type="checkbox"
                    value={tag}
                    checked={filterTags.includes(tag)}
                    onChange={handleFilterTags}
                    className="mr-2"
                  />
                  {tag}
                </label>
              ))}
            </div>
          ))}
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <ul>
            {filteredApiDocs.map((doc) => (
              <li key={doc.title}>
                <h2 className="text-2xl font-bold mb-2">{doc.title}</h2>
                <p className="text-gray-600">{doc.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}