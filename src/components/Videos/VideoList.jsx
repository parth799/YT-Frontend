/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { formatDuration, timeAgo } from "../../hooks/createdAt";

function VideoList({
  thumbnail,
  duration,
  title,
  views = 0,
  avatar,
  channelName,
  createdAt,
  videoId,
}) {
  const navigate = useNavigate();
  const handleAvatarClick = (e) => {
    e.stopPropagation();
    navigate(`/channel/${channelName}`);
  };
  
  return (
    <div
      className="w-full sm:p-2 cursor-pointer p-2"
      onClick={() => navigate(`/watch/${videoId}`)}
    >
      <div className="relative sm:h-60 h-48">
        <img
          src={thumbnail}
          className="object-cover w-full h-full rounded-lg"
          alt={title}
        />
        <span className="absolute bottom-2 right-2 rounded-lg text-sm text-white bg-black py-1 px-2">
          {formatDuration(duration)}
        </span>
      </div>
      <div className="flex items-center py-2 px-2 gap-2">
        {avatar && (
          <div onClick={handleAvatarClick}>
            <img
              src={avatar}
              className="w-10 h-10 rounded-full object-cover border border-slate-700"
              alt={channelName}
            />
          </div>
        )}
        <div>
          <h2 className="font-medium text-white">{title}</h2>
          <div className="text-xs space-x-1 text-slate-400">
            <span>{views} Views</span>
            <span>{timeAgo(createdAt)}</span>
          </div>
          {channelName && (
            <h2 className="text-xs space-x-1 text-slate-200">{channelName}</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoList;
