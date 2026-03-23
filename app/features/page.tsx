use client;

import { useState } from 'react';
import Link from 'next/link';
import { AiOutlineCode } from 'react-icons/ai';
import { MdOutlineSettings } from 'react-icons/md';
import { RiDashboardLine } from 'react-icons/ri';
import { TbApi } from 'react-icons/tb';

export default function Page() {
  const [tutorialStep, setTutorialStep] = useState(1);

  const handleNextStep = () => {
    if (tutorialStep < 5) {
      setTutorialStep(tutorialStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (tutorialStep > 1) {
      setTutorialStep(tutorialStep - 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
      <h1 className="text-3xl font-bold mb-4">Features</h1>
      <p className="text-lg mb-8">
        Automatically generates API documentation from code, saving developers time and reducing errors.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <RiDashboardLine size={24} className="text-gray-500 dark:text-gray-400 mb-2" />
          <h2 className="text-lg font-bold mb-2">Dashboard</h2>
          <p className="text-sm">Track changes and updates to your API.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <TbApi size={24} className="text-gray-500 dark:text-gray-400 mb-2" />
          <h2 className="text-lg font-bold mb-2">API Docs</h2>
          <p className="text-sm">Automatic API documentation generation.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <MdOutlineSettings size={24} className="text-gray-500 dark:text-gray-400 mb-2" />
          <h2 className="text-lg font-bold mb-2">Settings</h2>
          <p className="text-sm">Customizable documentation templates.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <AiOutlineCode size={24} className="text-gray-500 dark:text-gray-400 mb-2" />
          <h2 className="text-lg font-bold mb-2">Code Integration</h2>
          <p className="text-sm">Integration with popular development tools.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-2">Collaboration</h2>
          <p className="text-sm">Collaboration features for teams.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-2">Change Tracking</h2>
          <p className="text-sm">Track changes and updates to your API.</p>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4">Guided Tour</h2>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-8">
        {tutorialStep === 1 && (
          <div>
            <h2 className="text-lg font-bold mb-2">Step 1: Introduction to AutoGenerate API Documentation</h2>
            <p className="text-sm mb-4">Welcome to AutoGenerate API Documentation. This feature automatically generates API documentation from your code, saving you time and reducing errors.</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNextStep}>Next Step</button>
          </div>
        )}
        {tutorialStep === 2 && (
          <div>
            <h2 className="text-lg font-bold mb-2">Step 2: Configuring AutoGenerate API Documentation</h2>
            <p className="text-sm mb-4">To get started, you'll need to configure AutoGenerate API Documentation. This involves setting up your API and choosing the documentation template that best fits your needs.</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handlePrevStep}>Previous Step</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNextStep}>Next Step</button>
          </div>
        )}
        {tutorialStep === 3 && (
          <div>
            <h2 className="text-lg font-bold mb-2">Step 3: Generating API Documentation</h2>
            <p className="text-sm mb-4">Once you've configured AutoGenerate API Documentation, you can start generating your API documentation. This process is automatic and can be customized to fit your needs.</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handlePrevStep}>Previous Step</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNextStep}>Next Step</button>
          </div>
        )}
        {tutorialStep === 4 && (
          <div>
            <h2 className="text-lg font-bold mb-2">Step 4: Reviewing and Customizing API Documentation</h2>
            <p className="text-sm mb-4">After generating your API documentation, you can review and customize it to fit your needs. This includes adding custom descriptions, examples, and more.</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handlePrevStep}>Previous Step</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNextStep}>Next Step</button>
          </div>
        )}
        {tutorialStep === 5 && (
          <div>
            <h2 className="text-lg font-bold mb-2">Step 5: Conclusion</h2>
            <p className="text-sm mb-4">Congratulations! You've completed the guided tour of AutoGenerate API Documentation. You're now ready to start generating high-quality API documentation for your projects.</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handlePrevStep}>Previous Step</button>
          </div>
        )}
      </div>
    </div>
  );
}