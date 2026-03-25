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
  const [trialModeCountdown, setTrialModeCountdown] = useState(30 * 24 * 60 * 60 * 1000); // 30 days in milliseconds
  const [trialModeTimeLeft, setTrialModeTimeLeft] = useState(null);
  const [saveProgress, setSaveProgress] = useState(false);
  const [resumeProgress, setResumeProgress] = useState(false);
  const [onboardingSteps, setOnboardingSteps] = useState([
    {
      id: 1,
      title: 'Welcome to our product',
      description: 'This is the first step of our onboarding process',
      completed: false,
    },
    {
      id: 2,
      title: 'Getting started with our API',
      description: 'This is the second step of our onboarding process',
      completed: false,
    },
    {
      id: 3,
      title: 'Configuring your account',
      description: 'This is the third step of our onboarding process',
      completed: false,
    },
  ]);
  const [currentOnboardingStep, setCurrentOnboardingStep] = useState(1);

  useEffect(() => {
    const storedOnboardingSteps = localStorage.getItem('onboardingSteps');
    if (storedOnboardingSteps) {
      setOnboardingSteps(JSON.parse(storedOnboardingSteps));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('onboardingSteps', JSON.stringify(onboardingSteps));
  }, [onboardingSteps]);

  const handleOnboardingStepCompletion = (stepId) => {
    const updatedOnboardingSteps = onboardingSteps.map((step) => {
      if (step.id === stepId) {
        return { ...step, completed: true };
      }
      return step;
    });
    setOnboardingSteps(updatedOnboardingSteps);
  };

  const handleNextOnboardingStep = () => {
    const currentStepIndex = onboardingSteps.findIndex((step) => step.id === currentOnboardingStep);
    if (currentStepIndex < onboardingSteps.length - 1) {
      setCurrentOnboardingStep(onboardingSteps[currentStepIndex + 1].id);
    }
  };

  const handlePreviousOnboardingStep = () => {
    const currentStepIndex = onboardingSteps.findIndex((step) => step.id === currentOnboardingStep);
    if (currentStepIndex > 0) {
      setCurrentOnboardingStep(onboardingSteps[currentStepIndex - 1].id);
    }
  };

  return (
    <div>
      {onboardingSteps.map((step) => (
        <div key={step.id}>
          <h2>{step.title}</h2>
          <p>{step.description}</p>
          {step.completed ? (
            <button onClick={handleNextOnboardingStep}>Next Step</button>
          ) : (
            <button onClick={() => handleOnboardingStepCompletion(step.id)}>Complete Step</button>
          )}
        </div>
      ))}
      {currentOnboardingStep > 1 && (
        <button onClick={handlePreviousOnboardingStep}>Previous Step</button>
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