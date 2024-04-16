import { env } from "@/env";
import type { NewsResponse } from "@/types/news-api";

export async function getNewsData(): Promise<NewsResponse> {
  const country = "us";
  const url = `${env.NEWS_API_ENDPOINT}/v2/top-headlines?country=${country}&apiKey=${env.NEWS_API_API_KEY}`;

  const res = await fetch(url);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
