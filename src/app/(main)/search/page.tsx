import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { SearchView } from "@/features/search/components/search-view";
import { getGenreById } from "@/services/catalog";

export const metadata: Metadata = { title: "Search" };

type Param = string | string[] | undefined;
const first = (value: Param): string => (Array.isArray(value) ? (value[0] ?? "") : (value ?? ""));

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: Param; genre?: Param }>;
}) {
  const params = await searchParams;
  const query = first(params.q);
  const genre = getGenreById(first(params.genre));

  return (
    <>
      <PageHeader title="Search" description="Find songs, artists, albums and playlists." />
      <SearchView key={`${query}|${genre?.id ?? ""}`} initialQuery={query} initialGenre={genre?.id} />
    </>
  );
}
