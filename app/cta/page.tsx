import { useState } from 'react';
import Link from 'next/link';
import { AiOutlineArrowRight } from 'react-icons/ai';

export default function CtaPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    if (email.trim() === '') {
      return 'Email is required';
    }
    return '';
  };

  const validateForm = () => {
    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      return false;
    }
    return true;
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
        setGeneralError(error.message);
      } else {
        setGeneralError('An unknown error occurred');
      }
    } finally {
      setIsSubmitting(false);
      setEmailError('');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.value !== '') {
      setEmailError('');
    }
  };

  const handleBlur = () => {
    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
    } else {
      setEmailError('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Get Started with AutoGenerate API Documentation</h1>
      <p className="text-lg text-gray-500 mb-8">Save time and reduce errors with our automatic API documentation generator.</p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleBlur}
          placeholder="Enter your email"
          className={`px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${emailError ? 'border-red-500' : ''}`}
        />
        {emailError && <p className="text-red-500 text-sm mb-4">{emailError}</p>}
        {generalError && <p className="text-red-500 text-sm mb-4">{generalError}</p>}
        {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}
        <button
          type="submit"
          className={`px-4 py-2 mb-4 bg-blue-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 border-4 border-gray-200 rounded-full border-t-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"></svg>
              Submitting...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <AiOutlineArrowRight className="mr-2" />
              Get Started
            </div>
          )}
        </button>
      </form>
    </div>
  );
}