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
      <h2 className="text-lg font-bold mb-4">Try Before You Buy</h2>
      <p className="text-lg mb-8">
        Start a free 14-day trial to test our API documentation generator and see how it can benefit your team.
      </p>
      <div className="flex justify-center mb-8">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleStartTrial}
        >
          Start Free Trial
        </button>
      </div>
      {trialStarted && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-8">
          <p className="text-lg font-bold mb-2">Free Trial Started</p>
          <p className="text-lg mb-2">
            You now have access to our API documentation generator for the next 14 days.
          </p>
          <p className="text-lg mb-2">
            To get started, please follow the tutorial below:
          </p>
          <div className="flex justify-center mb-8">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleNextStep}
            >
              Start Tutorial
            </button>
          </div>
          <div className="flex justify-between mb-8">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              onClick={handlePrevStep}
              disabled={tutorialStep === 1}
            >
              Previous Step
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleNextStep}
              disabled={tutorialStep >= 5}
            >
              Next Step
            </button>
          </div>
          <p className="text-lg font-bold mb-2">Tutorial Step {tutorialStep}</p>
          {tutorialStep === 1 && (
            <p className="text-lg mb-2">
              Welcome to our API documentation generator tutorial. In this step, we will cover the basics of our tool.
            </p>
          )}
          {tutorialStep === 2 && (
            <p className="text-lg mb-2">
              In this step, we will show you how to create a new project and configure the settings.
            </p>
          )}
          {tutorialStep === 3 && (
            <p className="text-lg mb-2">
              Now, let's talk about how to integrate our tool with your existing development workflow.
            </p>
          )}
          {tutorialStep === 4 && (
            <p className="text-lg mb-2">
              In this step, we will cover the collaboration features and how to invite team members to your project.
            </p>
          )}
          {tutorialStep === 5 && (
            <p className="text-lg mb-2">
              Congratulations, you have completed the tutorial! You can now start using our API documentation generator.
            </p>
          )}
        </div>
      )}
    </div>
  );
}