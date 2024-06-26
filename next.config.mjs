import { fileURLToPath } from "node:url";
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
import createJiti from "jiti";
const jiti = createJiti(fileURLToPath(import.meta.url));

// Here we use the @cloudflare/next-on-pages next-dev module to allow us to use bindings during local development
// (when running the application with `next dev`), for more information see:
// https://github.com/cloudflare/next-on-pages/blob/5712c57ea7/internal-packages/next-dev/README.md
if (process.env.NODE_ENV === "development") {
	await setupDevPlatform();
}
// Import env here to validate during build. Using jiti we can import .ts files :)
jiti("./src/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "oaidalleapiprodscus.blob.core.windows.net",
				pathname: "**",
			},
			{
				protocol: "http",
				hostname: "localhost",
				pathname: "**",
			},
		],
	},
};

export default nextConfig;
