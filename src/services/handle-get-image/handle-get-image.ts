import type { Source } from "@/types/news-api";
import { getNewsData } from "../news-api/newsService";
import { generateImage, generatePrompt } from "../openai-api/openAIService";

interface articleData {
	author: string | null;
	title: string;
	description: string | null;
	url: string;
	url_to_image: string | null;
	published_at: string;
	content: string | null;
	source_id: Source;
}

interface HandleGetImageResponse {
	articleData: articleData;
	b64json: string;
}

export async function handleGetImage(): Promise<
	HandleGetImageResponse | undefined
> {
	try {
		console.log("getting news data");
		const newsData = await getNewsData(); // Assuming this returns NewsResponse
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
		console.log("imageResponseb64_json: ", imageResponseb64_json);

		// Extract and parse the image data
		console.log("extracting image data");
		const b64json = `{"imageData":"data:image/png;base64,${imageResponseb64_json}"}`;
		// const obj = JSON.parse(b64json);
		// const base64ImageData = obj.imageData;

		console.log("inputting into promptData");
		// TODO: INCORPORATE THIRDWEB HERE

		console.log("inputting into imageData");
		// TODO: INCORPORATE THIRDWEB HERE

		const articleData = {
			author: firstCompleteArticle.author,
			title: firstCompleteArticle.title,
			description: firstCompleteArticle.description,
			url: firstCompleteArticle.url,
			url_to_image: firstCompleteArticle.urlToImage,
			published_at: firstCompleteArticle.publishedAt,
			content: firstCompleteArticle.content,
			source_id: firstCompleteArticle.source,
		};

		// Insert article with all references
		console.log("inserting articleData");
		// TODO: INCORPORATE THIRDWEB HERE

		console.log("All data stored successfully in Supabase");
		console.log("Returning data: ", {
			articleData,
			b64json,
		});

		return {
			articleData,
			b64json,
		};
	} catch (error) {
		throw new Error("An error occurred:");
	}
}
