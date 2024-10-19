import { Hero } from "@/components/hero/Hero";
import ImageDisplay from "@/components/image-display/ImageDisplay";
import { ChronicleTableEntryResponse } from "@/types/cloudflare/d1-db";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export default async function Home() {
  const chronicleDB = getRequestContext().env.CHRONICLE_DB;

  const chronicleData = await chronicleDB
    .prepare("SELECT * FROM chronicle_table LIMIT 10;")
    .first<ChronicleTableEntryResponse>();

  console.log("chronicleData: ", chronicleData);

  return (
    <section className="container flex flex-col items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <Hero />
      <ImageDisplay />
    </section>
  );
}
