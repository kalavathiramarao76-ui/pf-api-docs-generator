use client;

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineSave } from 'react-icons/ai';
import { toast } from '../components/toast';

interface Settings {
  theme: 'light' | 'dark';
  language: 'en' | 'fr';
}

const SettingsPage = () => {
  const router = useRouter();
  const [settings, setSettings] = useState<Settings>(() => {
    const storedSettings = localStorage.getItem('settings');
    return storedSettings ? JSON.parse(storedSettings) : { theme: 'light', language: 'en' };
  });

  const handleThemeChange = (theme: 'light' | 'dark') => {
    setSettings((prevSettings) => ({ ...prevSettings, theme }));
  };

  const handleLanguageChange = (language: 'en' | 'fr') => {
    setSettings((prevSettings) => ({ ...prevSettings, language }));
  };

  const handleSave = () => {
    localStorage.setItem('settings', JSON.stringify(settings));
    toast('Settings saved successfully');
    router.push('/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <div className="flex flex-col mb-4">
        <label className="text-lg font-medium mb-2">Theme</label>
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded-lg ${settings.theme === 'light' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
            onClick={() => handleThemeChange('light')}
          >
            Light
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${settings.theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
            onClick={() => handleThemeChange('dark')}
          >
            Dark
          </button>
        </div>
      </div>
      <div className="flex flex-col mb-4">
        <label className="text-lg font-medium mb-2">Language</label>
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded-lg ${settings.language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
            onClick={() => handleLanguageChange('en')}
          >
            English
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${settings.language === 'fr' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
            onClick={() => handleLanguageChange('fr')}
          >
            French
          </button>
        </div>
      </div>
      <button
        className="px-4 py-2 rounded-lg bg-blue-500 text-white flex gap-2"
        onClick={handleSave}
      >
        <AiOutlineSave size={20} />
        Save
      </button>
    </div>
  );
};

export default SettingsPage;