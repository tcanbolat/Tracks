import React from "react";
import ReactPlayer from "react-player/lazy";

const AudioPlayer = ({ url }) => (
  <ReactPlayer
    url={url}
    height="50px"
    width="96%"
    controls={true}
    style={{ backgroundColor: "rgba(255, 255, 255, 1)", margin: "0 auto", borderRadius: "0.2rem" }}
  />
);

export default AudioPlayer;
