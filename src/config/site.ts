export type SiteConfig = typeof siteConfig;
// import { env } from "@/env.mjs"

export const siteConfig = {
	name: "chronicle",
	description: "own a piece of history",
	mainNav: [],
	links: {
		X: "https://x.com/agniLabs",
		github: "https://github.com/agnilabs/chronicle",
		// docs: env.NEXT_PUBLIC_APP_URL,
		about: "/about",
		topics: "/topics",
	},
	creator: "@agnilabs",
	url: "https://chronicle.agnilabs.xyz",
	ogImage: "https://chronicle.agnilabs.xyz/ni-og.png",
	logoUrl: "https://chronicle.agnilabs.xyz/news-images-logo.svg",
};
