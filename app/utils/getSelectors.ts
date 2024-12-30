import { Character } from "@interfaces/Character";

function getAllSelectors(
  data: Character[] | Character,
  value: keyof Character
) {
  const newData = Array.isArray(data) ? data : [data];

  const SelectorsSet = new Set(newData.map((character) => character[value]));
  return Array.from(SelectorsSet);
}

export { getAllSelectors };
