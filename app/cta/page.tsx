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
      <p className="text-lg text-gray-500 mb-8">Save time and reduce errors with our automatic API documentation generator. By using AutoGenerate API documentation, you can:</p>
      <ul className="list-none mb-8 text-lg text-gray-500">
        <li className="mb-2">Improve code readability and maintainability</li>
        <li className="mb-2">Reduce the time spent on writing and updating documentation</li>
        <li className="mb-2">Enhance collaboration and communication among team members</li>
        <li className="mb-2">Increase the accuracy and consistency of your documentation</li>
      </ul>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
        <div className="relative mb-4">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleBlur}
            placeholder="Enter your email to get started"
            className="py-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 w-full"
          />
          {formErrors.email.message && (
            <div className="absolute top-0 right-0 mt-2 mr-2 text-red-500 text-xs">{formErrors.email.message}</div>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`py-2 px-4 text-sm text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 ${
            isSubmitting ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-600 hover:bg-gray-700'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Get Started'}
        </button>
        {formErrors.general.message && (
          <div className="mt-2 text-red-500 text-xs">{formErrors.general.message}</div>
        )}
        {isSuccess && (
          <div className="mt-2 text-green-500 text-xs">{successMessage}</div>
        )}
      </form>
    </div>
  );
}