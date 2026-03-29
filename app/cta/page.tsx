import { useState } from 'react';
import Link from 'next/link';
import { AiOutlineArrowRight } from 'react-icons/ai';

export default function CtaPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({
    email: {
      message: '',
      isValid: true,
      suggestions: [],
    },
    general: {
      message: '',
      isValid: true,
    },
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.trim() === '') {
      return {
        message: 'Email is required',
        isValid: false,
        suggestions: ['Please enter a valid email address (e.g. example@example.com)'],
      };
    }
    if (!emailRegex.test(email)) {
      return {
        message: 'Please enter a valid email address (e.g. example@example.com)',
        isValid: false,
        suggestions: [
          'Make sure to include the "@" symbol',
          'Ensure the domain is valid (e.g. example.com)',
          'Check for any typos in the email address',
        ],
      };
    }
    return {
      message: '',
      isValid: true,
      suggestions: [],
    };
  };

  const validateForm = () => {
    const emailValidationError = validateEmail(email);
    setFormErrors((prevErrors) => ({ ...prevErrors, email: emailValidationError }));
    return emailValidationError.isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    try {
      localStorage.setItem('email', email);
      setSuccessMessage('Thank you for your interest! We will be in touch soon.');
      setIsSuccess(true);
    } catch (error) {
      if (error instanceof Error) {
        setFormErrors((prevErrors) => ({ ...prevErrors, general: { message: error.message, isValid: false } }));
      } else {
        setFormErrors((prevErrors) => ({ ...prevErrors, general: { message: 'An unknown error occurred', isValid: false } }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const emailValidationError = validateEmail(e.target.value);
    setFormErrors((prevErrors) => ({ ...prevErrors, email: emailValidationError }));
  };

  const handleBlur = () => {
    const emailValidationError = validateEmail(email);
    setFormErrors((prevErrors) => ({ ...prevErrors, email: emailValidationError }));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Get Started with AutoGenerate API Documentation</h1>
      <p className="text-lg text-gray-500 mb-8">Save time and reduce errors with our automatic API documentation generator. By using AutoGenerate API documentation, you can:</p>
      <ul className="list-none mb-8 text-lg text-gray-500">
        <li className="mb-2">Improve code readability and maintainability</li>
        <li className="mb-2">Reduce the time spent on writing and updating documentation</li>
        <li className="mb-2">Enhance collaboration and communication among team members</li>
      </ul>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleBlur}
          placeholder="Enter your email address"
          className={`w-full p-4 mb-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            !formErrors.email.isValid ? 'border-red-500' : ''
          }`}
        />
        {formErrors.email.message && (
          <div className="text-red-500 mb-4">
            {formErrors.email.message}
            {formErrors.email.suggestions.length > 0 && (
              <ul className="list-none mt-2">
                {formErrors.email.suggestions.map((suggestion, index) => (
                  <li key={index} className="text-gray-500">
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Get Started'}
        </button>
        {isSuccess && (
          <div className="text-green-500 mt-4">
            {successMessage}
          </div>
        )}
        {formErrors.general.message && (
          <div className="text-red-500 mt-4">
            {formErrors.general.message}
          </div>
        )}
      </form>
    </div>
  );
}