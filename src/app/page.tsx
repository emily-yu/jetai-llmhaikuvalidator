'use client'

import Image from "next/image";
import { LLMChain } from "langchain/chains";
import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { PrismaClient } from '@prisma/client'
import type { User } from '@prisma/client'
import { useState } from 'react';

export default function Home() {
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [validationMsg, setValidationMsg] = useState<string | null>(null);
  const handleApiCall = async () => {
      try {
        if (!inputValue.trim()) {
          setValidationMsg('Please input a haiku to proceed.');
          return
        }

        const response = await fetch(`/api/llm?input=${encodeURIComponent(inputValue)}`);
        const data = await response.json();
        setResult(data.message);
        setValidationMsg('No Error calling API'); 
      } catch (error) {
        console.error('Error calling API:', error);
        setResult('Error calling API');
        setValidationMsg('Error calling API');
      }
    };
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {validationMsg && (
        <p className="p-4 mt-2 text-sm text-green-600 dark:text-green-500">
          <span className="font-medium">{validationMsg}</span>
        </p>
      )}    

      <textarea 
        id="message" 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} 
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment...">
      </textarea>

      <p className="p-2 m-2 bg-gray-200 rounded-lg">
        {result && <p>{result}</p>}
      </p>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleApiCall}
      >Call API
      </button>
    </main>
  );
}