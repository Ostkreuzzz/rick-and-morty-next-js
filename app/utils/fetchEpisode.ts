import axios from "axios";

export const fetchEpisode = async (episodeUrl: string) => {
  try {
    const response = await axios.get(episodeUrl);
    return response.data.name;
  } catch (error) {
    console.error("Error fetching episode:", error);
    return "Unknown";
  }
};
