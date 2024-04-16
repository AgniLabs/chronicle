import { Hero } from "@/components/hero/Hero";
import { getNewsData } from "@/services/news-api/newsService";
import {
	generateImage,
	generatePrompt,
} from "@/services/openai-api/openAIService";
import type { Article } from "@/types/news-api";

export const runtime = 'edge';

async function getFirstArticleData() {
  const data = await getNewsData();

  const { articles } = data;

  const firstCompleteArticle = articles.find(
    (article) =>
      article.author !== null &&
      article.description !== null &&
      article.urlToImage !== null &&
      article.content !== null
  );

  return firstCompleteArticle;
}

async function getAIImageUrl(firstCompleteArticle?: Article) {
  if (!firstCompleteArticle) {
    throw new Error("No Article Given");
  }
  console.log("firstCompleteArticleJSON: ", firstCompleteArticle);

  const userPrompt = `can you give me a prompt for an image that represents the story: ${JSON.stringify(
    firstCompleteArticle
  )}`;

  const promptResponse = await generatePrompt(userPrompt);

  if (!promptResponse) {
    throw new Error("Prompt not generated");
  }

  console.log("prompt response: ", promptResponse);

  const imageResponse = await generateImage(promptResponse);

  console.log("image response: ", imageResponse);

  return imageResponse;
}


export default async function Home() {
  return (
    <section className="container flex flex-col items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <Hero />
      {/* <ImageDisplay/> */}
    </section>
  );
}
