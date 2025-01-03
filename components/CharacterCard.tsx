import Image from "next/image";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../store/slices/bookmarkReducer";

import { fetchEpisode } from "@utils/fetchEpisode";
import styles from "../app/styles/styles.module.scss";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { RootState } from "../store/store";
import classNames from "classnames";
import Link from "next/link";

interface Props {
  name: string;
  status: string;
  species: string;
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
  location = "Unknown",
  image,
  episode,
}: Props) {
  const [episodeName, setEpisodeName] = useState("Unknown");
  const dispatch = useDispatch();
  const bookmarks = useSelector(
    (state: RootState) => state.bookmarkStore.value
  );

  const isBookmarked = bookmarks.includes(id);

  const handleAddToBookmarks = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();

    if (bookmarks.includes(id)) {
      dispatch(remove(id));
    } else {
      dispatch(add(id));
    }
  };

  useEffect(() => {
    const getEpisodeName = async () => {
      setEpisodeName(await fetchEpisode(episode));
    };

    getEpisodeName();
  }, [episode]);

  return (
    <Link
      className="relative flex justify-start group  text-white desktop:h-220 h-220
      rounded-lg bg-blue 
      hover:scale-105 duration-300 hover:z-10 border-blue border-2 hover:border-red"
      href={`/characters/${id}`}
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

      <BookmarkBorderIcon
        sx={{
          width: "32px",
          height: "32px",
        }}
        className={classNames(
          "absolute top-16 left-12 transition-all duration-300",
          {
            "opacity-0 group-hover:opacity-100 hover:text-red": !isBookmarked,
            "fill-red hover:fill-red": isBookmarked,
          }
        )}
        onClick={handleAddToBookmarks}
      />

      <div className="flex flex-col tablet:gap-8 p-16 justify-between">
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
