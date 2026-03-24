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

  const handleStartFreeTrial = () => {
    setFreeTrial(true);
    setFreeTrialStarted(true);
    const freeTrialEndDate = new Date();
    freeTrialEndDate.setDate(freeTrialEndDate.getDate() + freeTrialDays);
    localStorage.setItem('freeTrialEndDate', freeTrialEndDate.toISOString());
  };

  const checkTrialStatus = () => {
    const trialEndDate = localStorage.getItem('trialEndDate');
    if (trialEndDate) {
      const parsedTrialEndDate = new Date(trialEndDate);
      const currentDate = new Date();
      if (currentDate > parsedTrialEndDate) {
        setTrialExpired(true);
      }
    }
  };

  const checkDemoStatus = () => {
    const demoEndDate = localStorage.getItem('demoEndDate');
    if (demoEndDate) {
      const parsedDemoEndDate = new Date(demoEndDate);
      const currentDate = new Date();
      if (currentDate > parsedDemoEndDate) {
        setDemoExpired(true);
      }
    }
  };

  const checkFreeTrialStatus = () => {
    const freeTrialEndDate = localStorage.getItem('freeTrialEndDate');
    if (freeTrialEndDate) {
      const parsedFreeTrialEndDate = new Date(freeTrialEndDate);
      const currentDate = new Date();
      if (currentDate > parsedFreeTrialEndDate) {
        setFreeTrialExpired(true);
      }
    }
  };

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

  return (
    <div>
      {freeTrialStarted && !freeTrialExpired ? (
        <div>
          <h1>Free Trial</h1>
          <p>You have {freeTrialDays} days left in your free trial.</p>
          <button onClick={handleStartFreeTrial}>Start Free Trial</button>
        </div>
      ) : (
        <div>
          <h1>AutoGenerate API Documentation</h1>
          <p>
            <Link href="/tutorial">
              <a>
                <AiOutlineCode size={24} />
                Tutorial
              </a>
            </Link>
          </p>
          <p>
            <Link href="/settings">
              <a>
                <MdOutlineSettings size={24} />
                Settings
              </a>
            </Link>
          </p>
          <p>
            <Link href="/dashboard">
              <a>
                <RiDashboardLine size={24} />
                Dashboard
              </a>
            </Link>
          </p>
          <p>
            <Link href="/api">
              <a>
                <TbApi size={24} />
                API
              </a>
            </Link>
          </p>
          <button onClick={handleNextStep}>Next Step</button>
          <button onClick={handlePrevStep}>Previous Step</button>
          <button onClick={handleSampleProject}>Sample Project</button>
          <button onClick={handleStartTrial}>Start Trial</button>
          <button onClick={handleStartDemo}>Start Demo</button>
        </div>
      )}
    </div>
  );
}