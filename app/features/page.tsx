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
  const [demoTime, setDemoTime] = useState(30); 
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
  const [freeTrial, setFreeTrial] = useState(false);
  const [freeTrialDays, setFreeTrialDays] = useState(7);
  const [freeTrialStarted, setFreeTrialStarted] = useState(false);
  const [freeTrialExpired, setFreeTrialExpired] = useState(false);

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

  useEffect(() => {
    const storedFreeTrial = localStorage.getItem('freeTrial');
    if (storedFreeTrial) {
      const parsedFreeTrial = JSON.parse(storedFreeTrial);
      setFreeTrial(parsedFreeTrial.freeTrial);
      setFreeTrialDays(parsedFreeTrial.freeTrialDays);
      setFreeTrialStarted(parsedFreeTrial.freeTrialStarted);
      setFreeTrialExpired(parsedFreeTrial.freeTrialExpired);
    }
  }, []);

  useEffect(() => {
    saveFreeTrial();
  }, [freeTrial, freeTrialDays, freeTrialStarted, freeTrialExpired]);

  const saveProgress = () => {
    const progressData = {
      tutorialStep: tutorialStep,
      sampleProject: sampleProject,
      trialStarted: trialStarted,
      trialDays: trialDays,
      trialExpired: trialExpired,
      demoStarted: demoStarted,
      demoTime: demoTime,
      demoExpired: demoExpired,
    };
    localStorage.setItem('progress', JSON.stringify(progressData));
  };

  const saveFreeTrial = () => {
    const freeTrialData = {
      freeTrial: freeTrial,
      freeTrialDays: freeTrialDays,
      freeTrialStarted: freeTrialStarted,
      freeTrialExpired: freeTrialExpired,
    };
    localStorage.setItem('freeTrial', JSON.stringify(freeTrialData));
  };

  const handleTutorialStep = (step: number) => {
    setTutorialStep(step);
  };

  const handleSampleProject = () => {
    setSampleProject(true);
  };

  const handleTrialStart = () => {
    setTrialStarted(true);
  };

  const handleDemoStart = () => {
    setDemoStarted(true);
  };

  const handleGuidedTour = () => {
    setGuidedTour(true);
  };

  const handleGuidedTourStep = (step: number) => {
    setGuidedTourStep(step);
  };

  const handleFreeTrial = () => {
    setFreeTrial(true);
  };

  const handleFreeTrialStart = () => {
    setFreeTrialStarted(true);
  };

  const tutorialSteps = [
    {
      id: 1,
      title: 'Welcome to AutoGenerate API Documentation',
      description: 'This is the first step of the tutorial.',
      callToAction: 'Get Started',
      action: () => handleTutorialStep(2),
    },
    {
      id: 2,
      title: 'Create a Sample Project',
      description: 'Create a sample project to get started with AutoGenerate API Documentation.',
      callToAction: 'Create Project',
      action: handleSampleProject,
    },
    {
      id: 3,
      title: 'Start Your Free Trial',
      description: 'Start your free trial to experience the full features of AutoGenerate API Documentation.',
      callToAction: 'Start Trial',
      action: handleTrialStart,
    },
    {
      id: 4,
      title: 'Take a Guided Tour',
      description: 'Take a guided tour to learn more about the features of AutoGenerate API Documentation.',
      callToAction: 'Take Tour',
      action: handleGuidedTour,
    },
    {
      id: 5,
      title: 'Start Your Demo',
      description: 'Start your demo to experience the features of AutoGenerate API Documentation.',
      callToAction: 'Start Demo',
      action: handleDemoStart,
    },
  ];

  const guidedTourSteps = [
    {
      id: 1,
      title: 'Introduction to AutoGenerate API Documentation',
      description: 'This is the introduction to AutoGenerate API Documentation.',
      callToAction: 'Next',
      action: () => handleGuidedTourStep(2),
    },
    {
      id: 2,
      title: 'Creating API Documentation',
      description: 'Learn how to create API documentation with AutoGenerate API Documentation.',
      callToAction: 'Next',
      action: () => handleGuidedTourStep(3),
    },
    {
      id: 3,
      title: 'Customizing API Documentation',
      description: 'Learn how to customize API documentation with AutoGenerate API Documentation.',
      callToAction: 'Next',
      action: () => handleGuidedTourStep(4),
    },
    {
      id: 4,
      title: 'Publishing API Documentation',
      description: 'Learn how to publish API documentation with AutoGenerate API Documentation.',
      callToAction: 'Finish',
      action: () => setGuidedTour(false),
    },
  ];

  return (
    <div>
      {guidedTour ? (
        <div>
          <h1>Guided Tour</h1>
          {guidedTourSteps.map((step) => (
            <div key={step.id}>
              <h2>{step.title}</h2>
              <p>{step.description}</p>
              <button onClick={step.action}>{step.callToAction}</button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h1>AutoGenerate API Documentation</h1>
          <p>Get started with AutoGenerate API Documentation.</p>
          {tutorialSteps.map((step) => (
            <div key={step.id}>
              <h2>{step.title}</h2>
              <p>{step.description}</p>
              <button onClick={step.action}>{step.callToAction}</button>
            </div>
          ))}
          <p>Progress: {tutorialStep}/{tutorialSteps.length}</p>
        </div>
      )}
    </div>
  );
}