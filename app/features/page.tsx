use client;

import { useState } from 'react';
import Link from 'next/link';
import { AiOutlineCode } from 'react-icons/ai';
import { RiFileList2Line } from 'react-icons/ri';
import { MdSettings } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';
import { IoPricetags } from 'react-icons/io5';

export default function Page() {
  const [darkMode, setDarkMode] = useState(false);

  const features = [
    {
      id: 1,
      title: 'Automatic API Documentation Generation',
      description: 'AutoGen Docs generates high-quality API documentation automatically, saving developers time and effort.',
      icon: <AiOutlineCode size={24} />,
    },
    {
      id: 2,
      title: 'Support for Multiple Programming Languages',
      description: 'AutoGen Docs supports multiple programming languages and frameworks, making it a versatile tool for developers.',
      icon: <RiFileList2Line size={24} />,
    },
    {
      id: 3,
      title: 'Customization and Collaboration Tools',
      description: 'AutoGen Docs allows for customization and collaboration, making it easy for teams to work together on API documentation.',
      icon: <MdSettings size={24} />,
    },
    {
      id: 4,
      title: 'Integration with Popular API Frameworks',
      description: 'AutoGen Docs integrates with popular API frameworks, making it easy to generate documentation for your API.',
      icon: <FaUsers size={24} />,
    },
    {
      id: 5,
      title: 'Real-time Documentation Updates',
      description: 'AutoGen Docs provides real-time documentation updates, ensuring that your API documentation is always up-to-date.',
      icon: <IoPricetags size={24} />,
    },
    {
      id: 6,
      title: 'Version Control and History',
      description: 'AutoGen Docs provides version control and history, making it easy to track changes to your API documentation.',
      icon: <AiOutlineCode size={24} />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-4">Features</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4"
          >
            <div className="flex items-center mb-2">
              {feature.icon}
              <h2 className="text-lg font-bold ml-2">{feature.title}</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Link
          href="/pricing"
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          View Pricing
        </Link>
      </div>
    </div>
  );
}