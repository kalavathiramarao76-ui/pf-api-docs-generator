import { useState } from 'react';
import Link from 'next/link';
import { AiOutlineArrowRight } from 'react-icons/ai';

export default function CtaPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
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
    } catch (error) {
      setGeneralError('An error occurred while submitting your email. Please try again.');
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

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Get Started with AutoGenerate API Documentation</h1>
      <p className="text-lg text-gray-500 mb-8">Save time and reduce errors with our automatic API documentation generator.</p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          className={`px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${emailError ? 'border-red-500' : ''}`}
        />
        {emailError && <p className="text-red-500 text-sm mb-4">{emailError}</p>}
        {generalError && <p className="text-red-500 text-sm mb-4">{generalError}</p>}
        {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-8 py-2 relative ${isSubmitting ? 'bg-blue-300' : 'bg-blue-500'} text-white rounded-lg hover:${isSubmitting ? '' : 'bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          {isSubmitting ? (
            <div className="flex items-center">
              Submitting...{' '}
              <svg
                className="ml-2 animate-spin h-5 w-5 border-4 border-gray-200 border-t-blue-600 rounded-full"
                viewBox="0 0 24 24"
              />
            </div>
          ) : (
            <div className="flex items-center">
              Get Started <AiOutlineArrowRight className="ml-2" />
            </div>
          )}
        </button>
      </form>
    </div>
  );
}