import client from '../client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineCode } from 'react-icons/ai';
import { MdOutlineSettings } from 'react-icons/md';
import { RiDashboardLine } from 'react-icons/ri';
import { TbApi } from 'react-icons/tb';

export default function Page() {
  const [tutorialStep, setTutorialStep] = useState(1);
  const [sampleProject, setSampleProject] = useState(false);
  const [trialStarted, setTrialStarted] = useState(false);
  const [trialDays, setTrialDays] = useState(14);
  const [trialExpired, setTrialExpired] = useState(false);
  const [demoStarted, setDemoStarted] = useState(false);
  const [demoTime, setDemoTime] = useState(30); // 30 minutes demo
  const [demoExpired, setDemoExpired] = useState(false);

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
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + trialDays);
    localStorage.setItem('trialEndDate', trialEndDate.toISOString());
  };

  const handleStartDemo = () => {
    setDemoStarted(true);
    const demoEndDate = new Date();
    demoEndDate.setMinutes(demoEndDate.getMinutes() + demoTime);
    localStorage.setItem('demoEndDate', demoEndDate.toISOString());
  };

  const checkTrialStatus = () => {
    const trialEndDate = localStorage.getItem('trialEndDate');
    if (trialEndDate) {
      const today = new Date();
      const trialEndDateObject = new Date(trialEndDate);
      if (today > trialEndDateObject) {
        setTrialExpired(true);
      }
    }
  };

  const checkDemoStatus = () => {
    const demoEndDate = localStorage.getItem('demoEndDate');
    if (demoEndDate) {
      const today = new Date();
      const demoEndDateObject = new Date(demoEndDate);
      if (today > demoEndDateObject) {
        setDemoExpired(true);
      }
    }
  };

  useEffect(() => {
    if (!trialStarted) {
      checkTrialStatus();
    }
    if (demoStarted) {
      checkDemoStatus();
    }
  }, [trialStarted, demoStarted]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
      <h1 className="text-3xl font-bold mb-4">Features</h1>
      <p className="text-lg mb-8">
        Automatically generates API documentation from code, saving developers time and reducing errors.
      </p>
      {trialStarted && !trialExpired ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          You are currently in a {trialDays} day free trial. Your trial will expire on {localStorage.getItem('trialEndDate')}.
        </div>
      ) : trialExpired ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Your free trial has expired. Please sign up to continue using our service.
        </div>
      ) : demoStarted && !demoExpired ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          You are currently in a {demoTime} minute demo. Your demo will expire on {localStorage.getItem('demoEndDate')}.
        </div>
      ) : demoExpired ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Your demo has expired. Please sign up to continue using our service.
        </div>
      ) : (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
          <button onClick={handleStartTrial} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
            Start {trialDays} day free trial
          </button>
          <button onClick={handleStartDemo} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Start {demoTime} minute demo
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <RiDashboardLine size={24} className="text-gray-500 dark:text-gray-400 mb-2" />
          <h2 className="text-lg font-bold mb-2">Dashboard</h2>
          <p className="text-sm">Track changes and updates</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <TbApi size={24} className="text-gray-500 dark:text-gray-400 mb-2" />
          <h2 className="text-lg font-bold mb-2">API Documentation</h2>
          <p className="text-sm">Automatically generate API documentation</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <AiOutlineCode size={24} className="text-gray-500 dark:text-gray-400 mb-2" />
          <h2 className="text-lg font-bold mb-2">Code Editor</h2>
          <p className="text-sm">Write and edit code with ease</p>
        </div>
      </div>
    </div>
  );
}