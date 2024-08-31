import { useEffect, useRef } from "react";
import shaka from "shaka-player";

function Video({ src, poster, manifestUri }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const initPlayer = async () => {
      const video = videoRef.current;
      const player = new shaka.Player(video);

      window.player = player;
      player.addEventListener("error", onErrorEvent);

      try {
        await player.load(manifestUri);
        console.log("The video has been loaded successfully!");
      } catch (e) {
        onError(e);
      }
    };

    const onErrorEvent = (event) => {
      onError(event.detail);
    };

    const onError = (error) => {
      console.error("Error code", error.code, "object", error);
    };

    shaka.polyfill.installAll();

    if (shaka.Player.isBrowserSupported()) {
      initPlayer();
    } else {
      console.error("Browser not supported!");
    }

    return () => {
      window.player?.destroy();
    };
  }, [manifestUri]);

  return (
    <div className="video-container">
      <video
        src={src}
        poster={poster}
        ref={videoRef}
        autoPlay
        controls
        style={{ width: "100%", height: "auto" }}
      ></video>
    </div>
  );
}

export default Video;
