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

const features = [
  {
    id: 1,
    title: 'API Documentation',
    description: 'Create and manage your API documentation',
  },
  {
    id: 2,
    title: 'Code Generation',
    description: 'Generate code snippets for your API',
  },
  {
    id: 3,
    title: 'Settings',
    description: 'Configure your API documentation settings',
  },
];

const guidedOnboardingSteps = [
  {
    id: 1,
    title: 'Step 1: Introduction to AutoGenerate API Documentation',
    description: 'Learn about the benefits of using AutoGenerate API Documentation',
    tutorial: 'https://example.com/tutorial-1',
  },
  {
    id: 2,
    title: 'Step 2: Creating Your First API Documentation',
    description: 'Follow a step-by-step guide to create your first API documentation',
    tutorial: 'https://example.com/tutorial-2',
  },
  {
    id: 3,
    title: 'Step 3: Customizing Your API Documentation',
    description: 'Discover how to customize your API documentation with advanced features',
    tutorial: 'https://example.com/tutorial-3',
  },
];

export default function Page() {
  const [userId, setUserId] = useState<string | null>(null);
  const [userProgress, setUserProgress] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState<number | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      getUserProgress(storedUserId).then((progress) => {
        setUserProgress(progress);
        if (progress) {
          const currentStepId = progress.currentStep;
          const stepIndex = onboardingSteps.findIndex((step) => step.id === currentStepId);
          if (stepIndex !== -1) {
            setCurrentStep(stepIndex + 1);
          }
        }
      });
    } else {
      const newUserId = generateUUID();
      setUserId(newUserId);
      localStorage.setItem('userId', newUserId);
    }
  }, []);

  const handleStepCompletion = async (stepId: number) => {
    if (userId) {
      const updatedProgress = { ...userProgress, currentStep: stepId };
      await saveUserProgress(userId, updatedProgress);
      setUserProgress(updatedProgress);
      const recommendedSteps = await getRecommendedSteps(userId, updatedProgress);
      if (recommendedSteps) {
        const nextStepId = recommendedSteps.nextStep;
        const nextStepIndex = onboardingSteps.findIndex((step) => step.id === nextStepId);
        if (nextStepIndex !== -1) {
          setCurrentStep(nextStepIndex + 1);
        }
      }
    }
  };

  return (
    <div>
      {onboardingSteps.map((step, index) => (
        <div key={step.id}>
          <h2>{step.title}</h2>
          <p>{step.description}</p>
          <button onClick={() => handleStepCompletion(step.id)}>{step.action}</button>
          {index === currentStep - 1 && <p>Current Step</p>}
        </div>
      ))}
    </div>
  );
}