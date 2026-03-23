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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
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
          disabled={isSubmitting || isSuccess}
          className={`px-8 py-2 relative ${isSubmitting ? 'cursor-not-allowed' : ''} ${isSuccess ? 'bg-green-500 text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'} rounded-lg`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="spinner-border animate-spin inline-block w-4 h-4 border-4 rounded-full text-white" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <span className="ml-2">Submitting...</span>
            </div>
          ) : (
            <span>{isSuccess ? 'Thank you!' : 'Get Started'}</span>
          )}
        </button>
      </form>
    </div>
  );
}