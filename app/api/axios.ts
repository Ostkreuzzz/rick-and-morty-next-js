import axios from "axios";

const BASE_URL = {
  characters: "https://rickandmortyapi.com/api/character",
  locations: "https://rickandmortyapi.com/api/location",
  episodes: "https://rickandmortyapi.com/api/episode",
};

export async function getAllEpisodes() {
  try {
    const res = await axios.get(BASE_URL.episodes);
    return res.data.results;
  } catch (error) {
    console.error("Error fetching episodes:", error);
  }
}

export async function getAllLocations() {
  try {
    const res = await axios.get(BASE_URL.locations);
    return res.data.results;
  } catch (error) {
    console.error("Error fetching locations:", error);
  }
}

export async function getAllCharacters() {
  try {
    const res = await axios.get(BASE_URL.characters);
    return res.data.results;
  } catch (error) {
    console.error("Error fetching characters:", error);
  }
}

export async function getCharacter(id: number | number[]) {
  try {
    const res = await axios.get(BASE_URL.characters + `/${id}`);
    return res.data.results;
  } catch (error) {
    console.error("Error fetching character:", error);
  }
}

// CUSTOM GETTERS

export async function getFirstEpisodeName(episodeUrl: string) {
  if (!episodeUrl) {
    return "Unknown";
  }

  try {
    await axios.get(episodeUrl).then((res) => {
      return res.data.name;
    });
  } catch (error) {
    console.error("Error fetching the first episode:", error);
    return null;
  }
}
