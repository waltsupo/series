import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

import { Series } from "../types";

interface SeriesDetailsProps {
  series: Series;
}

const SeriesDetails: React.FC<SeriesDetailsProps> = ({
  series,
}: SeriesDetailsProps) => {
  return (
    <div>
      <Typography variant="h4">{series.name}</Typography>
      <Typography variant="h5">{series.altNames}</Typography>
      <Typography variant="subtitle1">{series.description}</Typography>
    </div>
  );
};

export default SeriesDetails;
