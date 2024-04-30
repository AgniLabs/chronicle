import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { HandleGetImageResponse } from "@/services/handle-get-image/handle-get-image";
import Image from "next/image";

async function fetchData(): Promise<
HandleGetImageResponse | undefined
> {
	try {
		const response = await fetch("/api/handle-get-image");
		return response.json();
	} catch (error) {
		console.error("Failed to fetch data:", error);
		throw new Error(`Failed to fetch data:", ${error}`)
	}
}

export default async function ImageDisplay() {
	try {
		const data = await fetchData();

		if (!data) {
			return <div>No data available</div>;
		}

		const { firstCompleteArticle: articleData, b64json } = data;

		return (
			<div className="container mx-auto p-4">
				{articleData ? (
					<Card>
						<CardHeader>
							<h2 className="text-2xl font-bold mb-2">
								<a href={articleData.url}>{articleData.title}</a>
							</h2>
							<div className="text-sm text-gray-500 mb-4">
								{articleData.author} -{" "}
								{new Date(articleData.publishedAt).toLocaleDateString()}
							</div>
						</CardHeader>
						<CardContent>
							{b64json ? (
								<Image
									src={b64json}
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
										<a href={articleData.url}>
											{/* @ts-ignore */}
											{articleData.source.name}
										</a>
									</span>
								</div>
							</div>
						</CardFooter>
					</Card>
				) : (
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
				)}
			</div>
		);
	} catch (error) {
		console.error("Error:", error);
		return <div>An error occurred while fetching data</div>;
	}
}
