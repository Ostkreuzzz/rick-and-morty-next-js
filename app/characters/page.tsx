"use client";

import { Character } from "@interfaces/Character";

import { useState, useEffect } from "react";
import { Alert, Snackbar } from "@mui/material";

import Search from "../../components/Search";
import Selector from "../../components/Selector";
import CharacterCard from "../../components/CharacterCard";

import { getCharacters } from "api/axios";
import LoadingCircular from "../../components/LoadingCircular";
import PaginationControlled from "../../components/PaginationControlled";
import {
  gendersTypes,
  statusesTypes,
  speciesTypes,
} from "@constants/selectorTypes";

export default function CharactersPage() {
  const [data, setData] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    type: "",
    isError: false,
  });

  const [query, setQuery] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [species, setSpecies] = useState("");
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState({
    charactersAmount: 0,
    pagesAmount: 0,
  });

  useEffect(() => {
    const fetchFilteredCharacters = async () => {
      setIsLoading(true);
      try {
        const { characters, totalCharacters, totalPages } = await getCharacters(
          query,
          status,
          species,
          gender,
          page
        );

        setData(characters);
        setPageData({
          charactersAmount: totalCharacters,
          pagesAmount: totalPages,
        });
        setError({
          type: "",
          isError: false,
        });
      } catch (err) {
        setError({
          type: "Failed to load. Please try again.",
          isError: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilteredCharacters();
  }, [query, status, species, gender, page]);

  return (
    <div className="flex flex-col gap-56 px-16 desktop:px-32 desktop:pt-18 w-full">
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
            title="Gender"
            value={gender}
            setValue={setGender}
            items={gendersTypes}
          />
          <Selector
            title="Status"
            value={status}
            setValue={setStatus}
            items={statusesTypes}
          />
          <Selector
            title="Species"
            value={species}
            setValue={setSpecies}
            items={speciesTypes}
          />
        </div>
      </div>
      {isLoading ? (
        <LoadingCircular />
      ) : data.length > 0 ? (
        <div
          className="grid grid-cols-1 gap-18 tablet-large:grid-cols-1 
      desktop:grid-cols-2 desktop-fullscreen:gap-12 desktop-fullscreen:grid-cols-3"
        >
          {data.map((character) => (
            <CharacterCard
              name={character.name}
              key={character.id}
              id={character.id}
              status={character.status}
              species={character.species}
              location={character.location.name}
              episode={character.episode[0]}
              image={character.image}
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
