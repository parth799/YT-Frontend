/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

function Avatar({ src, channelName }) {
  const navigate = useNavigate();

  const handleAvatarClick = (e) => {
    e.preventDefault();
    navigate(`/channel/${channelName}`);
  };
  return (
    <>
      <img
        src={src}
        alt="avatar"
        className="w-8 h-8 rounded-full object-cover"
        onClick={handleAvatarClick}
      />
    </>
  );
}

export default Avatar;
