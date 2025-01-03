"use client";

import { getCharacter, getEpisode } from "api/axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Episode } from "@interfaces/Episode";
import { Character } from "@interfaces/Character";

import LoadingCircular from "../../../components/LoadingCircular";
import CharacterCard from "../../../components/CharacterCard";

export default function CharacterPage() {
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const pathname = usePathname();

  const episodeID = pathname.split("/").pop() || "0";

  useEffect(() => {
    const fetchEpisodes = async () => {
      setEpisode(await getEpisode(episodeID));
    };

    if (episodeID) {
      fetchEpisodes();
    }
  }, [episodeID]);

  useEffect(() => {
    if (!episode) return;

    const charactersID = episode.characters.map((characterUrl) =>
      Number(characterUrl.split("/").pop() || "0")
    );

    const fetchCharacters = async () => {
      const charactersData = await getCharacter(charactersID);
      setCharacters(charactersData);
    };

    fetchCharacters();
  }, [episode]);

  if (!episode) return <LoadingCircular />;

  return (
    <div className="flex flex-col gap-56 px-16 desktop:px-32 w-fit">
      <div className="flex justify-center tablet:justify-start text-white rounded-lg bg-blue ">
        <div className="flex flex-col gap-22 tablet:gap-24 p-32 justify-start">
          <div className="desktop:text-6xl text-4xl font-extrabold text-red">
            <h2>{`№ ${episode.id} ${episode.name}`}</h2>
          </div>
          <div className="flex gap-8 text-xl">
            <span className="text-grey ">Code:</span>
            <span>{episode.episode}</span>
          </div>
          <div className="flex gap-8 text-xl">
            <span className="text-grey">Aired:</span>
            <span>{episode.air_date}</span>
          </div>
          <div className="flex gap-8 text-xl">
            <span className="text-grey">Characters:</span>
            <span>{episode.characters.length}</span>
          </div>

          <h3 className="desktop:text-6xl text-4xl font-bold text-red">
            Characters:
          </h3>

          <div
            className="grid grid-cols-1 gap-12 tablet-large:grid-cols-1 
                        desktop:grid-cols-2 desktop:gap-16  
                        desktop-fullscreen:gap-16 desktop-fullscreen:grid-cols-3"
          >
            {characters.map((character) => (
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
      </div>
    </div>
  );
}
