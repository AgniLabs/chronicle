import type { ChronicleTableEntryInsert } from "@/types/cloudflare/d1-db";
import { getRequestContext } from "@cloudflare/next-on-pages";

export async function insertChronicleEntry(entry: ChronicleTableEntryInsert) {
	const chronicleDB = getRequestContext().env.CHRONICLE_DB;

	const result = await chronicleDB
		.prepare(`
        INSERT INTO chronicle_table (
          status, total_results, source_id, source_name, author, title, description,
          url, url_to_image, published_at, content, image_prompt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
		.bind(
			entry.status,
			entry.total_results,
			entry.source_id,
			entry.source_name,
			entry.author,
			entry.title,
			entry.description,
			entry.url,
			entry.url_to_image,
			entry.published_at,
			entry.content,
			entry.image_prompt,
		)
		.run();

	// console.log("Insert result:", result);
}
