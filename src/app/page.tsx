'use client'

import Image from "next/image";
import { LLMChain } from "langchain/chains";
import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { PrismaClient } from '@prisma/client'
import type { User } from '@prisma/client'
import { useState } from 'react';
import { ERROR_API } from './constants';


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
      } catch (error) {
        setResult(ERROR_API);
        setValidationMsg(ERROR_API);
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
        className="common-textarea" placeholder="Write a haiku here...">
      </textarea>

      <p className="p-2 m-2 bg-gray-200 rounded-lg">
        {result && <p>{result}</p>}
      </p>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleApiCall}
      >Check Validity
      </button>
    </main>
  );
}