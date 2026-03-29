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
        return filterCategories.every((category) => doc.category === category);
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
      <h1>API Documentation</h1>
      <input
        type="search"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search API documentation"
      />
      <select value={sortBy} onChange={handleSort}>
        <option value="title" data-order="asc">
          Title (A-Z)
        </option>
        <option value="title" data-order="desc">
          Title (Z-A)
        </option>
        <option value="description" data-order="asc">
          Description (A-Z)
        </option>
        <option value="description" data-order="desc">
          Description (Z-A)
        </option>
      </select>
      <div>
        <h2>Filter by Tags:</h2>
        {apiDocs.map((doc) => (
          <div key={doc.tags.join(',')}>
            {doc.tags.map((tag) => (
              <label key={tag}>
                <input
                  type="checkbox"
                  value={tag}
                  checked={filterTags.includes(tag)}
                  onChange={handleFilterTags}
                />
                {tag}
              </label>
            ))}
          </div>
        ))}
      </div>
      <div>
        <h2>Filter by Categories:</h2>
        {apiDocs.map((doc) => (
          <label key={doc.category}>
            <input
              type="checkbox"
              value={doc.category}
              checked={filterCategories.includes(doc.category)}
              onChange={handleFilterCategories}
            />
            {doc.category}
          </label>
        ))}
      </div>
      <ul>
        {filteredApiDocs.map((doc) => (
          <li key={doc.title}>
            <h3>{doc.title}</h3>
            <p>{doc.description}</p>
            <p>Tags: {doc.tags.join(', ')}</p>
            <p>Category: {doc.category}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
}