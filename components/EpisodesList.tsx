import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Episode } from "@interfaces/Episode";
import Link from "next/link";

interface Props {
  episodes: Episode[];
}

export default function EpisodesList({ episodes }: Props) {
  const episodesForRender = Array.isArray(episodes) ? episodes : [episodes];

  return (
    <>
      {!episodes || episodes.length === 0 ? (
        <h3 className="text-2xl  text-grey">No Info</h3>
      ) : (
        <List
          sx={{
            bgcolor: "#161d2f",
            overflow: "auto",
            maxHeight: 380,
            fontFamily: "inherit",
            "& ul": { padding: 0 },
          }}
        >
          <ul>
            {episodesForRender.map((episode) => (
              <ListItem
                key={`episode-${episode.id}-${episode.episode}`}
                className="flex flex-col gap-4  box-border p-8 rounded duration-150
                hover:border-2 border-2 border-blue hover:border-red"
                sx={{
                  alignItems: "flex-start",
                  textAlign: "start",
                }}
              >
                <ListItemText
                  primary={
                    <Link href={`episodes/${episode.id}`}>
                      <div className="font-primary">
                        <h2 className="text-lg">{`№ ${episode.id} ${episode.name}`}</h2>
                      </div>
                      <div className="flex gap-8 font-primary">
                        <span className="text-grey text-xl">Code:</span>
                        <span className="text-lg">{episode.episode}</span>
                      </div>
                      <div className="flex gap-8 font-primary">
                        <span className="text-grey text-xl">Aired:</span>
                        <span className="text-lg">{episode.air_date}</span>
                      </div>
                      <div className="flex gap-8 font-primary">
                        <span className="text-grey text-xl">Characters:</span>
                        <span className="text-lg">
                          {episode.characters.length}
                        </span>
                      </div>
                    </Link>
                  }
                />
              </ListItem>
            ))}
          </ul>
        </List>
      )}
    </>
  );
}
