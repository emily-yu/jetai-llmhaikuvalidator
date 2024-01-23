'use client'
import { useState } from 'react';
import { NextPage } from 'next';
export default function Button() {
    
    const [result, setResult] = useState<string | null>(null);
    const handleApiCall = async () => {
        try {
          const response = await fetch('/api/llm');
          const data = await response.json();
          setResult(data.message);
        } catch (error) {
          console.error('Error calling API:', error);
          setResult('Error calling API');
        }
      };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Welcome to my Next.js App</h1>
            <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleApiCall}
            >
            Call API
            </button>
            {result && <p>{result}</p>}
        </div>
      )
}