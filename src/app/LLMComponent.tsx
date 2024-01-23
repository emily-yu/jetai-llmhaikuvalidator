import Image from "next/image";
import { LLMChain } from "langchain/chains";
import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { PrismaClient } from '@prisma/client'
import type { User } from '@prisma/client'
// import { useState } from 'react';


export default function LLMComponent({
  message,
}: {
  message: string;
  // children: React.ReactNode;
}) {
    // const [students, setStudents] = useState("");
    // useEffect(() => {
    //   if (typeof window !== 'undefined' && 'ethereum' in window) {
    //     setStudents(true);
    //   }
    // }, []);
  
  
    return (
        <p>{message}</p>
    );
}