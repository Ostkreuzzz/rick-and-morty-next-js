"use client";

import { useState, useEffect } from "react";
import Search from "../../components/Search";

import { getEpisodes } from "api/axios";
import LoadingCircular from "../../components/LoadingCircular";
import { Episode } from "@interfaces/Episode";

import EpisodeCard from "../../components/EpisodeCard";
import PaginationControlled from "../../components/PaginationControlled";

import { Alert, Snackbar } from "@mui/material";

export default function EpisodesPage() {
  const [data, setData] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState({
    type: "",
    isError: false,
  });
  const [pageData, setPageData] = useState({
    charactersAmount: 0,
    pagesAmount: 0,
  });

  useEffect(() => {
    const fetchEpisodes = async () => {
      setIsLoading(true);
      try {
        const { episodes, totalEpisodes, totalPages } = await getEpisodes(
          page,
          query
        );
        setData(episodes);
        setPageData({
          charactersAmount: totalEpisodes,
          pagesAmount: totalPages,
        });
      } catch {
        setError({
          type: "Failed to load. Please try again.",
          isError: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEpisodes();
  }, [query, page]);

  if (isLoading) {
    return <LoadingCircular />;
  }

  return (
    <div className="flex flex-col gap-56 px-16 desktop:px-32 desktop:pt-22 w-full">
      {error.isError && (
        <Snackbar
          open={error.isError}
          autoHideDuration={3000}
          onClose={() =>
            setError({
              type: "",
              isError: false,
            })
          }
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() =>
              setError({
                type: "",
                isError: true,
              })
            }
            severity="error"
            sx={{ width: "100%" }}
          >
            {error.type}
          </Alert>
        </Snackbar>
      )}
      <div className="flex flex-col justify-between gap-32 desktop:items-center desktop:flex-row items-start">
        <Search query={query} setQuery={setQuery} />
      </div>

      {isLoading ? (
        <LoadingCircular />
      ) : data.length > 0 ? (
        <div
          className="grid grid-cols-1 gap-12 tablet-large:grid-cols-1 
        desktop:grid-cols-2 desktop:gap-16  
      desktop-fullscreen:gap-16 desktop-fullscreen:grid-cols-3"
        >
          {data.map((episode) => (
            <EpisodeCard
              name={episode.name}
              key={episode.id}
              id={episode.id}
              airDate={episode.air_date}
              episode={episode.episode}
              characters={episode.characters}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray text-xl">
          No suitable data found. Please adjust your filters or search query.
        </p>
      )}

      {pageData.pagesAmount > 0 && (
        <div className="flex justify-center">
          <PaginationControlled
            amount={pageData.pagesAmount}
            value={page}
            setValue={setPage}
          />
        </div>
      )}
    </div>
  );
}
