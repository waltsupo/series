import React from 'react';
import { Card, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';

import { Series } from '../types';
import { Link } from 'react-router-dom';

interface SeriesCardProps {
  series: Series;
}

const SeriesCard: React.FC<SeriesCardProps> = ({ series }: SeriesCardProps) => {
  const classes = useStyles();

  return (
    <Link to={`/series/${series.id}`}>
      <Card className={classes.card}>
        <CardMedia className={classes.cover} image={series.coverImg} />
        <div className={classes.details}>
          <CardContent>
            <Typography variant="h6">{series.name}</Typography>
            <Typography variant="subtitle2">{series.altNames}</Typography>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};

export default SeriesCard;

const useStyles = makeStyles(() => ({
  card: {
    display: 'flex',
    width: '300px',
    margin: '30px',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cover: {
    width: '100px',
  },
}));
