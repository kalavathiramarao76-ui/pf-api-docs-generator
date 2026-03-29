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
    );

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
  }, [apiDocs, searchTerm, sortOrder, sortBy]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
    setSortOrder(e.target.dataset.order);
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
          <select
            value={sortBy}
            onChange={handleSort}
            className="w-full md:w-1/4 lg:w-1/6 xl:w-1/8 p-2 pl-3 text-sm text-gray-700"
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
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredApiDocs.map((doc) => (
              <div key={doc.id} className="bg-white rounded shadow p-4">
                <h2 className="text-xl font-bold mb-2">{doc.title}</h2>
                <p className="text-gray-600">{doc.description}</p>
                <Link
                  href={`/api-docs/${doc.id}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}