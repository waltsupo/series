import React, { useState, useEffect } from 'react';
import { makeStyles, Grid, Container } from '@material-ui/core';
import { useParams, useLocation } from 'react-router-dom';

import { fetchSingleSeries, fetchEpisodesForSeries } from '../API';
import { Series, Episode } from '../types';
import Navbar from '../common/Navbar';
import Player from './Player';
import SeriesDetails from './SeriesDetails';
import EpisodeList from './EpisodeList';

interface RouteParams {
  seriesId: string;
}

const SeriesPage: React.FC = () => {
  const styles = useStyles();

  const [series, setSeries] = useState<Series>();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState(0);

  const { seriesId } = useParams<RouteParams>();
  const location = useLocation();

  // Effect to fetch series and episode information
  useEffect(() => {
    const getSeries = async () => {
      const seriesIdAsNumber = parseInt(seriesId);
      const responses = await Promise.all([
        fetchSingleSeries(seriesIdAsNumber),
        fetchEpisodesForSeries(seriesIdAsNumber),
      ]);

      setSeries(responses[0].data);
      setEpisodes(responses[1].data);
    };

    getSeries();
  }, [seriesId]);

  // Effect that sets selected episode if defined
  useEffect(() => {
    if (!location.state) {
      return;
    }

    const { episodeId } = location.state as any;
    if (episodeId) {
      episodes.map((episode, index) => {
        if (episode.id === episodeId) {
          setSelectedEpisode(index);
        }
      });
    }
  }, [location, episodes]);

  return (
    <div className={styles.container}>
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
              {episodes[selectedEpisode] && <Player media={episodes[selectedEpisode].link} />}
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
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
}));
