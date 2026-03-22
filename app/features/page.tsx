use client;

import { useState } from 'react';
import Link from 'next/link';
import { AiOutlineCode } from 'react-icons/ai';
import { MdOutlineSettings } from 'react-icons/md';
import { RiDashboardLine } from 'react-icons/ri';
import { TbApi } from 'react-icons/tb';

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
      <h1 className="text-3xl font-bold mb-4">Features</h1>
      <p className="text-lg mb-8">
        Automatically generates API documentation from code, saving developers time and reducing errors.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <RiDashboardLine size={24} className="text-gray-500 dark:text-gray-400 mb-2" />
          <h2 className="text-lg font-bold mb-2">Dashboard</h2>
          <p className="text-sm">Track changes and updates to your API.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <TbApi size={24} className="text-gray-500 dark:text-gray-400 mb-2" />
          <h2 className="text-lg font-bold mb-2">API Docs</h2>
          <p className="text-sm">Automatic API documentation generation.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <MdOutlineSettings size={24} className="text-gray-500 dark:text-gray-400 mb-2" />
          <h2 className="text-lg font-bold mb-2">Settings</h2>
          <p className="text-sm">Customizable documentation templates.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <AiOutlineCode size={24} className="text-gray-500 dark:text-gray-400 mb-2" />
          <h2 className="text-lg font-bold mb-2">Code Integration</h2>
          <p className="text-sm">Integration with popular development tools.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-2">Collaboration</h2>
          <p className="text-sm">Collaboration features for teams.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-2">Change Tracking</h2>
          <p className="text-sm">Track changes and updates to your API.</p>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4">Comparison Table</h2>
      <table className="w-full mb-8 border border-gray-200 dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-2 text-lg font-bold">Feature</th>
            <th className="px-4 py-2 text-lg font-bold">Manual API Documentation</th>
            <th className="px-4 py-2 text-lg font-bold">AutoGenerate API Documentation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">Time Consumption</td>
            <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">High</td>
            <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">Low</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">Error Rate</td>
            <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">High</td>
            <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">Low</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">Collaboration Features</td>
            <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">Limited</td>
            <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">Advanced</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">Customization Options</td>
            <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">Limited</td>
            <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">Extensive</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">Integration with Development Tools</td>
            <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">Limited</td>
            <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">Seamless</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}