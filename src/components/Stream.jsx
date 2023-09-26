import React from "react";
import videojs from "video.js";
import VideoJS from "./VideoJS";

function Stream(props) {
  const playerRef = React.useRef(null);
  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: props.src,
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  return (
    <div>
      <div className="vid-container">
        <div className="centered-content">
          <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        </div>
      </div>
    </div>
  );
}

export default Stream;
