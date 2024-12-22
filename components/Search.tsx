import styles from "../app/styles/styles.module.scss";

import SearchIcon from "@mui/icons-material/Search";

export default function Search() {
  return (
    <div className="flex justify-start gap-16 items-center h-48">
      <label htmlFor="input">
        <SearchIcon className="text-white w-32 h-32" />
      </label>
      <input className={styles.search} placeholder="Search" id="input" />
    </div>
  );
}
