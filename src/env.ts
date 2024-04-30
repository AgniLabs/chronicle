import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		NEWS_API_ENDPOINT: z.string().url(),
		NEWS_API_API_KEY: z.string().min(32),
		OPENAI_SECRET_KEY: z.string().min(1),
		OPENAI_ORG_ID: z.string().min(1),
		NI_NFT_CONTRACT: z.string().min(1),
		THIRDWEB_SECRET_KEY: z.string().min(1),
		NI_MKT_CONTRACT: z.string().min(1),
	},
	client: {
		NEXT_PUBLIC_NI_NFT_CLIENT_ID: z.string().min(1),
	},
	// For Next.js >= 13.4.4, you only need to destructure client variables:
	experimental__runtimeEnv: {
		NEXT_PUBLIC_NI_NFT_CLIENT_ID: process.env.NEXT_PUBLIC_NI_NFT_CLIENT_ID,
	},
});
