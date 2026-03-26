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
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOnboardingSteps = onboardingSteps.filter((step) => {
    return step.title.toLowerCase().includes(searchQuery.toLowerCase()) || step.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const filteredFeatures = features.filter((feature) => {
    return feature.title.toLowerCase().includes(searchQuery.toLowerCase()) || feature.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <h1>AutoGenerate API Documentation</h1>
      <input
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search onboarding steps and features"
      />
      <h2>Onboarding Steps</h2>
      <ul>
        {filteredOnboardingSteps.map((step) => (
          <li key={step.id}>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            <button>{step.action}</button>
          </li>
        ))}
      </ul>
      <h2>Features</h2>
      <ul>
        {filteredFeatures.map((feature) => (
          <li key={feature.id}>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}