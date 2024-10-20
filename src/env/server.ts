import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		NEWS_API_ENDPOINT: z.string().url(),
		NEWS_API_API_KEY: z.string().min(32),
		OPENAI_SECRET_KEY: z.string().min(1),
		OPENAI_ORG_ID: z.string().min(1),
		CHRONICLE_R2_ENDPOINT: z.string().url(),
		CHRONICLE_R2_ACCESS_ID: z.string().min(1),
		CHRONICLE_R2_SECRET_KEY: z.string().min(1),
		CHRONICLE_R2_BUCKET_NAME: z.string().min(1),
	},
	// If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manuall
	// For Next.js >= 13.4.4, you can just reference process.env:
	experimental__runtimeEnv: process.env,
});
