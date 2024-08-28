import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Headers/Navbar";
import Video from "./Video";
import { useParams } from "react-router-dom";
import { getVideoById } from "../../store/Slice/videoSlice";
import { useEffect, useState } from "react";
import {
  cleanUpComments,
  getVideoComments,
} from "../../store/Slice/commentSlice";
import Description from "../components/Description";

function VideoDetail() {
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const video = useSelector((state) => state.video?.video);
  const comments = useSelector((state) => state.comment?.comments);
  const totalComments = useSelector((state) => state.comment?.totalComments);
  const hasNextPage = useSelector((state) => state.comment?.hasNextPage);
  const loading = useSelector((state) => state.comment?.loading);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (videoId) {
      dispatch(getVideoById({ videoId }));
      dispatch(getVideoComments({ videoId }));
    }
    return () => dispatch(cleanUpComments());
  }, [dispatch, videoId]);
  return (
    <>
      <Navbar />
      <Video src={video?.videoFile?.url} poster={video?.thumbnail?.url} />
      <Description
        avatar={video?.owner?.avatar.url}
        channelName={video?.owner?.username}
        createdAt={video?.createdAt}
        description={video?.description}
        isSubscribed={video?.owner?.isSubscribed}
        likesCount={video?.likesCount}
        subscribersCount={video?.owner?.subscribersCount}
        title={video?.title}
        views={video?.views}
        key={video?._id}
        isLiked={video?.isLiked}
        videoId={video?._id}
        channelId={video?.owner?._id}
      />
      <div className="text-white font-semibold sm:px-5 px-3">
        {totalComments} comments
      </div>
      {/* <TwiteAndComment /> */}
    </>
  );
}

export default VideoDetail;
