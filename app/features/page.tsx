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
    return storedProgress ? JSON.parse(storedProgress) : {
      tutorialStep: 1,
      sampleProject: false,
      trialStarted: false,
      trialDays: 14,
      trialExpired: false,
      demoStarted: false,
      demoTime: 30,
      demoExpired: false,
    };
  });
  const [guidedTour, setGuidedTour] = useState(false);
  const [guidedTourStep, setGuidedTourStep] = useState(1);

  useEffect(() => {
    const storedProgress = localStorage.getItem('progress');
    if (storedProgress) {
      const parsedProgress = JSON.parse(storedProgress);
      setTutorialStep(parsedProgress.tutorialStep);
      setSampleProject(parsedProgress.sampleProject);
      setTrialStarted(parsedProgress.trialStarted);
      setTrialDays(parsedProgress.trialDays);
      setTrialExpired(parsedProgress.trialExpired);
      setDemoStarted(parsedProgress.demoStarted);
      setDemoTime(parsedProgress.demoTime);
      setDemoExpired(parsedProgress.demoExpired);
    }
  }, []);

  useEffect(() => {
    saveProgress();
  }, [tutorialStep, sampleProject, trialStarted, trialDays, trialExpired, demoStarted, demoTime, demoExpired]);

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
      if (today > new Date(trialEndDate)) {
        setTrialExpired(true);
      }
    }
  };

  const startGuidedTour = () => {
    setGuidedTour(true);
  };

  const handleGuidedTourNextStep = () => {
    if (guidedTourStep < 5) {
      setGuidedTourStep(guidedTourStep + 1);
    }
  };

  const handleGuidedTourPrevStep = () => {
    if (guidedTourStep > 1) {
      setGuidedTourStep(guidedTourStep - 1);
    }
  };

  const guidedTourSteps = [
    {
      title: 'Welcome to AutoGenerate API Documentation',
      description: 'This is the first step of the guided tour.',
    },
    {
      title: 'Getting Started',
      description: 'This is the second step of the guided tour.',
    },
    {
      title: 'API Documentation',
      description: 'This is the third step of the guided tour.',
    },
    {
      title: 'Settings',
      description: 'This is the fourth step of the guided tour.',
    },
    {
      title: 'Conclusion',
      description: 'This is the last step of the guided tour.',
    },
  ];

  const saveProgress = () => {
    const progressData = {
      tutorialStep,
      sampleProject,
      trialStarted,
      trialDays,
      trialExpired,
      demoStarted,
      demoTime,
      demoExpired,
    };
    localStorage.setItem('progress', JSON.stringify(progressData));
  };

  return (
    <div>
      {guidedTour ? (
        <div>
          <h2>{guidedTourSteps[guidedTourStep - 1].title}</h2>
          <p>{guidedTourSteps[guidedTourStep - 1].description}</p>
          <button onClick={handleGuidedTourPrevStep}>Previous</button>
          <button onClick={handleGuidedTourNextStep}>Next</button>
        </div>
      ) : (
        <div>
          <h1>AutoGenerate API Documentation</h1>
          <button onClick={startGuidedTour}>Start Guided Tour</button>
          <button onClick={handleNextStep}>Next Step</button>
          <button onClick={handlePrevStep}>Previous Step</button>
          <button onClick={handleSampleProject}>Sample Project</button>
          <button onClick={handleStartTrial}>Start Trial</button>
          <button onClick={handleStartDemo}>Start Demo</button>
          <p>Tutorial Step: {tutorialStep}</p>
          <p>Sample Project: {sampleProject ? 'Yes' : 'No'}</p>
          <p>Trial Started: {trialStarted ? 'Yes' : 'No'}</p>
          <p>Trial Days: {trialDays}</p>
          <p>Trial Expired: {trialExpired ? 'Yes' : 'No'}</p>
          <p>Demo Started: {demoStarted ? 'Yes' : 'No'}</p>
          <p>Demo Time: {demoTime} minutes</p>
          <p>Demo Expired: {demoExpired ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
}