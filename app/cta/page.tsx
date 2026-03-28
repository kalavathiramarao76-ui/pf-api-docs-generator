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
      };
    }
    if (!emailRegex.test(email)) {
      return {
        message: 'Please enter a valid email address (e.g. example@example.com)',
        isValid: false,
      };
    }
    return {
      message: '',
      isValid: true,
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
      <p className="text-lg text-gray-500 mb-8">Save time and reduce errors with our automatic API documentation generator.</p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
        <div className="relative mb-4">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleBlur}
            placeholder="Enter your email address"
            className="w-full p-4 pl-10 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formErrors.email.message && (
            <div className="absolute top-full left-0 mt-2 text-xs text-red-600">{formErrors.email.message}</div>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full p-4 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <svg
              className="w-5 h-5 mx-auto animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <span>Get Started</span>
          )}
        </button>
        {formErrors.general.message && (
          <div className="mt-2 text-xs text-red-600">{formErrors.general.message}</div>
        )}
        {isSuccess && (
          <div className="mt-2 text-xs text-green-600">{successMessage}</div>
        )}
      </form>
    </div>
  );
}