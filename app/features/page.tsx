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
            <p className="text-sm mb-4">Welcome to the AutoGenerate API Documentation tutorial. This tutorial will guide you through the process of generating API documentation automatically.</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNextStep}>Next Step</button>
          </div>
        )}
        {tutorialStep === 2 && (
          <div>
            <h2 className="text-lg font-bold mb-2">Step 2: Setting up AutoGenerate API Documentation</h2>
            <p className="text-sm mb-4">To get started with AutoGenerate API Documentation, you need to set up your project. This involves installing the required dependencies and configuring your project settings.</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handlePrevStep}>Previous Step</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNextStep}>Next Step</button>
          </div>
        )}
        {tutorialStep === 3 && (
          <div>
            <h2 className="text-lg font-bold mb-2">Step 3: Generating API Documentation</h2>
            <p className="text-sm mb-4">Once you have set up your project, you can generate API documentation automatically. This involves running a command in your terminal to generate the documentation.</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handlePrevStep}>Previous Step</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNextStep}>Next Step</button>
          </div>
        )}
        {tutorialStep === 4 && (
          <div>
            <h2 className="text-lg font-bold mb-2">Step 4: Customizing API Documentation</h2>
            <p className="text-sm mb-4">You can customize the generated API documentation to fit your needs. This involves editing the documentation templates and configuring the settings.</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handlePrevStep}>Previous Step</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNextStep}>Next Step</button>
          </div>
        )}
        {tutorialStep === 5 && (
          <div>
            <h2 className="text-lg font-bold mb-2">Step 5: Conclusion</h2>
            <p className="text-sm mb-4">Congratulations! You have completed the AutoGenerate API Documentation tutorial. You now know how to generate API documentation automatically and customize it to fit your needs.</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handlePrevStep}>Previous Step</button>
          </div>
        )}
      </div>
    </div>
  );
}