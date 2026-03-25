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
  const [trialMode, setTrialMode] = useState(false);
  const [countdown, setCountdown] = useState(30 * 24 * 60 * 60 * 1000); // 30 days in milliseconds
  const [timeLeft, setTimeLeft] = useState(null);
  const [userProgress, setUserProgress] = useState(() => {
    const storedUserProgress = localStorage.getItem('userProgress');
    return storedUserProgress ? JSON.parse(storedUserProgress) : {
      completedSteps: [],
      recommendedSteps: []
    };
  });

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
    saveUserProgress();
  }, [userProgress]);

  const saveProgress = () => {
    const progressData = {
      tutorialStep,
      sampleProject,
      trialStarted,
      trialDays,
      trialExpired,
      demoStarted,
      demoTime,
      demoExpired
    };
    localStorage.setItem('progress', JSON.stringify(progressData));
  };

  const saveUserProgress = () => {
    const userProgressData = {
      completedSteps: userProgress.completedSteps,
      recommendedSteps: userProgress.recommendedSteps
    };
    localStorage.setItem('userProgress', JSON.stringify(userProgressData));
  };

  const markStepAsCompleted = (step) => {
    const newCompletedSteps = [...userProgress.completedSteps, step];
    const newRecommendedSteps = getRecommendedSteps(newCompletedSteps);
    setUserProgress({
      completedSteps: newCompletedSteps,
      recommendedSteps: newRecommendedSteps
    });
  };

  const getRecommendedSteps = (completedSteps) => {
    const allSteps = ['step1', 'step2', 'step3', 'step4', 'step5'];
    const recommendedSteps = allSteps.filter(step => !completedSteps.includes(step));
    return recommendedSteps;
  };

  return (
    <div>
      <h1>AutoGenerate API Documentation</h1>
      <p>Current Step: {tutorialStep}</p>
      <button onClick={() => markStepAsCompleted(`step${tutorialStep}`)}>Mark Step as Completed</button>
      <p>Completed Steps: {userProgress.completedSteps.join(', ')}</p>
      <p>Recommended Steps: {userProgress.recommendedSteps.join(', ')}</p>
      <Link href="/api-docs">
        <a>
          <TbApi size={24} />
          API Documentation
        </a>
      </Link>
      <Link href="/dashboard">
        <a>
          <RiDashboardLine size={24} />
          Dashboard
        </a>
      </Link>
      <Link href="/settings">
        <a>
          <MdOutlineSettings size={24} />
          Settings
        </a>
      </Link>
      <Link href="/code">
        <a>
          <AiOutlineCode size={24} />
          Code
        </a>
      </Link>
    </div>
  );
}