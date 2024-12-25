"use client";

import styles from "../app/styles/styles.module.scss";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  setQuery: (value: string) => void;
  query: string;
}

export default function Search({ query, setQuery }: Props) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value.trim());
  }

  return (
    <div className="flex justify-start gap-16 items-center h-48">
      <label htmlFor="input">
        <SearchIcon className="text-white w-32 h-32" />
      </label>
      <input
        className={`${styles.search} tablet:w-152`}
        placeholder="Search"
        id="input"
        value={query}
        onChange={handleChange}
      />
    </div>
  );
}
