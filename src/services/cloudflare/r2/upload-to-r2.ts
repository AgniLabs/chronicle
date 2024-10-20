import { env } from "@/env/server";
import { r2 } from "@/services/cloudflare/r2/r2";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function uploadImageToR2(
	imageBuffer: ArrayBuffer,
	filename: string,
): Promise<string> {
	if (
		!env.CHRONICLE_R2_ENDPOINT ||
		!env.CHRONICLE_R2_ACCESS_ID ||
		!env.CHRONICLE_R2_SECRET_KEY ||
		!env.CHRONICLE_R2_BUCKET_NAME
	) {
		throw new Error("Missing R2 environment variables");
	}

	try {
		await r2.send(
			new PutObjectCommand({
				Bucket: env.CHRONICLE_R2_BUCKET_NAME,
				Key: filename,
				Body: new Uint8Array(imageBuffer),
				ContentType: "image/png", // Adjust if necessary
			}),
		);

		// Generate a presigned URL for the uploaded image
		const command = new GetObjectCommand({
			Bucket: env.CHRONICLE_R2_BUCKET_NAME,
			Key: filename,
		});
		// @ts-ignore
		const presignedUrl = await getSignedUrl(r2, command, { expiresIn: 3600 }); // URL expires in 1 hour

		return presignedUrl;
	} catch (error) {
		console.error("Error uploading to R2:", error);
		throw new Error("Failed to upload image to R2");
	}
}
