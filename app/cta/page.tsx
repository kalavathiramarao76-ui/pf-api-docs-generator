import { useState } from 'react';
import Link from 'next/link';
import { AiOutlineArrowRight } from 'react-icons/ai';

export default function CtaPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({
    email: '',
    general: '',
  });
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
      setFormErrors((prevErrors) => ({ ...prevErrors, email: emailValidationError }));
      return false;
    }
    setFormErrors((prevErrors) => ({ ...prevErrors, email: '' }));
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
        setFormErrors((prevErrors) => ({ ...prevErrors, general: error.message }));
      } else {
        setFormErrors((prevErrors) => ({ ...prevErrors, general: 'An unknown error occurred' }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.value !== '') {
      setFormErrors((prevErrors) => ({ ...prevErrors, email: '' }));
    }
  };

  const handleBlur = () => {
    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      setFormErrors((prevErrors) => ({ ...prevErrors, email: emailValidationError }));
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, email: '' }));
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
          className={`px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.email ? 'border-red-500' : ''}`}
        />
        {formErrors.email && <p className="text-red-500 text-sm mb-4">{formErrors.email}</p>}
        {formErrors.general && <p className="text-red-500 text-sm mb-4">{formErrors.general}</p>}
        {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Submitting...' : 'Get Started'}
          <AiOutlineArrowRight className="ml-2" />
        </button>
      </form>
    </div>
  );
}