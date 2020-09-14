import React from "react";
import ReactPlayer from "react-player";

interface PlayerProps {
  media: string;
}

const Player: React.FC<PlayerProps> = ({ media }: PlayerProps) => {
  return <ReactPlayer controls width="100%" height="auto" url={media} />;
};

export default Player;
