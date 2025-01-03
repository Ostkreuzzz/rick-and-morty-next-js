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
        <SearchIcon
          sx={{
            width: "32px",
            height: "32px",
          }}
          className="text-white"
        />
      </label>
      <input
        className={styles.search}
        placeholder="Search"
        id="input"
        value={query}
        onChange={handleChange}
      />
    </div>
  );
}
