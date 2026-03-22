use client;

import { useState } from 'react';
import Link from 'next/link';
import { AiOutlineArrowRight } from 'react-icons/ai';

export default function CtaPage() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('email', email);
    alert('Thank you for your interest!');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Get Started with AutoGenerate API Documentation</h1>
      <p className="text-lg text-gray-500 mb-8">Save time and reduce errors with our automatic API documentation generator.</p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-8 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Get Started <AiOutlineArrowRight className="ml-2" />
        </button>
      </form>
      <p className="text-lg text-gray-500 mt-8">
        Already have an account?{' '}
        <Link href="/dashboard" className="text-blue-500 hover:text-blue-700">
          Log in
        </Link>
      </p>
    </div>
  );
}