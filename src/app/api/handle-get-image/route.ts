import { handleGetImage } from "@/services/handle-get-image/handle-get-image";

export const runtime = "edge";

export async function GET() {
	try {
		const result = await handleGetImage();

		return new Response(JSON.stringify(result), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error("Failed to fetch data:", error);
		throw new Error(`Failed to fetch data:", ${error}`);
	}
}
