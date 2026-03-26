import client from '../client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineCode } from 'react-icons/ai';
import { MdOutlineSettings } from 'react-icons/md';
import { RiDashboardLine } from 'react-icons/ri';
import { TbApi } from 'react-icons/tb';

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const saveUserProgress = async (userId: string, userProgress: any) => {
  try {
    const response = await client.post('/save-progress', {
      userId,
      userProgress,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getUserProgress = async (userId: string) => {
  try {
    const response = await client.get(`/get-progress/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null; // Return null if user progress is not found
  }
};

const getRecommendedSteps = async (userId: string, completedSteps: any) => {
  try {
    const response = await client.post('/get-recommended-steps', {
      userId,
      completedSteps,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const onboardingSteps = [
  {
    id: 1,
    title: 'Welcome to AutoGenerate API Documentation',
    description: 'Get started with our interactive tutorials and step-by-step guides',
    action: 'Start Tutorial',
  },
  {
    id: 2,
    title: 'Create Your First API Documentation',
    description: 'Learn how to create and manage your API documentation',
    action: 'Create API Documentation',
  },
  {
    id: 3,
    title: 'Explore Advanced Features',
    description: 'Discover how to use advanced features to customize your API documentation',
    action: 'Explore Advanced Features',
  },
];

export default function Page() {
  const userId = generateUUID();
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
    };
  });
  const [onboardingStep, setOnboardingStep] = useState(() => {
    const storedOnboardingStep = localStorage.getItem('onboardingStep');
    return storedOnboardingStep ? parseInt(storedOnboardingStep) : 1;
  });

  useEffect(() => {
    const storedOnboardingStep = localStorage.getItem('onboardingStep');
    if (storedOnboardingStep) {
      setOnboardingStep(parseInt(storedOnboardingStep));
    }
  }, []);

  const handleOnboardingStep = () => {
    setOnboardingStep(onboardingStep + 1);
    localStorage.setItem('onboardingStep', (onboardingStep + 1).toString());
  };

  const handleTutorialStep = () => {
    setTutorialStep(tutorialStep + 1);
    localStorage.setItem('tutorialStep', (tutorialStep + 1).toString());
  };

  const handleCompletedStep = (stepId: number) => {
    const updatedUserProgress = { ...userProgress };
    updatedUserProgress.completedSteps.push(stepId);
    setUserProgress(updatedUserProgress);
    localStorage.setItem('userProgress', JSON.stringify(updatedUserProgress));
  };

  return (
    <div>
      {onboardingStep <= onboardingSteps.length && (
        <div>
          <h2>{onboardingSteps[onboardingStep - 1].title}</h2>
          <p>{onboardingSteps[onboardingStep - 1].description}</p>
          <button onClick={handleOnboardingStep}>{onboardingSteps[onboardingStep - 1].action}</button>
        </div>
      )}
      {onboardingStep > onboardingSteps.length && (
        <div>
          <h2>Getting Started with AutoGenerate API Documentation</h2>
          <p>Follow these steps to get started:</p>
          <ul>
            <li>
              <Link href="/create-api-documentation">
                <a>Create Your First API Documentation</a>
              </Link>
            </li>
            <li>
              <Link href="/explore-advanced-features">
                <a>Explore Advanced Features</a>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}