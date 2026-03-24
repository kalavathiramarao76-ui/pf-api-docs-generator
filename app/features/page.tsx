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
    localStorage.setItem('tutorialStep', tutorialStep.toString());
  };

  return (
    // your JSX code here
  );
}