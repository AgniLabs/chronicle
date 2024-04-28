import { Hero } from "@/components/hero/Hero";

export const runtime = "edge";

export default async function Home() {
	return (
		<section className="container flex flex-col items-center justify-center gap-6 pb-8 pt-6 md:py-10">
			<Hero />
			{/* <ImageDisplay/> */}
		</section>
	);
}
