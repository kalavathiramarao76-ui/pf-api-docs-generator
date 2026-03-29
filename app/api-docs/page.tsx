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
        return filterTags.some((tag) => doc.tags.includes(tag));
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

  const getUniqueTags = () => {
    const tags = apiDocs.map((doc) => doc.tags);
    return [...new Set(tags.flat())].sort();
  };

  const getUniqueCategories = () => {
    const categories = apiDocs.map((doc) => doc.category);
    return [...new Set(categories)].sort();
  };

  return (
    <Layout>
      <SEO
        title="AutoGen Docs - API Documentation"
        description="AutoGen Docs generates high-quality API documentation automatically, saving developers time and effort."
        keywords="API documentation tools, API documentation generator, auto generate API docs, API doc generator, swagger alternative"
      />
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
        <h1 className="text-3xl font-bold mb-4">API Documentation</h1>
        <div className="flex justify-between mb-4">
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search API Docs"
            className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 pl-10 text-sm text-gray-700"
          />
        </div>
        <div className="flex flex-wrap mb-4">
          <h2 className="text-lg font-bold mr-4">Filter by Tags:</h2>
          {getUniqueTags().map((tag) => (
            <div key={tag} className="mr-4">
              <input
                type="checkbox"
                value={tag}
                onChange={handleFilterTags}
                className="mr-2"
              />
              <span>{tag}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap mb-4">
          <h2 className="text-lg font-bold mr-4">Filter by Categories:</h2>
          {getUniqueCategories().map((category) => (
            <div key={category} className="mr-4">
              <input
                type="checkbox"
                value={category}
                onChange={handleFilterCategories}
                className="mr-2"
              />
              <span>{category}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between mb-4">
          <select value={sortBy} onChange={handleSort} data-order="asc">
            <option value="title" data-order="asc">Sort by Title (A-Z)</option>
            <option value="title" data-order="desc">Sort by Title (Z-A)</option>
            <option value="description" data-order="asc">Sort by Description (A-Z)</option>
            <option value="description" data-order="desc">Sort by Description (Z-A)</option>
          </select>
        </div>
        {filteredApiDocs.map((doc) => (
          <div key={doc.title} className="mb-4">
            <h2 className="text-lg font-bold">{doc.title}</h2>
            <p>{doc.description}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}