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
	client: {},
	// For Next.js >= 13.4.4, you only need to destructure client variables:
	experimental__runtimeEnv: {},
});
