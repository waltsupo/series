import React, { useState, useEffect } from "react";
import { makeStyles, Grid, Container } from "@material-ui/core";
import { useParams } from "react-router-dom";

import { fetchSingleSeries, fetchEpisodesForSeries } from "../API";
import { Series, Episode } from "../types";
import Navbar from "../common/Navbar";
import Player from "./Player";
import SeriesDetails from "./SeriesDetails";
import EpisodeList from "./EpisodeList";

const SeriesPage: React.FC = () => {
  const classes = useStyles();

  const [series, setSeries] = useState<Series>();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState(0);

  const { seriesId } = useParams();

  useEffect(() => {
    const getSeries = async () => {
      const responses = await Promise.all([
        fetchSingleSeries(seriesId),
        fetchEpisodesForSeries(seriesId),
      ]);

      setSeries(responses[0].data);
      setEpisodes(responses[1].data);
    };

    getSeries();
  }, [seriesId]);

  return (
    <div className={classes.container}>
      <Navbar />
      {series && (
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <img alt="cover" src={series.coverImg} />
            </Grid>
            <Grid item xs={5}>
              <SeriesDetails series={series} />
            </Grid>
            <Grid item xs={5}>
              {episodes[selectedEpisode] && (
                <Player media={episodes[selectedEpisode].link} />
              )}
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={2} />
            <Grid item xs={10}>
              <EpisodeList
                episodes={episodes}
                selected={selectedEpisode}
                setSelectedEpisode={setSelectedEpisode}
              />
            </Grid>
          </Grid>
        </Container>
      )}
    </div>
  );
};

export default SeriesPage;

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
}));
