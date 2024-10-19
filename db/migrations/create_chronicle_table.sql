CREATE TABLE chronicle_table (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    status TEXT NOT NULL,
    total_results INTEGER NOT NULL,
    source_id TEXT,
    source_name TEXT NOT NULL,
    author TEXT,
    title TEXT NOT NULL,
    description TEXT,
    url TEXT NOT NULL,
    url_to_image TEXT,
    published_at TEXT NOT NULL,
    content TEXT,
    image_prompt TEXT
);
