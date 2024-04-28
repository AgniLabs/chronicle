export type SiteConfig = typeof siteConfig;
// import { env } from "@/env.mjs"

export const siteConfig = {
	name: "newsimages",
	description: "own a piece of history",
	mainNav: [],
	links: {
		X: "https://x.com/AgniLabs",
		github: "https://github.com/AgniLabs/newsimages",
		// docs: env.NEXT_PUBLIC_APP_URL,
		about: "/about",
		topics: "/topics",
	},
	creator: "@AgniLabs",
	url: "https://newsimages.agnilabs.xyz",
	ogImage: "https://newsimages.agnilabs.xyz/ni-og.png",
	logoUrl: "https://newsimages.agnilabs.xyz/news-images-logo.svg",
};
