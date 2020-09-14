import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";

import { Episode } from "../types";
import { Link } from "react-router-dom";

interface EpisodeCardProps {
  episode: Episode;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({
  episode,
}: EpisodeCardProps) => {
  const classes = useStyles();

  return (
    <Link
      to={{
        pathname: `/series/${episode.series?.id}`,
        state: { episodeId: episode.id },
      }}
    >
      <Card className={classes.card}>
        <CardMedia className={classes.cover} image={episode.series?.coverImg} />
        <div className={classes.details}>
          <CardContent>
            {episode.published && (
              <Typography variant="caption">{`${episode.published.getDate()}.${episode.published.getMonth()}.${episode.published.getFullYear()}`}</Typography>
            )}

            <Typography variant="h6">{`${episode.series?.name}\n(Episode ${episode.episodeNumber})`}</Typography>
            <Typography variant="subtitle2">{episode.title}</Typography>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};

export default EpisodeCard;

const useStyles = makeStyles(() => ({
  card: {
    display: "flex",
    width: "300px",
    margin: "30px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  cover: {
    width: "100px",
  },
}));
