export interface ChronicleDBResponse {
	success: boolean;
	meta: {
		served_by: string;
		duration: number;
		changes: number;
		last_row_id: number;
		changed_db: boolean;
		size_after: number;
		rows_read: number;
		rows_written: number;
	};
	results: ChronicleTableEntryResponse[];
}

export interface ChronicleTableEntryResponse {
	id: number;
	status: string;
	total_results: number;
	source_id: string | null;
	source_name: string;
	author: string | null;
	title: string;
	description: string | null;
	url: string;
	url_to_image: string | null;
	published_at: string;
	content: string | null;
	image_prompt: string | null;
}

export interface ChronicleTableEntryInsert {
	status: string;
	total_results: number;
	source_id: string | null;
	source_name: string;
	author: string | null;
	title: string;
	description: string | null;
	url: string;
	url_to_image: string | null;
	published_at: string;
	content: string | null;
	image_prompt: string | null;
	r2_image_url: string | null;
	r2_image_filename: string | null;
}
