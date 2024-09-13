/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { timeAgo } from "../../hooks/createdAt";
import { Link } from "react-router-dom";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Like from "./Like";
import { toggleSubscription } from "../../store/Slice/subscriptionSlice";

function Description({
  title,
  views,
  createdAt,
  channelName,
  avatar,
  subscribersCount,
  likesCount,
  isSubscribed,
  description,
  isLiked,
  videoId,
  channelId,
}) {
  const [localIsSubscribed, setLocalIsSubscribed] = useState(isSubscribed);
  const [localSubscribersCount, setLocalSubscribersCount] =
    useState(subscribersCount);
  const [isExpanded, setIsExpanded] = useState(false); // State to toggle description

  const dispatch = useDispatch();

  const handleSubscribe = () => {
    dispatch(toggleSubscription(channelId));
    setLocalIsSubscribed((prev) => !prev);
    setLocalSubscribersCount((prev) => prev + (localIsSubscribed ? -1 : 1));
  };

  const toggleDescription = () => {
    setIsExpanded((prev) => !prev); // Toggle the description state
  };

  return (
    <section className="sm:max-w-4xl w-full text-white sm:p-5 p-2 space-y-2">
      <div className="border-b border-slate-700">
        <div className="space-y-2 mb-2">
          <h1 className="sm:text-2xl font-semibold">{title}</h1>
          <div className="flex items-center justify-between sm:justify-start sm:gap-5">
            <div className="">
              <span className="text-sm text-slate-400">{views} views · </span>
              <span className="text-sm text-slate-400">
                {timeAgo(createdAt)}
              </span>
            </div>
            <div className="rounded-full w-24 flex justify-center bg-[#222222] py-1">
              <Like
                isLiked={isLiked}
                videoId={videoId}
                likesCount={likesCount}
                size={25}
              />
            </div>
          </div>
          <div className="flex gap-2 justify-between items-center">
            <Link to={`/channel/${channelName}/videos`} className="flex gap-2">
              <img
                src={avatar}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h1 className="font-semibold">{channelName}</h1>
                <p className="text-xs text-slate-400">
                  {localSubscribersCount} Subscribers
                </p>
              </div>
            </Link>
            <div onClick={handleSubscribe}>
              <Button className="border-slate-500 hover:scale-110 transition-all text-black font-bold px-4 py-1 bg-purple-500">
                {localIsSubscribed ? "Subscribed" : "Subscribe"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Description with read more/less functionality */}
      <div className="relative">
        <p
          className={`text-xs bg-[#222222] rounded-lg p-2 outline-none transition-all duration-300 ${
            isExpanded ? "max-h-full" : "max-h-12 overflow-hidden line-clamp-2"
          }`}
        >
          {description}
        </p>

        {!isExpanded && (
          <div className="absolute bottom-0 right-0 bg-[#222222] p-1">
            <span
              className="cursor-pointer text-purple-500"
              onClick={toggleDescription}
            >
              ...
            </span>
          </div>
        )}
        {isExpanded && (
          <div className="mt-2 text-right">
            <span
              className="cursor-pointer text-purple-500"
              onClick={toggleDescription}
            >
              Show Less
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

export default Description;
