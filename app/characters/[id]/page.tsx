"use client";

import { getCharacter, getEpisode } from "api/axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Character } from "@interfaces/Character";
import { Episode } from "@interfaces/Episode";

import Image from "next/image";

import styles from "../../styles/styles.module.scss";
import classNames from "classnames";
import EpisodesList from "../../../components/EpisodesList";
import LoadingCircular from "../../../components/LoadingCircular";

export default function CharacterPage() {
  const [character, setCharacter] = useState<Character | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const pathname = usePathname();

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

  if (!character) return <LoadingCircular />;

  return (
    <div className="flex flex-col gap-56 px-16 desktop:px-32 desktop:pt-16 w-fit">
      <div className="flex justify-center tablet:justify-start  text-white rounded bg-blue ">
        <div className="flex flex-col tablet:flex-row gap-24 tablet:gap-48 p-16 justify-start">
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

            <div className="flex gap-32">
              <div className="flex flex-col">
                <span className="text-grey text-xl">Episodes:</span>
                <span className="text-lg">{character.episode.length}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-grey text-xl">Type:</span>
                <span className="text-lg">{character.type || "None"}</span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-grey text-xl">Origin:</span>
              <span className="text-lg">{character.origin.name}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-grey text-xl">Last location:</span>
              <span className="text-lg">{character.location.name}</span>
            </div>
          </div>

          <div className="flex flex-col gap-16 justify-start">
            <h3 className="desktop:text-6xl text-4xl font-bold text-red">
              Episodes:
            </h3>
            {episodes.length === 0 ? (
              <LoadingCircular />
            ) : (
              <EpisodesList episodes={episodes} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
