import { useEffect } from "react";
import { FaPlayCircle } from "react-icons/fa";
import HomeLoader from "../components/loader/HomeLoader";
import { getWatchHistory } from "../store/Slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import VideoList from "../components/Videos/VideoList";

function History() {
    const loading = useSelector((state) => state.user?.loading);
    const videos = useSelector((state) => state.user?.history);
    const dispatch = useDispatch();
    window.scrollTo(0, 0);
    useEffect(() => {
        dispatch(getWatchHistory());
    }, [dispatch]);

    if (loading) {
        return <HomeLoader />;
    }

    if (videos?.length == 0) {
        return (
            <div className="flex flex-col pb-20 items-center justify-center text-white h-screen">
              <FaPlayCircle size={45} className="text-purple-500" />
              <p className="mt-4 text-lg">There are no liked videos available here.</p>
            </div>
          );
    }
    if (videos && videos.length > 0) {
        return (
            <>
                <div className="w-full sm:px-2">
                    <div className="grid max-h-screen mb-20 sm:m-0 overflow-y-scroll lg:grid-cols-3 sm:grid-cols-2 text-white">
                        {videos.map((video) => (
                            <VideoList
                                key={video._id}
                                avatar={video.owner?.avatar.url}
                                duration={video.duration}
                                title={video.title}
                                thumbnail={video.thumbnail?.url}
                                createdAt={video.createdAt}
                                views={video.views}
                                channelName={video.owner.username}
                                videoId={video._id}
                            />
                        ))}
                    </div>
                </div>
            </>
        );
    }
  return <></>;
}

export default History;
