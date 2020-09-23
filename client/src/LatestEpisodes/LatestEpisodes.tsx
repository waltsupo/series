import React, { useState, useEffect } from 'react';
import { makeStyles, Typography } from '@material-ui/core';

import { fetchLatestEpisodes } from '../API';
import { Episode } from '../types';
import EpisodeCard from './EpisodeCard';
import Navbar from '../common/Navbar';

const LatestEpisodes: React.FC = () => {
  const styles = useStyles();

  const [latest, setLatest] = useState<Episode[]>([]);

  useEffect(() => {
    const getLatest = async () => {
      const response = await fetchLatestEpisodes();

      if (!response.data) {
        return;
      }

      // Change published to Date objects
      const episodes = response.data.map((episode: Episode) => {
        if (episode.published) {
          const withDate = Object.assign({}, episode);
          withDate.published = new Date(episode.published);
          return withDate;
        }
        return episode;
      });

      setLatest(episodes);
    };

    getLatest();
  }, []);

  return (
    <div className={styles.container}>
      <Navbar />
      <Typography variant="h4">Latest episodes</Typography>
      <div className={styles.episodeList}>
        {latest.map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} />
        ))}
      </div>
    </div>
  );
};

export default LatestEpisodes;

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  episodeList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
}));
