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
  const [userId, setUserId] = useState(() => {
    const storedUserId = localStorage.getItem('userId');
    return storedUserId ? storedUserId : generateUUID();
  });
  const [demoMode, setDemoMode] = useState(false);
  const [demoModeTime, setDemoModeTime] = useState(60 * 60 * 1000); // 1 hour in milliseconds
  const [demoModeTimeLeft, setDemoModeTimeLeft] = useState(null);
  const [trialCountdown, setTrialCountdown] = useState(14 * 24 * 60 * 60 * 1000); // 14 days in milliseconds
  const [trialTimeLeft, setTrialTimeLeft] = useState(null);

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
    if (trialStarted) {
      const intervalId = setInterval(() => {
        if (trialCountdown > 0) {
          setTrialCountdown(trialCountdown - 1000);
        } else {
          setTrialExpired(true);
          clearInterval(intervalId);
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [trialStarted, trialCountdown]);

  useEffect(() => {
    if (trialCountdown > 0) {
      const days = Math.floor(trialCountdown / (24 * 60 * 60 * 1000));
      const hours = Math.floor((trialCountdown % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      const minutes = Math.floor((trialCountdown % (60 * 60 * 1000)) / (60 * 1000));
      const seconds = Math.floor((trialCountdown % (60 * 1000)) / 1000);
      setTrialTimeLeft(`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`);
    } else {
      setTrialTimeLeft('Trial expired');
    }
  }, [trialCountdown]);

  const startTrial = () => {
    setTrialStarted(true);
    setTrialCountdown(14 * 24 * 60 * 60 * 1000);
    localStorage.setItem('trialStarted', 'true');
    localStorage.setItem('trialCountdown', String(14 * 24 * 60 * 60 * 1000));
  };

  const upgradeToPaidPlan = () => {
    // Implement upgrade logic here
  };

  return (
    <div>
      {trialStarted && !trialExpired ? (
        <div>
          <p>Trial mode: {trialTimeLeft}</p>
          <button onClick={upgradeToPaidPlan}>Upgrade to paid plan</button>
        </div>
      ) : !trialStarted ? (
        <div>
          <p>Start your 14-day free trial</p>
          <button onClick={startTrial}>Start trial</button>
        </div>
      ) : (
        <div>
          <p>Trial expired. Please upgrade to a paid plan to continue using the service.</p>
          <button onClick={upgradeToPaidPlan}>Upgrade to paid plan</button>
        </div>
      )}
    </div>
  );
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}