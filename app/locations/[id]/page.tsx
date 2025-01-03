"use client";

import { getCharacter, getLocation } from "api/axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Character } from "@interfaces/Character";
import { Location } from "@interfaces/Location";

import LoadingCircular from "../../../components/LoadingCircular";
import CharacterCard from "../../../components/CharacterCard";

export default function LocationPage() {
  const [location, setLocation] = useState<Location | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const pathname = usePathname();

  const locationID = pathname.split("/").pop() || "0";

  useEffect(() => {
    const fetchLocation = async () => {
      setLocation(await getLocation(locationID));
    };

    if (locationID) {
      fetchLocation();
    }
  }, [locationID]);

  useEffect(() => {
    if (!location) return;

    const charactersID = location.residents.map((characterUrl) =>
      Number(characterUrl.split("/").pop() || "0")
    );

    const fetchCharacters = async () => {
      const charactersData = await getCharacter(charactersID);
      setCharacters(charactersData);
    };

    fetchCharacters();
  }, [location]);

  if (!location) return <LoadingCircular />;

  return (
    <div className="flex flex-col gap-56 px-16 desktop:px-32 w-fit">
      <div className="flex justify-center tablet:justify-start text-white rounded-lg bg-blue ">
        <div className="flex flex-col gap-22 tablet:gap-24 p-32 justify-start">
          <div className="desktop:text-6xl text-4xl font-extrabold text-red">
            <h2>{`№ ${location.id} ${location.name}`}</h2>
          </div>
          <div className="flex gap-8 text-xl">
            <span className="text-grey ">Dimension:</span>
            <span>{location.dimension}</span>
          </div>
          <div className="flex gap-8 text-xl">
            <span className="text-grey">Type:</span>
            <span>{location.type}</span>
          </div>
          <div className="flex gap-8 text-xl">
            <span className="text-grey">Residents:</span>
            <span>{location.residents.length}</span>
          </div>

          <h3 className="desktop:text-6xl text-4xl font-bold text-red">
            Residents:
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
