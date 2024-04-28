import { handleGetImage } from "@/services/handle-get-image/handle-get-image";

export const runtime = "edge";

export async function GET() {
	try {
		const result = await handleGetImage();

		if (result) {
			return Response.json({
				articleData: result?.firstCompleteArticle,
				base64ImageData: result?.b64json,
			});
		}
		console.log("No data available");
	} catch (error) {
		console.error("Failed to fetch data:", error);
		throw new Error(`Failed to fetch data:", ${error}`);
	}
}
