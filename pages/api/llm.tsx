import { LLMChain } from "langchain/chains";
import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const model = new OpenAI({ temperature: 0 });
    // todo: is the input a haiku?
    // todo: create a random haiku
    const prompt = PromptTemplate.fromTemplate("what is a haiku?");
    const chain = new LLMChain({ llm: model, prompt });
    // const getResult = () => {
    const test = await chain.call({})
    console.log("hi")
    console.log("Result from LLM:" + JSON.stringify(test));

    // adding a row in db
    const prisma = new PrismaClient();
    prisma.user.create({
    data: {
    email: "alice3@prisma.io" + Math.random()
    }})
    
    console.log(test["text"])

    async function fetchData() {
        // Simulating an asynchronous operation (e.g., fetching data from a database)
        return new Promise(resolve => {
          setTimeout(() => {
            resolve('Some data');
          }, 1000);
        });
      }
  res.status(200).json({ message: test["text"]})

}

// https://www.reddit.com/r/nextjs/comments/1595lsr/whats_the_correct_way_to_call_nextjs_api/
// You fetch the data in a server component and pass it down to a client component via props
// Only if you reload the page. If you need to reload data on the page creat an api endpoint and call fetch()
