import { env } from "@/env/server";
import OpenAI, { OpenAIError } from "openai";

const openai = new OpenAI({
	apiKey: env.OPENAI_SECRET_KEY,
	organization: env.OPENAI_ORG_ID,
});

export async function generatePrompt(userPrompt: string) {
	console.log("Starting generatePrompt with user input:", userPrompt);

	try {
		const response = await openai.chat.completions.create({
			model: "chatgpt-4o-latest",
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
			temperature: 0.8,
		});

		console.log("API Response:", JSON.stringify(response, null, 2));

		if (
			response.choices &&
			response.choices.length > 0 &&
			response.choices[0].message
		) {
			const generatedPrompt = response.choices[0].message.content;
			console.log("Generated prompt:", generatedPrompt);
			return generatedPrompt;
		}
		throw new Error("Unexpected response structure from OpenAI API");
	} catch (error) {
		if (error instanceof OpenAIError) {
			console.error("OpenAI API Error:", error.message);
		} else {
			console.error("Unexpected error in generatePrompt:", error);
		}
		throw error; // Re-throw the error for the caller to handle
	}
}

export async function generateImage(userPrompt: string) {
	const imageResponse = await openai.images.generate({
		model: "dall-e-3",
		prompt: userPrompt,
		n: 1,
		size: "1024x1024",
		quality: "standard",
		response_format: "url",
	});

	return imageResponse.data[0].url;
}
