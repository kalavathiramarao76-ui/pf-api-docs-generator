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
    if (!emailRegex.test(email)) {
      return {
        message: 'Please enter a valid email address',
        isValid: false,
      };
    }
    if (email.trim() === '') {
      return {
        message: 'Email is required',
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
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleBlur}
          placeholder="Enter your email"
          className={`px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.email.isValid ? '' : 'border-red-500'}`}
        />
        {formErrors.email.message && <p className="text-red-500 mb-4">{formErrors.email.message}</p>}
        {isSubmitting ? (
          <div className="flex items-center justify-center mb-4">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Get Started
          </button>
        )}
        {formErrors.general.message && <p className="text-red-500 mb-4">{formErrors.general.message}</p>}
        {isSuccess && <p className="text-green-500 mb-4">{successMessage}</p>}
      </form>
    </div>
  );
}