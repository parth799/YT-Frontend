import { useDispatch, useSelector } from "react-redux";
import VideoList from "../components/Videos/VideoList";
import { useEffect } from "react";
import { getLikedVideos } from "../store/Slice/likeSlice";
import { makeVideosNull } from "../store/Slice/videoSlice";
import HomeLoader from "../components/loader/HomeLoader";
import { FaPlayCircle } from "react-icons/fa";

function LikedVideos() {
  const dispatch = useDispatch();
  const likedVideos = useSelector((state) => state.like?.likedVideos);
  const loading = useSelector((state) => state.like.loading);
  window.scrollTo(0, 0);
  useEffect(() => {
    dispatch(getLikedVideos());

    return () => dispatch(makeVideosNull());
  }, [dispatch]);

  if (loading) {
    return <HomeLoader />;
  }

  if (likedVideos?.length == 0) {
    return (
      <div className="flex flex-col pb-20 items-center justify-center text-white h-screen">
        <FaPlayCircle size={45} className="text-purple-500" />
        <p className="mt-4 text-lg">There are no liked videos available here.</p>
      </div>
    );
  }
  return (
    <>
      <div className="w-full sm:px-2">
        <div className="grid max-h-screen overflow-y-scroll lg:grid-cols-3 sm:grid-cols-2 text-white mb-20 sm:mb-0">
          {likedVideos?.map((video) => (
            <VideoList
              key={video.likedVideo._id}
              avatar={video.likedVideo.ownerDetails?.avatar?.url}
              duration={video.likedVideo.duration}
              title={video.likedVideo.title}
              thumbnail={video.likedVideo.thumbnail?.url}
              createdAt={video.likedVideo.createdAt}
              views={video.likedVideo.views}
              channelName={video.likedVideo.ownerDetails?.username}
              videoId={video.likedVideo._id}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default LikedVideos;
