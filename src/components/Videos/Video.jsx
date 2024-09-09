/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axiosIN from "../../hooks/axiosIN";

function Video({ src }) {
  console.log("src",src);
  
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await axiosIN.post("video/getVdoCipherOTP", {
          videoId: src, 
        });
        setVideoData(response?.data);
      } catch (error) {
        console.error("Failed to get VdoCipher OTP", error);
      }
    };
    fetchVideoData();
  }, [src]);

  return (
    <div style={{ position: "relative", paddingTop: "56.25%", overflow: "hidden" }}>
      {videoData.otp && videoData.playbackInfo && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=LJI5RljfS571nEpK`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: 0,
          }}
          allowFullScreen
          allow="encrypted-media"
        ></iframe>
      )}
    </div>
  );
}

export default Video;
