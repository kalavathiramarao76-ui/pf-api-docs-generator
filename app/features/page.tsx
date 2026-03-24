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

  const resumeTutorial = () => {
    setTutorialStep(progress.tutorialStep);
    setSampleProject(progress.sampleProject);
    setTrialStarted(progress.trialStarted);
    setTrialDays(progress.trialDays);
    setTrialExpired(progress.trialExpired);
    setDemoStarted(progress.demoStarted);
    setDemoTime(progress.demoTime);
    setDemoExpired(progress.demoExpired);
  };

  return (
    <div>
      <button onClick={resumeTutorial}>Resume Tutorial</button>
      {/* rest of your code */}
    </div>
  );
}