import { Character } from "@interfaces/Character";

interface FiltrationData {
  data: Character[];
  query: string;
  status?: string;
  species?: string[];
  gender?: string;
}

export default function handleCharacterFiltration({
  data,
  query,
  status,
  species,
  gender,
}: FiltrationData) {
  let visibleData = [...data];

  if (query) {
    visibleData = visibleData.filter((character) =>
      character.name.toLowerCase().includes(query.trim().toLowerCase())
    );
  }

  if (status) {
    visibleData = visibleData.filter(
      (character) => character.status === status
    );
  }

  if (species?.length) {
    visibleData = visibleData.filter((character) =>
      species.includes(character.species)
    );
  }

  if (gender) {
    visibleData = visibleData.filter(
      (character) => character.gender === gender
    );
  }

  return visibleData;
}
