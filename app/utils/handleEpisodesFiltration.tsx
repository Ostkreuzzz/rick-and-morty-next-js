import { Episode } from "@interfaces/Episode";

interface FiltrationData {
  data: Episode[];
  query: string;
  season?: string;
}

export default function handleEpisodesFiltration({
  data,
  query,
  season,
}: FiltrationData) {
  let visibleData = [...data];

  if (query) {
    visibleData = visibleData.filter((episode) =>
      episode.name.toLowerCase().includes(query.trim().toLowerCase())
    );
  }

  if (season) {
    visibleData = visibleData.filter((episode) => {
      const currentEpisode = episode.episode.slice(1, 3);
      return currentEpisode === season;
    });
  }
  return visibleData;
}
