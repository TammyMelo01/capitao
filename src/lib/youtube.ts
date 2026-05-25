import { z } from "zod";

const SearchInputSchema = z.object({
  query: z.string().min(3),
  maxResults: z.number().int().min(1).max(25).default(10)
});

export async function searchYoutubeVideos(input: z.infer<typeof SearchInputSchema>) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) throw new Error("YOUTUBE_API_KEY não configurada.");

  const { query, maxResults } = SearchInputSchema.parse(input);

  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("q", query);
  url.searchParams.set("type", "video");
  url.searchParams.set("order", "relevance");
  url.searchParams.set("videoDuration", "long");
  url.searchParams.set("maxResults", String(maxResults));
  url.searchParams.set("key", apiKey);

  const response = await fetch(url);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Erro YouTube: ${response.status} ${text}`);
  }

  const data = await response.json();

  return data.items.map((item: any) => ({
    youtubeId: item.id.videoId,
    title: item.snippet.title,
    channel: item.snippet.channelTitle,
    description: item.snippet.description,
    publishedAt: item.snippet.publishedAt,
    thumbnail: item.snippet.thumbnails?.high?.url ?? item.snippet.thumbnails?.default?.url,
    url: `https://www.youtube.com/watch?v=${item.id.videoId}`
  }));
}
