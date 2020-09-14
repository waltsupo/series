import React from "react";
import {
  makeStyles,
  Typography,
  GridList,
  GridListTile,
  Button,
} from "@material-ui/core";

import { Episode } from "../types";

interface EpisodeListProps {
  episodes: Episode[];
  selected: number;
  setSelectedEpisode: (index: number) => void;
}

const EpisodeList: React.FC<EpisodeListProps> = ({
  episodes,
  selected,
  setSelectedEpisode,
}: EpisodeListProps) => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Typography variant="h6">Episodes:</Typography>
      <GridList
        cellHeight={"auto"}
        cols={5}
        spacing={10}
        className={styles.list}
      >
        {episodes.map((episode, index) => (
          <GridListTile key={episode.id} cols={1} rows={1}>
            <Button
              className={index === selected ? styles.active : styles.episode}
              onClick={() => {
                setSelectedEpisode(index);
                window.scrollTo(0, 0);
              }}
            >
              <Typography>{`Episode ${episode.episodeNumber}`}</Typography>
              <Typography>{episode.title}</Typography>
            </Button>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default EpisodeList;

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  list: {
    flexDirection: "row",
  },
  episode: {
    width: "100%",
    height: "100%",
    textTransform: "none",
    textAlign: "center",
    display: "inline-block",
    border: "1px solid white",
  },
  active: {
    width: "100%",
    height: "100%",
    textTransform: "none",
    textAlign: "center",
    border: "1px solid black",
    display: "inline-block",
  },
}));
