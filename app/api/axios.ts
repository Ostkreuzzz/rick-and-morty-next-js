import axios from "axios";

const BASE_URL = {
  characters: "https://rickandmortyapi.com/api/character",
  locations: "https://rickandmortyapi.com/api/location",
  episodes: "https://rickandmortyapi.com/api/episode",
};

export async function getEpisodes(page: number, name?: string) {
  try {
    let query = "";

    if (name) query += `name=${encodeURIComponent(name)}&`;
    if (page) query += `page=${encodeURIComponent(page)}`;

    const url = `${BASE_URL.episodes}/?${query}`;
    const res = await axios.get(url);

    const episodes = res.data.results;
    const totalEpisodes = res.data.info.count;
    const totalPages = res.data.info.pages;

    return {
      episodes,
      totalEpisodes,
      totalPages,
    };
  } catch (error) {
    return {
      episodes: [],
      totalEpisodes: 0,
      totalPages: 0,
    };
  }
}

export async function getLocations(
  page: number,
  name?: string,
  type?: string,
  dimension?: string
) {
  try {
    let query = "";

    if (name) query += `name=${encodeURIComponent(name)}&`;
    if (type) query += `type=${encodeURIComponent(type)}&`;
    if (dimension) query += `dimension=${encodeURIComponent(dimension)}&`;
    if (page) query += `page=${encodeURIComponent(page)}`;

    const url = `${BASE_URL.locations}/?${query}`;
    const res = await axios.get(url);

    const locations = res.data.results;
    const totalLocations = res.data.info.count;
    const totalPages = res.data.info.pages;

    return {
      locations,
      totalLocations,
      totalPages,
    };
  } catch (error) {
    return {
      locations: [],
      totalLocations: 0,
      totalPages: 0,
    };
  }
}

export async function getLocation(id: string | string[]) {
  try {
    const res = await axios.get(BASE_URL.locations + `/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching character:", error);
  }
}

export async function getEpisode(id: string | string[]) {
  try {
    const res = await axios.get(BASE_URL.episodes + `/${id}`);

    return res.data;
  } catch (error) {
    console.error("Error fetching character:", error);
  }
}

export async function getCharacter(id: string | string[]) {
  try {
    const res = await axios.get(BASE_URL.characters + `/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching character:", error);
  }
}

export async function getCharacters(
  name: string,
  status: string,
  species: string,
  gender: string,
  // type?: string,
  page: number
) {
  try {
    let query = "";

    if (name) query += `name=${encodeURIComponent(name)}&`;
    if (status) query += `status=${encodeURIComponent(status)}&`;
    if (species) query += `species=${encodeURIComponent(species)}&`;
    // if (type) query += `type=${encodeURIComponent(type)}&`;
    if (gender) query += `gender=${encodeURIComponent(gender)}&`;
    if (page) query += `page=${encodeURIComponent(page)}`;

    if (query.endsWith("&")) {
      query = query.slice(0, -1);
    }

    const url = `${BASE_URL.characters}/?${query}`;
    const res = await axios.get(url);

    const characters = res.data.results;
    const totalCharacters = res.data.info.count;
    const totalPages = res.data.info.pages;

    return {
      characters,
      totalCharacters,
      totalPages,
    };
  } catch (error) {
    return {
      characters: [],
      totalCharacters: 0,
      totalPages: 0,
    };
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
