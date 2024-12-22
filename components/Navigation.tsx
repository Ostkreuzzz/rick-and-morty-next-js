import {
  MovieCreation,
  PeopleAlt,
  GpsFixed,
  DataSaverOff,
} from "@mui/icons-material";
import Link from "next/link";

export default function Navigation() {
  return (
    <div
      className="flex justify-between items-center bg-blue w-full h-56 px-16
    desktop:w-96 desktop:flex-col desktop:h-90% desktop:py-32 
    desktop:rounded-xl desktop:justify-start gap-72"
    >
      <DataSaverOff className="text-red desktop:w-32 desktop:h-32 transition-all duration-300 hover:scale-110" />
      <ul className="flex gap-24 desktop:flex-col desktop:gap-32">
        <li>
          <Link href="characters">
            <PeopleAlt className="hover:text-white transition-all duration-300 desktop:w-32 desktop:h-32" />
          </Link>
        </li>
        <li>
          <Link href="episodes">
            <MovieCreation className="hover:text-white transition-all duration-300 desktop:w-32 desktop:h-32" />
          </Link>
        </li>
        <li>
          <Link href="locations">
            <GpsFixed className="hover:text-white transition-all duration-300 desktop:w-32 desktop:h-32" />
          </Link>
        </li>
      </ul>
    </div>
  );
}
