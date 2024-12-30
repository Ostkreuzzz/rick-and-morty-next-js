"use client";

import { useState, useEffect } from "react";
import Search from "../../components/Search";
import Selector from "../../components/Selector";

import { getLocations } from "api/axios";
import LoadingCircular from "../../components/LoadingCircular";
import { Location } from "@interfaces/Location";
import PaginationControlled from "../../components/PaginationControlled";

import { Alert, Snackbar } from "@mui/material";
import LocationCard from "../../components/LocationCard";
import { locationTypes, dimensionTypes } from "@constants/selectorTypes";

export default function LocationsPage() {
  const [data, setData] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [dimension, setDimension] = useState("");

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
        const { locations, totalLocations, totalPages } = await getLocations(
          page,
          query,
          type,
          dimension
        );
        setData(locations);
        setPageData({
          charactersAmount: totalLocations,
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
  }, [query, page, type, dimension]);

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
        <div className="flex gap-16 w-full">
          <Selector
            title="Type"
            value={type}
            setValue={setType}
            items={locationTypes}
          />
          <Selector
            title="Dimension"
            value={dimension}
            setValue={setDimension}
            items={dimensionTypes}
          />
        </div>
      </div>

      {isLoading ? (
        <LoadingCircular />
      ) : data.length > 0 ? (
        <div
          className="grid grid-cols-1 gap-12 tablet-large:grid-cols-1 
        desktop:grid-cols-2 desktop:gap-16  
      desktop-fullscreen:gap-16 desktop-fullscreen:grid-cols-3"
        >
          {data.map((location) => (
            <LocationCard
              name={location.name}
              key={location.id}
              id={location.id}
              type={location.type}
              dimension={location.dimension}
              residents={location.residents}
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
