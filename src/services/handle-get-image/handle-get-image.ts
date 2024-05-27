import type { Article } from "@/types/news-api";
import { getNewsData } from "../news-api/news-service";
import { generateImage, generatePrompt } from "../openai-api/open-ai-service";

export interface HandleGetImageResponse {
	firstCompleteArticle: Article | undefined;
	b64json: string;
}

export async function handleGetImage(): Promise<
	HandleGetImageResponse | undefined
> {
	try {
		console.log("getting news data");
		const newsData = await getNewsData();
		if (newsData.status !== "ok" || !newsData.articles.length) {
			throw new Error("No articles found or bad response");
		}

		const firstCompleteArticle = newsData.articles.find(
			(article) =>
				article.author &&
				article.description &&
				article.urlToImage &&
				article.content,
		);
		console.log("firstCompleteArticle: ", firstCompleteArticle);

		if (!firstCompleteArticle) {
			throw new Error("No complete article with all data found");
		}

		console.log("getting prompt");
		// Generate prompt based on the complete article data
		const promptResponse = await generatePrompt(
			`can you give me a prompt for an image that represents the story: ${JSON.stringify(
				firstCompleteArticle,
			)}`,
		);
		console.log("promptResponse: ", promptResponse);

		if (!promptResponse) {
			throw new Error("Prompt not generated");
		}

		// Generate image based on the prompt
		console.log("getting image generation");
		const imageResponseb64_json = await generateImage(promptResponse);
		if (!imageResponseb64_json) {
			throw new Error("Image not generated");
		}
		console.log(`imageResponseb64_json: , ${!!imageResponseb64_json}`);

		// Extract and parse the image data
		console.log("extracting image data");
		const b64json = `{"imageData":"data:image/png;base64,${imageResponseb64_json}"}`;
		// const obj = JSON.parse(b64json);
		// const base64ImageData = obj.imageData;

		console.log("inputting into promptData");
		// TODO: Save prompt data

		console.log("inputting into imageData");
		// TODO: save image data

		console.log("inserting articleData");
		// TODO: save article data

		console.log("");

		console.log("All data stored successfully in Supabase");
		console.log("Returning data: ", {
			firstCompleteArticle,
			b64json,
		});

		return {
			firstCompleteArticle,
			b64json,
		};
	} catch (error) {
		throw new Error("An error occurred:");
	}
}
