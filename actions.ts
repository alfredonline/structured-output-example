"use server";
import OpenAI from "openai";
import z from "zod";
import { zodResponseFormat} from "openai/helpers/zod"

const openai = new OpenAI({ apiKey: "put your key here" });

const ChapterStructure = z.object({
    title: z.string(),
    number: z.number(),
    summary: z.string(),
    main_characters: z.array(z.string()),
    setting: z.string(),
})

export async function GenerateChapter() {
    const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o-2024-08-06",
        messages: [
            {
                role: "system",
                content: "You are an AI assistant that helps users generate story chapters. Only use the schema provided"
            },
            {
                role: "user",
                content: `Create a chapter based on the following prompt: A horse walks into a bar.`
            }
        ],
        response_format: zodResponseFormat(ChapterStructure, "chapterResponse"),
    })

    const message = completion.choices[0]?.message;

    if (message?.parsed) {
        console.log(message.parsed)
        console.log(message.parsed.title)
        console.log(message.parsed.number)
        console.log(message.parsed.summary)
        console.log(message.parsed.main_characters)
        console.log(message.parsed.setting)
    } else {
        console.log(message.refusal)
    }
}