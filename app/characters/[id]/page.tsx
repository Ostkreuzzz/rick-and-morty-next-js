"use client";

import { getCharacter, getEpisode } from "api/axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Character } from "@interfaces/Character";
import { Episode } from "@interfaces/Episode";

import Image from "next/image";

import styles from "../../styles/styles.module.scss";
import classNames from "classnames";

export default function CharacterPage() {
  const [character, setCharacter] = useState<Character | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const pathname = usePathname();

  console.log(episodes);

  const characterID = pathname.split("/").pop() || "0";

  useEffect(() => {
    const fetchCharacter = async () => {
      setCharacter(await getCharacter(characterID));
    };

    if (characterID) {
      fetchCharacter();
    }
  }, [characterID]);

  useEffect(() => {
    if (!character) return;

    const episodesID = character.episode.map(
      (episodeUrl) => episodeUrl.split("/").pop() || "0"
    );

    const fetchEpisodes = async () => {
      const episodesData = await getEpisode(episodesID);
      setEpisodes(episodesData);
    };

    fetchEpisodes();
  }, [character]);

  if (!character) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-56 px-16 desktop:px-32 desktop:pt-16 w-full">
      <div className="flex justify-center tablet:justify-start  text-white rounded bg-blue ">
        <div className="flex flex-col tablet:flex-row gap-22 tablet:gap-32 p-16 justify-start">
          <Image
            className="flex justify-start rounded w-[200] tablet:object-contain self-start"
            alt={`${character.name} image`}
            src={character.image}
            width={300}
            height={300}
            priority
          />
          <div className="flex flex-col gap-8 justify-start">
            <h2 className="desktop:text-6xl text-4xl font-extrabold text-red">
              {character.name}
            </h2>
            <div className=" flex items-center">
              <span
                className={classNames(styles["status-icon"], {
                  [styles["status-alive"]]: character.status === "Alive",
                  [styles["status-dead"]]: character.status === "Dead",
                  [styles["status-unknown"]]: character.status === "unknown",
                })}
              ></span>
              <span className="text-2xl">
                {character.status === "unknown" ? "Unknown" : character.status}
              </span>
            </div>
            <div className="flex gap-32">
              <div className="flex flex-col">
                <span className="text-grey text-xl">Gender:</span>
                <span className="text-lg">{character.gender}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-grey text-xl">Species:</span>
                <span className="text-lg">{character.species}</span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-grey text-xl">Episodes:</span>
              <span className="text-lg">{character.episode.length}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-grey text-xl">Origin:</span>
              <span className="text-lg">{character.origin.name}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-grey text-xl">Last location:</span>
              <span className="text-lg">{character.location.name}</span>
            </div>

            {/* 
          <div className="flex flex-col">
            <span className="text-grey">First seen in:</span>
            <span> {characterepisodeName}</span>
          </div> */}
          </div>

          <div className="flex flex-col tablet:gap-8 justify-start">
            <h2 className="desktop:text-6xl text-4xl font-bold text-red">
              Episodes:
            </h2>
            {episodes.length === 0 ? (
              <p>Loading episodes...</p>
            ) : (
              episodes.map((episode) => (
                <div
                  key={episode.id}
                  className="flex flex-col gap-4 border-2 border-red p-8 rounded"
                >
                  <div className="flex gap-8">
                    <span>{episode.id}</span>
                    <h2>{episode.name}</h2>
                  </div>

                  <div className="flex gap-8">
                    <span>Code:</span>
                    <span>{episode.episode}</span>
                  </div>

                  <div className="flex gap-8">
                    <span>Aired:</span>
                    <span>{episode.air_date}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
