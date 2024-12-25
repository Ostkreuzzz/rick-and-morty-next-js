import { Character } from "@interfaces/Character";

function getAllSelectors(data: Character[], value: keyof Character) {
  const SelectorsSet = new Set(data.map((character) => character[value]));
  return Array.from(SelectorsSet);
}

export { getAllSelectors };
