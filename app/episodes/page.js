"use client";

import { useState, useEffect } from "react";
import Search from "../../components/Search";
import Selector from "../../components/Selector";

import { getAllEpisodes } from "api/axios";
import { getAllSelectors } from "@utils/getSelectors";

export default function EpisodesPage() {
  const [data, setData] = useState([]);

  const episodes = useMemo(() => getAllSelectors(data, "episodes"), [data]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      setData(await getAllEpisodes());
    };

    fetchEpisodes();
  }, []);

  if (!data.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-56 px-16 desktop:px-32 desktop:pt-24">
      <div className="flex justify-between gap-16 items-center">
        <Search />
        <Selector status="Code" items={episodes} />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {data.map((episode) => (
          <div className="bg-blue-300 p-4 text-center rounded" key={episode.id}>
            <h2 className="text-2xl">{episode.name}</h2>
            <p> {episode.episode}</p>
            <p> {episode.air_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
