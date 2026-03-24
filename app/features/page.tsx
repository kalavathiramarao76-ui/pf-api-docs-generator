import client from '../client';
import { useState } from 'react';
import Link from 'next/link';
import { AiOutlineCode } from 'react-icons/ai';
import { MdOutlineSettings } from 'react-icons/md';
import { RiDashboardLine } from 'react-icons/ri';
import { TbApi } from 'react-icons/tb';

export default function Page() {
  const [tutorialStep, setTutorialStep] = useState(1);
  const [sampleProject, setSampleProject] = useState(false);
  const [trialStarted, setTrialStarted] = useState(false);

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

  const handleSampleProject = () => {
    setSampleProject(!sampleProject);
  };

  const handleStartTrial = () => {
    setTrialStarted(true);
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
      <div className="flex justify-center mb-8">
        {trialStarted ? (
          <button className="bg-gray-300 text-gray-600 py-2 px-4 rounded shadow" disabled>
            Trial Started
          </button>
        ) : (
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded shadow"
            onClick={handleStartTrial}
          >
            Start Free Trial
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-2">Trial Features</h2>
          <ul>
            <li className="text-sm">Access to all features for 14 days</li>
            <li className="text-sm">Generate API documentation for up to 5 projects</li>
            <li className="text-sm">Collaboration features for up to 5 users</li>
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-2">What to Expect</h2>
          <p className="text-sm">
            During the trial period, you will have access to all features of our API documentation generator. You can generate API documentation for up to 5 projects and collaborate with up to 5 users.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-2">Getting Started</h2>
          <p className="text-sm">
            To get started with the trial, simply click the "Start Free Trial" button above. You will be guided through the sign-up process and can start using our API documentation generator immediately.
          </p>
        </div>
      </div>
    </div>
  );
}