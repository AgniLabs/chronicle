import { env } from "@/env/server";
import { S3Client } from "@aws-sdk/client-s3";

export const r2 = new S3Client({
	region: "auto",
	endpoint: env.CHRONICLE_R2_ENDPOINT,
	credentials: {
		accessKeyId: env.CHRONICLE_R2_ACCESS_ID,
		secretAccessKey: env.CHRONICLE_R2_SECRET_KEY,
	},
});
