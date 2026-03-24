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
    localStorage.setItem('tutorialStep', tutorialStep.toString());
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

  const handleTutorialStepChange = (newStep: number) => {
    setTutorialStep(newStep);
    saveProgress();
  };

  const handleSampleProjectChange = (newSampleProject: boolean) => {
    setSampleProject(newSampleProject);
    saveProgress();
  };

  const handleTrialStartedChange = (newTrialStarted: boolean) => {
    setTrialStarted(newTrialStarted);
    saveProgress();
  };

  const handleTrialDaysChange = (newTrialDays: number) => {
    setTrialDays(newTrialDays);
    saveProgress();
  };

  const handleTrialExpiredChange = (newTrialExpired: boolean) => {
    setTrialExpired(newTrialExpired);
    saveProgress();
  };

  const handleDemoStartedChange = (newDemoStarted: boolean) => {
    setDemoStarted(newDemoStarted);
    saveProgress();
  };

  const handleDemoTimeChange = (newDemoTime: number) => {
    setDemoTime(newDemoTime);
    saveProgress();
  };

  const handleDemoExpiredChange = (newDemoExpired: boolean) => {
    setDemoExpired(newDemoExpired);
    saveProgress();
  };

  const handleGuidedTourChange = (newGuidedTour: boolean) => {
    setGuidedTour(newGuidedTour);
  };

  const handleGuidedTourStepChange = (newGuidedTourStep: number) => {
    setGuidedTourStep(newGuidedTourStep);
  };

  const handleFreeTrialChange = (newFreeTrial: boolean) => {
    setFreeTrial(newFreeTrial);
    saveFreeTrial();
  };

  const handleFreeTrialDaysChange = (newFreeTrialDays: number) => {
    setFreeTrialDays(newFreeTrialDays);
    saveFreeTrial();
  };

  const handleFreeTrialStartedChange = (newFreeTrialStarted: boolean) => {
    setFreeTrialStarted(newFreeTrialStarted);
    saveFreeTrial();
  };

  const handleFreeTrialExpiredChange = (newFreeTrialExpired: boolean) => {
    setFreeTrialExpired(newFreeTrialExpired);
    saveFreeTrial();
  };

  return (
    <div>
      <h1>AutoGenerate API Documentation</h1>
      <p>Current Tutorial Step: {tutorialStep}</p>
      <button onClick={() => handleTutorialStepChange(tutorialStep + 1)}>Next Step</button>
      <button onClick={() => handleTutorialStepChange(tutorialStep - 1)}>Previous Step</button>
      <p>Sample Project: {sampleProject ? 'Yes' : 'No'}</p>
      <button onClick={() => handleSampleProjectChange(!sampleProject)}>Toggle Sample Project</button>
      <p>Trial Started: {trialStarted ? 'Yes' : 'No'}</p>
      <button onClick={() => handleTrialStartedChange(!trialStarted)}>Toggle Trial Started</button>
      <p>Trial Days: {trialDays}</p>
      <button onClick={() => handleTrialDaysChange(trialDays + 1)}>Increase Trial Days</button>
      <button onClick={() => handleTrialDaysChange(trialDays - 1)}>Decrease Trial Days</button>
      <p>Trial Expired: {trialExpired ? 'Yes' : 'No'}</p>
      <button onClick={() => handleTrialExpiredChange(!trialExpired)}>Toggle Trial Expired</button>
      <p>Demo Started: {demoStarted ? 'Yes' : 'No'}</p>
      <button onClick={() => handleDemoStartedChange(!demoStarted)}>Toggle Demo Started</button>
      <p>Demo Time: {demoTime}</p>
      <button onClick={() => handleDemoTimeChange(demoTime + 1)}>Increase Demo Time</button>
      <button onClick={() => handleDemoTimeChange(demoTime - 1)}>Decrease Demo Time</button>
      <p>Demo Expired: {demoExpired ? 'Yes' : 'No'}</p>
      <button onClick={() => handleDemoExpiredChange(!demoExpired)}>Toggle Demo Expired</button>
      <p>Guided Tour: {guidedTour ? 'Yes' : 'No'}</p>
      <button onClick={() => handleGuidedTourChange(!guidedTour)}>Toggle Guided Tour</button>
      <p>Guided Tour Step: {guidedTourStep}</p>
      <button onClick={() => handleGuidedTourStepChange(guidedTourStep + 1)}>Next Guided Tour Step</button>
      <button onClick={() => handleGuidedTourStepChange(guidedTourStep - 1)}>Previous Guided Tour Step</button>
      <p>Free Trial: {freeTrial ? 'Yes' : 'No'}</p>
      <button onClick={() => handleFreeTrialChange(!freeTrial)}>Toggle Free Trial</button>
      <p>Free Trial Days: {freeTrialDays}</p>
      <button onClick={() => handleFreeTrialDaysChange(freeTrialDays + 1)}>Increase Free Trial Days</button>
      <button onClick={() => handleFreeTrialDaysChange(freeTrialDays - 1)}>Decrease Free Trial Days</button>
      <p>Free Trial Started: {freeTrialStarted ? 'Yes' : 'No'}</p>
      <button onClick={() => handleFreeTrialStartedChange(!freeTrialStarted)}>Toggle Free Trial Started</button>
      <p>Free Trial Expired: {freeTrialExpired ? 'Yes' : 'No'}</p>
      <button onClick={() => handleFreeTrialExpiredChange(!freeTrialExpired)}>Toggle Free Trial Expired</button>
    </div>
  );
}