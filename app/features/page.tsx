import client from '../client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineCode } from 'react-icons/ai';
import { MdOutlineSettings } from 'react-icons/md';
import { RiDashboardLine } from 'react-icons/ri';
import { TbApi } from 'react-icons/tb';

export default function Page() {
  const [tutorialStep, setTutorialStep] = useState(() => {
    const storedTutorialStep = localStorage.getItem('tutorialStep');
    return storedTutorialStep ? parseInt(storedTutorialStep) : 1;
  });
  const [sampleProject, setSampleProject] = useState(false);
  const [trialStarted, setTrialStarted] = useState(false);
  const [trialDays, setTrialDays] = useState(14);
  const [trialExpired, setTrialExpired] = useState(false);
  const [demoStarted, setDemoStarted] = useState(false);
  const [demoTime, setDemoTime] = useState(30); // 30 minutes demo
  const [demoExpired, setDemoExpired] = useState(false);
  const [progress, setProgress] = useState(() => {
    const storedProgress = localStorage.getItem('progress');
    return storedProgress ? JSON.parse(storedProgress) : {};
  });

  const handleNextStep = () => {
    if (tutorialStep < 5) {
      setTutorialStep(tutorialStep + 1);
      localStorage.setItem('tutorialStep', (tutorialStep + 1).toString());
      saveProgress();
    }
  };

  const handlePrevStep = () => {
    if (tutorialStep > 1) {
      setTutorialStep(tutorialStep - 1);
      localStorage.setItem('tutorialStep', (tutorialStep - 1).toString());
      saveProgress();
    }
  };

  const handleSampleProject = () => {
    setSampleProject(!sampleProject);
    saveProgress();
  };

  const handleStartTrial = () => {
    setTrialStarted(true);
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + trialDays);
    localStorage.setItem('trialEndDate', trialEndDate.toISOString());
    saveProgress();
  };

  const handleStartDemo = () => {
    setDemoStarted(true);
    const demoEndDate = new Date();
    demoEndDate.setMinutes(demoEndDate.getMinutes() + demoTime);
    localStorage.setItem('demoEndDate', demoEndDate.toISOString());
    saveProgress();
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

  const saveProgress = () => {
    const newProgress = {
      tutorialStep,
      sampleProject,
      trialStarted,
      trialDays,
      trialExpired,
      demoStarted,
      demoTime,
      demoExpired,
    };
    setProgress(newProgress);
    localStorage.setItem('progress', JSON.stringify(newProgress));
  };

  const loadProgress = () => {
    const storedProgress = localStorage.getItem('progress');
    if (storedProgress) {
      const progressData = JSON.parse(storedProgress);
      setTutorialStep(progressData.tutorialStep);
      setSampleProject(progressData.sampleProject);
      setTrialStarted(progressData.trialStarted);
      setTrialDays(progressData.trialDays);
      setTrialExpired(progressData.trialExpired);
      setDemoStarted(progressData.demoStarted);
      setDemoTime(progressData.demoTime);
      setDemoExpired(progressData.demoExpired);
    }
  };

  useEffect(() => {
    loadProgress();
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
        <div className="bg-gray-100 p-4 mb-4">
          <p>Trial started. You have {trialDays} days left.</p>
        </div>
      ) : null}
      {demoStarted && !demoExpired ? (
        <div className="bg-gray-100 p-4 mb-4">
          <p>Demo started. You have {demoTime} minutes left.</p>
        </div>
      ) : null}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNextStep}>
        Next Step
      </button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handlePrevStep}>
        Previous Step
      </button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSampleProject}>
        {sampleProject ? 'Hide Sample Project' : 'Show Sample Project'}
      </button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleStartTrial}>
        Start Trial
      </button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleStartDemo}>
        Start Demo
      </button>
    </div>
  );
}