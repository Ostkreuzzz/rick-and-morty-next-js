import Link from "next/link";

interface Props {
  name: string;
  episode: string;
  airDate: string;
  characters: string[];
  id: number;
}

export default function EpisodeCard({
  id,
  name,
  episode,
  airDate,
  characters,
}: Props) {
  return (
    <Link
      className="flex justify-start  text-white h-220 
      rounded-lg bg-blue hover:scale-105 duration-300 hover:z-10 border-blue border-2 hover:border-red"
      href={`/episodes/${id}`}
      aria-label={`Navigate to episode ${id}`}
      replace
    >
      <div className="flex flex-col tablet:gap-8 p-16 justify-between">
        <div className="flex flex-col gap-16">
          <div className=" text-red text-3xl font-extrabold">
            <h2>{`№ ${id} ${name}`}</h2>
          </div>
          <div className="flex gap-8 text-xl">
            <span className="text-grey">Code:</span>
            <span>{episode}</span>
          </div>
          <div className="flex gap-8 text-xl">
            <span className="text-grey">Aired:</span>
            <span>{airDate}</span>
          </div>
          <div className="flex gap-8 text-xl">
            <span className="text-grey">Characters:</span>
            <span>{characters.length}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
