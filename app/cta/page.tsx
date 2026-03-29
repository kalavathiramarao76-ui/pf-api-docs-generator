import { useState } from 'react';
import Link from 'next/link';
import { AiOutlineArrowRight } from 'react-icons/ai';
import StripeCheckout from 'react-stripe-checkout';

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
  const [paymentMethod, setPaymentMethod] = useState('');
  const [subscriptionPlan, setSubscriptionPlan] = useState('');

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

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubscriptionPlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubscriptionPlan(e.target.value);
  };

  const onToken = (token: any) => {
    try {
      const response = fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          email,
          paymentMethod,
          subscriptionPlan,
        }),
      });
      response.json().then((data) => {
        if (data.success) {
          setSuccessMessage('Payment successful!');
          setIsSuccess(true);
        } else {
          setFormErrors((prevErrors) => ({ ...prevErrors, general: { message: data.message, isValid: false } }));
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        setFormErrors((prevErrors) => ({ ...prevErrors, general: { message: error.message, isValid: false } }));
      } else {
        setFormErrors((prevErrors) => ({ ...prevErrors, general: { message: 'An unknown error occurred', isValid: false } }));
      }
    }
  };

  return (
    <div>
      <h1>Get Started</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} onBlur={handleBlur} />
          {formErrors.email.message && <div style={{ color: 'red' }}>{formErrors.email.message}</div>}
        </label>
        <label>
          Payment Method:
          <select value={paymentMethod} onChange={handlePaymentMethodChange}>
            <option value="">Select a payment method</option>
            <option value="credit-card">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </label>
        <label>
          Subscription Plan:
          <select value={subscriptionPlan} onChange={handleSubscriptionPlanChange}>
            <option value="">Select a subscription plan</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </label>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
        <StripeCheckout
          token={onToken}
          stripeKey="YOUR_STRIPE_PUBLIC_KEY"
          name="AutoGen Docs"
          description="Premium features and subscriptions"
          amount={1000}
        />
      </form>
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
    </div>
  );
}