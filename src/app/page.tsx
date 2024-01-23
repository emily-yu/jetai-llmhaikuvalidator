'use client'

import Image from "next/image";
import { LLMChain } from "langchain/chains";
import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { PrismaClient } from '@prisma/client'
import type { User } from '@prisma/client'

export default function Home() {
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const handleApiCall = async () => {
      try {
        const response = await fetch(`/api/llm?input=${encodeURIComponent(inputValue)}`);
        const data = await response.json();
        setResult(data.message);
      } catch (error) {
        console.error('Error calling API:', error);
        setResult('Error calling API');
      }
    };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      {/* todo: style better */}
      <div className="md:flex md:items-center mb-6">
        <form className="max-w-sm mx-auto">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
            <textarea id="message" value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>

<div className="flex flex-col items-center justify-center min-h-screen">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleApiCall}
            >Call API
            </button>
            {result && <p>{result}</p>}
        </div>

            {/* todo validate input haiku */}
            {/* todo hide and unhide these */}
            <p className="hidden mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> Username already taken!</p>
            <p className="hidden mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Alright!</span> Username available!</p>
        </form>
      </div> 
      <Button/>
    </main>
  );
}

import { useState } from 'react';
export function Button() {
    const [inputValue, setInputValue] = useState<string>('');
    const [result, setResult] = useState<string | null>(null);
    const handleApiCall = async () => {
        try {
          const response = await fetch(`/api/llm?input=${encodeURIComponent(inputValue)}`);
          const data = await response.json();
          setResult(data.message);
        } catch (error) {
          console.error('Error calling API:', error);
          setResult('Error calling API');
        }
      };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleApiCall}
            >Call API
            </button>
            {result && <p>{result}</p>}
        </div>
      )
}