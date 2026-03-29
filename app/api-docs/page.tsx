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

  return (
    <Layout>
      <SEO title="API Documentation" />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">API Documentation</h1>
        <div className="flex flex-wrap mb-4">
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search API documentation"
            className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          <select
            value={sortBy}
            onChange={handleSort}
            data-order="asc"
            className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            <option value="title">Sort by title (asc)</option>
            <option value="description" data-order="asc">Sort by description (asc)</option>
            <option value="title" data-order="desc">Sort by title (desc)</option>
            <option value="description" data-order="desc">Sort by description (desc)</option>
          </select>
        </div>
        <div className="flex flex-wrap mb-4">
          <h2 className="text-lg font-bold mb-2">Filter by tags:</h2>
          {apiDocs.map((doc) => (
            <div key={doc.tags.join(',')} className="mr-4">
              {doc.tags.map((tag) => (
                <label key={tag} className="block">
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
        <div className="flex flex-wrap mb-4">
          <h2 className="text-lg font-bold mb-2">Filter by categories:</h2>
          {apiDocs.map((doc) => (
            <div key={doc.categories.join(',')} className="mr-4">
              {doc.categories.map((category) => (
                <label key={category} className="block">
                  <input
                    type="checkbox"
                    value={category}
                    checked={filterCategories.includes(category)}
                    onChange={handleFilterCategories}
                    className="mr-2"
                  />
                  {category}
                </label>
              ))}
            </div>
          ))}
        </div>
        <ul>
          {filteredApiDocs.map((doc) => (
            <li key={doc.title} className="mb-4">
              <h3 className="text-lg font-bold">{doc.title}</h3>
              <p>{doc.description}</p>
              <ul>
                {doc.tags.map((tag) => (
                  <li key={tag} className="text-gray-600">{tag}</li>
                ))}
              </ul>
              <ul>
                {doc.categories.map((category) => (
                  <li key={category} className="text-gray-600">{category}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}