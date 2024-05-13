export interface ListLinkOptions {
  where?: { key: string; value: string }[];
  relations?: string[];
  page?: number;
  per_page?: number;
}
