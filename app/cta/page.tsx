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
      <h1>Join Our Community</h1>
      <p>
        By signing up, you'll get access to exclusive content, early updates, and a chance to be part of a community that's shaping the future of API documentation.
      </p>
      <p>
        Here are just a few benefits you can expect:
      </p>
      <ul>
        <li>Stay up-to-date with the latest developments in API documentation</li>
        <li>Get access to exclusive content, including tutorials and guides</li>
        <li>Connect with a community of like-minded individuals who share your interests</li>
      </ul>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} onBlur={handleBlur} />
          {formErrors.email.message && <div style={{ color: 'red' }}>{formErrors.email.message}</div>}
          {formErrors.email.suggestions.length > 0 && (
            <ul>
              {formErrors.email.suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          )}
        </label>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <div>
              Submitting...{' '}
              <progress value={progress} max="100" style={{ width: '100px', height: '10px' }} />
            </div>
          ) : (
            <div>
              Sign up <AiOutlineArrowRight />
            </div>
          )}
        </button>
        {formErrors.general.message && <div style={{ color: 'red' }}>{formErrors.general.message}</div>}
        {isSuccess && <div style={{ color: 'green' }}>{successMessage}</div>}
      </form>
    </div>
  );
}