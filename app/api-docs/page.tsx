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
        return filterCategories.every((category) => doc.categories.includes(category));
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

  const handleClearFilters = () => {
    setFilterTags([]);
    setFilterCategories([]);
    setSearchTerm('');
  };

  const handleToggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <Layout>
      <SEO title="API Docs" />
      <div className="flex flex-col items-center py-12">
        <h1 className="text-3xl font-bold mb-4">API Docs</h1>
        <div className="flex flex-col md:flex-row justify-center mb-4">
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search API Docs"
            className="w-full md:w-1/2 py-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg ml-2"
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        </div>
        <div className="flex flex-col md:flex-row justify-center mb-4">
          <select
            value={sortBy}
            onChange={handleSort}
            data-order={sortOrder}
            className="w-full md:w-1/2 py-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
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
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg ml-2"
            onClick={handleToggleSortOrder}
          >
            {sortOrder === 'asc' ? 'Sort Desc' : 'Sort Asc'}
          </button>
        </div>
        <div className="flex flex-col md:flex-row justify-center mb-4">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <h2 className="text-lg font-bold mb-2">Filter by Tags</h2>
            <ul>
              {apiDocs.map((doc) => (
                <li key={doc.tags.join(',')} className="mb-2">
                  {doc.tags.map((tag) => (
                    <label key={tag} className="mr-2">
                      <input
                        type="checkbox"
                        value={tag}
                        checked={filterTags.includes(tag)}
                        onChange={handleFilterTags}
                      />
                      <span className="ml-2">{tag}</span>
                    </label>
                  ))}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <h2 className="text-lg font-bold mb-2">Filter by Categories</h2>
            <ul>
              {apiDocs.map((doc) => (
                <li key={doc.categories.join(',')} className="mb-2">
                  {doc.categories.map((category) => (
                    <label key={category} className="mr-2">
                      <input
                        type="checkbox"
                        value={category}
                        checked={filterCategories.includes(category)}
                        onChange={handleFilterCategories}
                      />
                      <span className="ml-2">{category}</span>
                    </label>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col justify-center mb-4">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <ul>
              {filteredApiDocs.map((doc) => (
                <li key={doc.title} className="mb-4">
                  <h3 className="text-lg font-bold mb-2">{doc.title}</h3>
                  <p className="text-gray-600">{doc.description}</p>
                  <ul>
                    {doc.tags.map((tag) => (
                      <li key={tag} className="mr-2">
                        <span className="bg-gray-200 py-1 px-2 rounded-lg text-gray-600">
                          {tag}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <ul>
                    {doc.categories.map((category) => (
                      <li key={category} className="mr-2">
                        <span className="bg-gray-200 py-1 px-2 rounded-lg text-gray-600">
                          {category}
                        </span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
}