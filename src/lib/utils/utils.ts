import type { ChronicleTableEntryInsert } from "@/types/cloudflare/d1-db";
import type { Article } from "@/types/news-api";

export function transformArticleToChronicleEntry(
	article: Article,
	status: string,
	total_results: number,
	promptResponse: string,
	r2_image_url: string,
	r2_image_filename: string,
): ChronicleTableEntryInsert {
	return {
		status,
		total_results,
		source_id: article.source.id,
		source_name: article.source.name,
		author: article.author,
		title: article.title,
		description: article.description,
		url: article.url,
		url_to_image: article.urlToImage,
		published_at: article.publishedAt,
		content: article.content,
		image_prompt: promptResponse,
		r2_image_url: r2_image_url,
		r2_image_filename: r2_image_filename,
	};
}
