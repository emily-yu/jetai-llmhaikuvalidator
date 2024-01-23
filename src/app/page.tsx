import LLMComponent from "./LLMComponent"
import Button from "./Button"
import Image from "next/image";
import { LLMChain } from "langchain/chains";
import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { PrismaClient } from '@prisma/client'
import type { User } from '@prisma/client'

export default function Home() {
  
  
  const model = new OpenAI({ temperature: 0 });
    // todo: is the input a haiku?
    // todo: create a random haiku
    const prompt = PromptTemplate.fromTemplate("what is a haiku?");
    const chain = new LLMChain({ llm: model, prompt });
    const getResult = async () => {
      const test = await chain.call({})
      console.log("hi")
      console.log("Result from LLM:" + JSON.stringify(test));
  
      // adding a row in db
      const prisma = new PrismaClient();
        prisma.user.create({
          data: {
            email: "alice3@prisma.io" + Math.random()
        }})
        // return "hehe"
        // setStudents("hehe")
      return test["text"]
    };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      {/* todo: style better */}
      <div className="md:flex md:items-center mb-6">
        <form className="max-w-sm mx-auto">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
            <textarea id="message" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
            <Button></Button>

            {/* todo validate input haiku */}
            {/* todo hide and unhide these */}
            <p className="hidden mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> Username already taken!</p>
            <p className="hidden mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Alright!</span> Username available!</p>
        </form>
      </div> 
      
      <p>the result of the llm</p>
      {/* {getResult()} */}
      <LLMComponent message={JSON.stringify(getResult())}></LLMComponent>
    </main>
  );
}
