import Image from "next/image";
import { useEffect, useState } from "react";

import { fetchEpisode } from "@utils/fetchEpisode";
import styles from "../app/styles/styles.module.scss";
import Link from "next/link";
import classNames from "classnames";

interface Props {
  name: string;
  status: string;
  species: string;
  gender: string;
  location: string;
  image: string;
  episode: string;
  id: number;
}

export default function CharacterCard({
  id,
  name,
  status,
  species,
  gender,
  location,
  image,
  episode,
}: Props) {
  const [episodeName, setEpisodeName] = useState("Unknown");

  useEffect(() => {
    const getEpisodeName = async () => {
      setEpisodeName(await fetchEpisode(episode));
    };

    getEpisodeName();
  }, [episode]);

  return (
    <Link
      className="flex justify-start  text-white h-220 
      rounded bg-blue hover:scale-105 duration-300 hover:z-10"
      href={`characters/${id}`}
      aria-label={`Navigate to character ${id}`}
    >
      <Image
        className="flex rounded-l-lg shrink-1 w-152 tablet:w-fit"
        alt={`${name} image`}
        src={image}
        width={200}
        height={200}
        priority
      />
      <div className="flex flex-col gap-8 p-16 justify-between">
        <div className="items-center">
          <h2 className="text-xl font-extrabold">{name}</h2>
          <span
            className={classNames(styles["status-icon"], {
              [styles["status-alive"]]: status === "Alive",
              [styles["status-dead"]]: status === "Dead",
              [styles["status-unknown"]]: status === "unknown",
            })}
          ></span>
          <span>
            {status === "unknown" ? "Unknown" : status} - {species}
          </span>
          <p>{gender === "unknown" ? "Unknown" : gender}</p>
        </div>

        <div className="flex flex-col">
          <span className="text-grey">Last location:</span>
          <span> {location}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-grey">First seen in:</span>
          <span> {episodeName}</span>
        </div>
      </div>
    </Link>
  );
}
