"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { HandleGetImageResponse } from "@/services/handle-get-image/handle-get-image";
import Image from "next/image";
import { useCallback, useState } from "react";

async function fetchData(): Promise<HandleGetImageResponse | undefined> {
  try {
    const protocol = process?.env.NODE_ENV === "development" ? "http" : "https";
    const response = await fetch(`${protocol}://${window.location.host}/api/handle-get-image`, {
      cache: "no-store",
    });
    return response.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw new Error(`Failed to fetch data: ${error}`);
  }
}

export default function ImageDisplay() {
  const [data, setData] = useState<HandleGetImageResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchData();
      setData(result || null);
    } catch (err) {
      setError("An error occurred while fetching data");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const articleData = data?.firstCompleteArticle;
  const presignedUrl = data?.presignedUrl;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center mb-4">
        <Button 
          onClick={handleFetchData} 
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Fetch New Image"}
        </Button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {isLoading ? (
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/2 mb-2" />
            <Skeleton className="h-4 w-1/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[500px] w-[500px] mx-auto my-4 rounded-lg" />
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-4/5" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-4 w-1/3" />
          </CardFooter>
        </Card>
      ) : articleData ? (
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold mb-2">
              <a href={articleData.url} target="_blank" rel="noopener noreferrer">
                {articleData.title}
              </a>
            </h2>
            <div className="text-sm text-gray-500 mb-4">
              {articleData.author} -{" "}
              {new Date(articleData.published_at).toLocaleDateString()}
            </div>
          </CardHeader>
          <CardContent>
            {presignedUrl ? (
              <Image
                src={presignedUrl}
                alt={articleData.title}
                className="mx-auto my-4 rounded-lg"
                height={500}
                width={500}
              />
            ) : (
              <Skeleton className="h-[500px] w-[500px] mx-auto my-4 rounded-lg" />
            )}
            <p className="text-gray-400 mb-4">{articleData.description}</p>
          </CardContent>
          <CardFooter>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-500">Source:</span>
                <span className="text-sm font-semibold ml-1">
                  <a href={articleData.url} target="_blank" rel="noopener noreferrer">
                    {articleData.source_name}
                  </a>
                </span>
              </div>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <div>No data available. Click the button to fetch an image.</div>
      )}
    </div>
  );
}
