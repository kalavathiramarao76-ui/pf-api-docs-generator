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

  useEffect(() => {
    const storedTrialMode = localStorage.getItem('trialMode');
    if (storedTrialMode) {
      setTrialMode(storedTrialMode === 'true');
    }
  }, []);

  useEffect(() => {
    saveTrialMode();
  }, [trialMode]);

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

  const saveFreeTrial = () => {
    const freeTrialData = {
      freeTrial,
      freeTrialDays,
      freeTrialStarted,
      freeTrialExpired,
    };
    localStorage.setItem('freeTrial', JSON.stringify(freeTrialData));
  };

  const saveTrialMode = () => {
    localStorage.setItem('trialMode', trialMode.toString());
  };

  const startFreeTrial = () => {
    setFreeTrial(true);
    setFreeTrialStarted(true);
    setFreeTrialDays(7);
    setFreeTrialExpired(false);
    setTrialMode(true);
    saveFreeTrial();
    saveTrialMode();
  };

  const startDemo = () => {
    setDemoStarted(true);
    setDemoTime(30);
    setDemoExpired(false);
    setTrialMode(true);
    saveProgress();
    saveTrialMode();
  };

  if (trialMode) {
    if (freeTrialStarted) {
      const daysLeft = freeTrialDays - Math.floor((new Date().getTime() - new Date(freeTrialStarted).getTime()) / (1000 * 3600 * 24));
      if (daysLeft <= 0) {
        setFreeTrialExpired(true);
        setTrialMode(false);
        saveFreeTrial();
        saveTrialMode();
      }
    } else if (demoStarted) {
      const timeLeft = demoTime - Math.floor((new Date().getTime() - new Date(demoStarted).getTime()) / (1000 * 60));
      if (timeLeft <= 0) {
        setDemoExpired(true);
        setTrialMode(false);
        saveProgress();
        saveTrialMode();
      }
    }
  }

  return (
    <div>
      {trialMode ? (
        <div>
          {freeTrialStarted ? (
            <p>Free trial started. You have {freeTrialDays} days left.</p>
          ) : (
            <p>Demo started. You have {demoTime} minutes left.</p>
          )}
          <button onClick={startFreeTrial}>Start Free Trial</button>
          <button onClick={startDemo}>Start Demo</button>
        </div>
      ) : (
        <div>
          <p>Welcome to AutoGenerate API Documentation</p>
          <button onClick={startFreeTrial}>Start Free Trial</button>
          <button onClick={startDemo}>Start Demo</button>
        </div>
      )}
    </div>
  );
}