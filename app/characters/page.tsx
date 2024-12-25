"use client";

import { Character } from "@interfaces/Character";

import { useState, useEffect, useMemo } from "react";
import Search from "../../components/Search";
import Selector from "../../components/Selector";
import CharacterCard from "../../components/CharacterCard";
import MultipleSelect from "../../components/MultiSelector";

import { getAllCharacters } from "api/axios";
import { getAllSelectors } from "@utils/getSelectors";
import handleCharacterFiltration from "@utils/handleCharacterFiltration";

export default function CharactersPage() {
  const [data, setData] = useState<Character[]>([]);
  const [query, setQuery] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [species, setSpecies] = useState<string[]>([]);

  const knownSpecies = useMemo(
    () => getAllSelectors(data, "species"),
    [data]
  ) as string[];

  const genders = useMemo(
    () => getAllSelectors(data, "gender"),
    [data]
  ) as string[];

  const statuses = useMemo(
    () => getAllSelectors(data, "status"),
    [data]
  ) as string[];

  useEffect(() => {
    const fetchCharacters = async () => {
      setData(await getAllCharacters());
    };

    fetchCharacters();
  }, []);

  const visibleData = handleCharacterFiltration({
    data,
    query,
    gender,
    status,
    species,
  });

  if (!data.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-56 px-16 desktop:px-32 desktop:pt-18 w-full">
      <div className="flex flex-col justify-between gap-32 desktop:items-center desktop:flex-row items-start">
        <Search query={query} setQuery={setQuery} />
        <div className="flex gap-8 w-full">
          <Selector
            title="Gender"
            value={gender}
            setValue={setGender}
            items={genders}
          />
          <Selector
            title="Status"
            value={status}
            setValue={setStatus}
            items={statuses}
          />
          <MultipleSelect
            title="Species"
            value={species}
            setValue={setSpecies}
            items={knownSpecies}
          />
        </div>
      </div>
      <div
        className="grid grid-cols-1 gap-12 tablet-large:grid-cols-1 
        desktop:grid-cols-2 desktop:gap-16  
      desktop-fullscreen:gap-16 desktop-fullscreen:grid-cols-3"
      >
        {visibleData.map((character) => (
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
    </div>
  );
}
