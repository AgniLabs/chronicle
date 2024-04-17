import { env } from "@/env";
import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: env.OPENAI_SECRET_KEY,
	organization: env.OPENAI_ORG_ID,
});

export async function generatePrompt(userPrompt: string) {
	console.log("Calling Prompt");
	const response = await openai.chat.completions.create({
		model: "gpt-3.5-turbo-0125",
		messages: [
			{
				role: "system",
				content:
					"You are a creative assistant. Generate imaginative and respectful image prompts based on user stories, ensuring they align with guidelines on sensitive content. Avoid direct depictions of individuals or copyrighted characters.",
			},
			{ role: "user", content: userPrompt },
		],
		max_tokens: 100,
		n: 1,
		stop: null,
		temperature: 0.8,
	});

	return response.choices[0].message.content;
}

export async function generateImage(userPrompt: string) {
	const imageResponse = await openai.images.generate({
		model: "dall-e-3",
		prompt: userPrompt,
		n: 1,
		size: "1024x1024",
		quality: "standard",
		response_format: "b64_json",
	});

	return imageResponse.data[0].b64_json;
}
