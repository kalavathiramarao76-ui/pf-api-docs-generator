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
  const [trialAccess, setTrialAccess] = useState(false);

  useEffect(() => {
    const storedSaveProgress = localStorage.getItem('saveProgress');
    if (storedSaveProgress) {
      setSaveProgress(JSON.parse(storedSaveProgress));
    }
  }, []);

  useEffect(() => {
    if (saveProgress) {
      localStorage.setItem('userProgress', JSON.stringify(userProgress));
      localStorage.setItem('saveProgress', JSON.stringify(saveProgress));
    }
  }, [userProgress, saveProgress]);

  useEffect(() => {
    const storedResumeProgress = localStorage.getItem('resumeProgress');
    if (storedResumeProgress) {
      setResumeProgress(JSON.parse(storedResumeProgress));
    }
  }, []);

  useEffect(() => {
    if (resumeProgress) {
      const storedUserProgress = localStorage.getItem('userProgress');
      if (storedUserProgress) {
        setUserProgress(JSON.parse(storedUserProgress));
      }
      localStorage.setItem('resumeProgress', JSON.stringify(resumeProgress));
    }
  }, [resumeProgress]);

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const saveUserProgress = () => {
    setSaveProgress(true);
    const userData = {
      userId: userId,
      userProgress: userProgress
    };
    client.post('/save-progress', userData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const resumeUserProgress = () => {
    setResumeProgress(true);
    client.get('/resume-progress', {
      params: {
        userId: userId
      }
    })
      .then((response) => {
        const userData = response.data;
        setUserProgress(userData.userProgress);
        console.log(userData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const provideRecommendations = () => {
    client.post('/provide-recommendations', {
      userId: userId,
      userProgress: userProgress
    })
      .then((response) => {
        const recommendations = response.data;
        setUserProgress({
          ...userProgress,
          recommendedSteps: recommendations
        });
        console.log(recommendations);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      {/* Your existing JSX code here */}
      <button onClick={saveUserProgress}>Save Progress</button>
      <button onClick={resumeUserProgress}>Resume Progress</button>
      <button onClick={provideRecommendations}>Get Recommendations</button>
    </div>
  );
}