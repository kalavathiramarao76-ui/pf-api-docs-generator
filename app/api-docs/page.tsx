use client;

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  return (
    <Layout>
      <SEO
        title="AutoGen Docs - API Documentation"
        description="AutoGen Docs generates high-quality API documentation automatically, saving developers time and effort."
        keywords="API documentation tools, API documentation generator, auto generate API docs, API doc generator, swagger alternative"
      />
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
        <h1 className="text-3xl font-bold mb-4">API Documentation</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {apiDocs.map((doc) => (
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