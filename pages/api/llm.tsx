import { LLMChain } from "langchain/chains";
import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { input } = req.query;
    const model = new OpenAI({ temperature: 0 });

    // prompt 
    const prompt = PromptTemplate.fromTemplate("is this a properly formatted haiku? " + input as string + ". if it is not a haiku, please make me a haiku. if it is, please give me feedback on what you think of it and add the score on a new line.");

    const chain = new LLMChain({ llm: model, prompt });
    const test = await chain.call({})
    console.log("Result from LLM:" + JSON.stringify(test));
    const parsed = test["text"].split("Score: ")[1]
    const parsed2 = parsed.split("/10: ")[0]
    // console.log(typeof(parsed2))
    console.log(parsed2)

    // adding a row in db
    const prisma = new PrismaClient();
    const newUser = await prisma.user.create({
        data: {
          llm_input: input as string,
          llm_resp: test["text"], 
          score: parsed2,
        }
      });
      

    res.status(200).json({ 
      message: test["text"],
      score: parsed2
    })
}

// https://www.reddit.com/r/nextjs/comments/1595lsr/whats_the_correct_way_to_call_nextjs_api/
// You fetch the data in a server component and pass it down to a client component via props
// Only if you reload the page. If you need to reload data on the page creat an api endpoint and call fetch()
