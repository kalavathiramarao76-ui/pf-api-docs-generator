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
    return storedUserProgress ? JSON.parse(storedUserProgress) : {};
  });

  useEffect(() => {
    const fetchUserProgress = async () => {
      const fetchedProgress = await getUserProgress(userId);
      if (fetchedProgress) {
        setUserProgress(fetchedProgress);
      }
    };
    fetchUserProgress();
  }, [userId]);

  useEffect(() => {
    const saveProgress = async () => {
      await saveUserProgress(userId, userProgress);
    };
    saveProgress();
  }, [userProgress, userId]);

  useEffect(() => {
    const saveTutorialStep = async () => {
      const updatedProgress = { ...userProgress, tutorialStep };
      await saveUserProgress(userId, updatedProgress);
    };
    saveTutorialStep();
  }, [tutorialStep, userId, userProgress]);

  useEffect(() => {
    const saveSampleProject = async () => {
      const updatedProgress = { ...userProgress, sampleProject };
      await saveUserProgress(userId, updatedProgress);
    };
    saveSampleProject();
  }, [sampleProject, userId, userProgress]);

  useEffect(() => {
    const saveTrialStarted = async () => {
      const updatedProgress = { ...userProgress, trialStarted };
      await saveUserProgress(userId, updatedProgress);
    };
    saveTrialStarted();
  }, [trialStarted, userId, userProgress]);

  useEffect(() => {
    const saveTrialDays = async () => {
      const updatedProgress = { ...userProgress, trialDays };
      await saveUserProgress(userId, updatedProgress);
    };
    saveTrialDays();
  }, [trialDays, userId, userProgress]);

  useEffect(() => {
    const saveTrialExpired = async () => {
      const updatedProgress = { ...userProgress, trialExpired };
      await saveUserProgress(userId, updatedProgress);
    };
    saveTrialExpired();
  }, [trialExpired, userId, userProgress]);

  useEffect(() => {
    const saveDemoStarted = async () => {
      const updatedProgress = { ...userProgress, demoStarted };
      await saveUserProgress(userId, updatedProgress);
    };
    saveDemoStarted();
  }, [demoStarted, userId, userProgress]);

  useEffect(() => {
    const saveDemoTime = async () => {
      const updatedProgress = { ...userProgress, demoTime };
      await saveUserProgress(userId, updatedProgress);
    };
    saveDemoTime();
  }, [demoTime, userId, userProgress]);

  useEffect(() => {
    const saveDemoExpired = async () => {
      const updatedProgress = { ...userProgress, demoExpired };
      await saveUserProgress(userId, updatedProgress);
    };
    saveDemoExpired();
  }, [demoExpired, userId, userProgress]);

  useEffect(() => {
    const saveGuidedTour = async () => {
      const updatedProgress = { ...userProgress, guidedTour };
      await saveUserProgress(userId, updatedProgress);
    };
    saveGuidedTour();
  }, [guidedTour, userId, userProgress]);

  useEffect(() => {
    const saveGuidedTourStep = async () => {
      const updatedProgress = { ...userProgress, guidedTourStep };
      await saveUserProgress(userId, updatedProgress);
    };
    saveGuidedTourStep();
  }, [guidedTourStep, userId, userProgress]);

  useEffect(() => {
    const saveFreeTrial = async () => {
      const updatedProgress = { ...userProgress, freeTrial };
      await saveUserProgress(userId, updatedProgress);
    };
    saveFreeTrial();
  }, [freeTrial, userId, userProgress]);

  useEffect(() => {
    const saveFreeTrialDays = async () => {
      const updatedProgress = { ...userProgress, freeTrialDays };
      await saveUserProgress(userId, updatedProgress);
    };
    saveFreeTrialDays();
  }, [freeTrialDays, userId, userProgress]);

  useEffect(() => {
    const saveFreeTrialStarted = async () => {
      const updatedProgress = { ...userProgress, freeTrialStarted };
      await saveUserProgress(userId, updatedProgress);
    };
    saveFreeTrialStarted();
  }, [freeTrialStarted, userId, userProgress]);

  useEffect(() => {
    const saveFreeTrialExpired = async () => {
      const updatedProgress = { ...userProgress, freeTrialExpired };
      await saveUserProgress(userId, updatedProgress);
    };
    saveFreeTrialExpired();
  }, [freeTrialExpired, userId, userProgress]);

  useEffect(() => {
    const saveTrialMode = async () => {
      const updatedProgress = { ...userProgress, trialMode };
      await saveUserProgress(userId, updatedProgress);
    };
    saveTrialMode();
  }, [trialMode, userId, userProgress]);

  useEffect(() => {
    const saveCountdown = async () => {
      const updatedProgress = { ...userProgress, countdown };
      await saveUserProgress(userId, updatedProgress);
    };
    saveCountdown();
  }, [countdown, userId, userProgress]);

  useEffect(() => {
    const saveTimeLeft = async () => {
      const updatedProgress = { ...userProgress, timeLeft };
      await saveUserProgress(userId, updatedProgress);
    };
    saveTimeLeft();
  }, [timeLeft, userId, userProgress]);

  return (
    <div>
      {/* Your page content here */}
    </div>
  );
}