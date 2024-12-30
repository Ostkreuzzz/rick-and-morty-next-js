import Link from "next/link";

interface Props {
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  id: number;
}

export default function LocationCard({
  id,
  name,
  type,
  dimension,
  residents,
}: Props) {
  return (
    <Link
      className="flex justify-start  text-white h-220 
      rounded-lg bg-blue hover:scale-105 duration-300 hover:z-10 border-blue border-2 hover:border-red"
      href={`/locations/${id}`}
      aria-label={`Navigate to episode ${id}`}
      replace
    >
      <div className="flex flex-col tablet:gap-8 p-16 justify-between">
        <div className="flex flex-col gap-16">
          <div className=" text-red text-3xl font-extrabold">
            <h2>{`№ ${id} ${name}`}</h2>
          </div>
          <div className="flex gap-8 text-xl">
            <span className="text-grey">Dimension:</span>
            <span>{dimension}</span>
          </div>
          <div className="flex gap-8 text-xl">
            <span className="text-grey">Type:</span>
            <span>{type}</span>
          </div>
          <div className="flex gap-8 text-xl">
            <span className="text-grey">Residents:</span>
            <span>{residents.length}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
