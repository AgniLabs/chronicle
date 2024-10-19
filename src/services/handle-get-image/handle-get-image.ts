import { transformArticleToChronicleEntry } from "@/lib/utils/utils";
import type { ChronicleTableEntryInsert } from "@/types/cloudflare/d1-db";
import { insertChronicleEntry } from "../cloudflare/d1/insert-chronicle-entry";
import { uploadImageToR2 } from "../cloudflare/r2/upload-to-r2";
import { getNewsData } from "../news-api/newsService";
import { generateImage, generatePrompt } from "../openai-api/openAIService";

export interface HandleGetImageResponse {
	firstCompleteArticle: ChronicleTableEntryInsert;
	presignedUrl?: string;
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
		const imageUrl = await generateImage(promptResponse);
		if (!imageUrl) {
			throw new Error("Image not generated");
		}

		console.log("fetching image from OpenAI");
		const imageResponse = await fetch(imageUrl);
		const imageBuffer = await imageResponse.arrayBuffer();

		// Generate a filename
		const filename = `dalle-${Date.now()}-${firstCompleteArticle.title
			.replace(/[^a-z0-9]/gi, "_")
			.toLowerCase()}.png`;

		// Upload the image to R2
		console.log("uploading image to R2");
		const r2ImageUrl = await uploadImageToR2(imageBuffer, filename);

		console.log("inserting articleData & promptData");
		const chronicleEntry = transformArticleToChronicleEntry(
			firstCompleteArticle,
			"ok",
			1,
			promptResponse,
			r2ImageUrl,
			filename,
		);

		console.log("inserting article data, prompt data, and image URL");
		try {
			await insertChronicleEntry(chronicleEntry);
			console.log("inserted article data, prompt data, and image URL");
		} catch (dbError) {
			console.error("Error inserting into DB:", dbError);
			throw new Error("Failed to insert article data into DB");
		}

		console.log(
			"All data stored successfully in Cloudflare ==> Returning data",
		);

		return {
			firstCompleteArticle: chronicleEntry,
			presignedUrl: r2ImageUrl,
		};
	} catch (error) {
		throw new Error("An error occurred:");
	}
}
