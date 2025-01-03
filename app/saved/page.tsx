"use client";

import { useState, useEffect } from "react";
import Search from "../../components/Search";

import { getCharacter } from "api/axios";
import LoadingCircular from "../../components/LoadingCircular";
import { deleteAll } from "../../store/slices/bookmarkReducer";

import { Alert, Snackbar } from "@mui/material";
import { Character } from "@interfaces/Character";
import CharacterCard from "../../components/CharacterCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import BasicButton from "../../components/Button";

export default function SavedPage() {
  const [data, setData] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState({
    type: "",
    isError: false,
  });

  const dispatch = useDispatch();
  const bookmarkedIds = useSelector(
    (state: RootState) => state.bookmarkStore.value
  );

  function handleClearAll() {
    dispatch(deleteAll());
  }

  useEffect(() => {
    const fetchEpisodes = async () => {
      setIsLoading(true);
      try {
        const characters = await getCharacter(bookmarkedIds);
        setData(characters);
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
  }, [query, bookmarkedIds]);

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
        <BasicButton
          title={"Clear All"}
          handleClick={handleClearAll}
          isDisabled={!bookmarkedIds.length}
        />
      </div>

      {isLoading ? (
        <LoadingCircular />
      ) : data.length > 0 ? (
        <div
          className="grid grid-cols-1 gap-12 tablet-large:grid-cols-1 
        desktop:grid-cols-2 desktop:gap-16  
      desktop-fullscreen:gap-16 desktop-fullscreen:grid-cols-3"
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
          No saved characters found. Come back when you will save anything!
        </p>
      )}
    </div>
  );
}
