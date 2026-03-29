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
  const [progress, setProgress] = useState(0);

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
        message: 'Invalid email address',
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
    setProgress(0);
    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(intervalId);
          return 100;
        }
        return Math.min(prevProgress + 10, 100);
      });
    }, 100);
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
      clearInterval(intervalId);
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
    <div>
      <h1>AutoGenerate API Documentation</h1>
      <p>Enter your email to get started:</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleBlur}
          placeholder="example@example.com"
          disabled={isSubmitting}
        />
        {formErrors.email.message && (
          <div style={{ color: 'red' }}>
            {formErrors.email.message}
            <ul>
              {formErrors.email.suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <div>
              Submitting...{' '}
              <progress value={progress} max="100" style={{ width: '100px' }} />
            </div>
          ) : (
            <div>
              Submit <AiOutlineArrowRight />
            </div>
          )}
        </button>
        {formErrors.general.message && (
          <div style={{ color: 'red' }}>{formErrors.general.message}</div>
        )}
        {isSuccess && <div style={{ color: 'green' }}>{successMessage}</div>}
      </form>
    </div>
  );
}