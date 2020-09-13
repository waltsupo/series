import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { fetchLatestEpisodes } from "../API";
import { Episode } from "../types";
import EpisodeCard from "./EpisodeCard";

const LatestEpisodes: React.FC = () => {
  const [latest, setLatest] = useState<Episode[]>([]);

  useEffect(() => {
    const getLatest = async () => {
      const response = await fetchLatestEpisodes();
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
    <Container>
      latest episodes
      <EpisodeList>
        {latest &&
          latest.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
      </EpisodeList>
    </Container>
  );
};

export default LatestEpisodes;

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
`;

const EpisodeList = styled.div`
  display: flex;
  flex-direction: row;
`;
