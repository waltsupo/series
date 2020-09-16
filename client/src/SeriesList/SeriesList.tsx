import React, { useState, useEffect } from 'react';
import { makeStyles, Typography } from '@material-ui/core';

import { fetchSeries } from '../API';
import { Series } from '../types';
import Navbar from '../common/Navbar';
import SeriesCard from './SeriesCard';

const SeriesList: React.FC = () => {
  const classes = useStyles();

  const [series, setSeries] = useState<Series[]>([]);

  useEffect(() => {
    const getSeries = async () => {
      const response = await fetchSeries();

      if (!response.data) {
        return;
      }

      setSeries(response.data);
    };

    getSeries();
  }, []);

  return (
    <div className={classes.container}>
      <Navbar />
      <Typography variant="h4">Series</Typography>
      <div className={classes.seriesList}>
        {series && series.map((s) => <SeriesCard key={s.id} series={s} />)}
      </div>
    </div>
  );
};

export default SeriesList;

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  seriesList: {
    display: 'flex',
    flexDirection: 'row',
  },
}));
