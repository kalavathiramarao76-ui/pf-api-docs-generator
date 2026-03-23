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
      <h2 className="text-2xl font-bold mb-4">Interactive Tutorial</h2>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-8">
        {tutorialStep === 1 && (
          <div>
            <h2 className="text-lg font-bold mb-2">Step 1: Introduction to AutoGenerate API Documentation</h2>
            <p className="text-sm mb-4">Welcome to the AutoGenerate API Documentation tutorial. In this tutorial, we will guide you through the process of generating API documentation automatically.</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNextStep}>Next Step</button>
          </div>
        )}
        {tutorialStep === 2 && (
          <div>
            <h2 className="text-lg font-bold mb-2">Step 2: Setting up your API</h2>
            <p className="text-sm mb-4">To get started, you need to set up your API. This involves creating a new API project and configuring the settings.</p>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handlePrevStep}>Previous Step</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNextStep}>Next Step</button>
          </div>
        )}
        {tutorialStep === 3 && (
          <div>
            <h2 className="text-lg font-bold mb-2">Step 3: Configuring API Documentation</h2>
            <p className="text-sm mb-4">In this step, you will learn how to configure the API documentation settings. This includes selecting the documentation template and customizing the layout.</p>
            <div className="bg-gray-200 p-4 rounded mb-4">
              <h3 className="text-lg font-bold mb-2">Documentation Template</h3>
              <p className="text-sm">Select a documentation template to use for your API.</p>
              <select className="bg-white p-2 rounded">
                <option>Template 1</option>
                <option>Template 2</option>
                <option>Template 3</option>
              </select>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handlePrevStep}>Previous Step</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNextStep}>Next Step</button>
          </div>
        )}
        {tutorialStep === 4 && (
          <div>
            <h2 className="text-lg font-bold mb-2">Step 4: Generating API Documentation</h2>
            <p className="text-sm mb-4">In this final step, you will learn how to generate the API documentation. This involves running a command to generate the documentation files.</p>
            <div className="bg-gray-200 p-4 rounded mb-4">
              <h3 className="text-lg font-bold mb-2">Generate Documentation</h3>
              <p className="text-sm">Run the following command to generate the API documentation:</p>
              <code className="bg-gray-100 p-2 rounded">autogenerate-docs</code>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handlePrevStep}>Previous Step</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNextStep}>Finish Tutorial</button>
          </div>
        )}
        {tutorialStep === 5 && (
          <div>
            <h2 className="text-lg font-bold mb-2">Congratulations! You have completed the tutorial.</h2>
            <p className="text-sm mb-4">You now have a basic understanding of how to use AutoGenerate API Documentation to generate API documentation automatically.</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setTutorialStep(1)}>Start Again</button>
          </div>
        )}
      </div>
    </div>
  );
}