import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Headers/Navbar";
import Video from "./Video";
import { useParams } from "react-router-dom";
import {
  getAllVideos,
  getVideoById,
  makeVideosNull,
} from "../../store/Slice/videoSlice";
import { useCallback, useEffect, useState } from "react";
import {
  cleanUpComments,
  getVideoComments,
} from "../../store/Slice/commentSlice";
import Description from "../components/Description";
import Comment from "../comment/Comment";
import InfiniteScroll from "../components/InfiniteScroll";
import CommentList from "../comment/CommentList";
import Loader from "../loader/Loader";
import VideoList from "./VideoList";

function VideoDetail() {
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const video = useSelector((state) => state.video?.video);
  const comments = useSelector((state) => state.comment?.comments);
  const totalComments = useSelector((state) => state.comment?.totalComments);
  const hasNextPage = useSelector((state) => state.comment?.hasNextPage);
  const loading = useSelector((state) => state.comment?.loading);
  const videos = useSelector((state) => state.video?.videos?.docs);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (videoId) {
      dispatch(getVideoById({ videoId }));
      dispatch(getVideoComments({ videoId }));
    }
    return () => dispatch(cleanUpComments());
  }, [dispatch, videoId]);

  useEffect(() => {
    dispatch(getAllVideos({}));
    return () => dispatch(makeVideosNull());
  }, [dispatch]);

  const fetchMoreComments = useCallback(() => {
    if (!loading && hasNextPage) {
      dispatch(getVideoComments({ videoId, page: page + 1 }));
      setPage((prev) => prev + 1);
    }
  }, [page, loading, hasNextPage, dispatch, videoId]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row lg:space-x-6 sm:p-4 p-2  ">
        <div className="lg:w-2/3 w-full space-y-5 ">
          <Video
            src={video?.videoFile?.videoId}
            poster={video?.thumbnail?.url}
          />
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
          <Comment comment={true} videoId={video?._id} />
          <InfiniteScroll
            fetchMore={fetchMoreComments}
            hasNextPage={hasNextPage}
          >
            <div className="w-full sm:max-w-4xl ">
              {comments?.map((comment, index) => (
                <CommentList
                  key={index}
                  avatar={comment?.owner?.avatar?.url}
                  commentId={comment?._id}
                  content={comment?.content}
                  createdAt={comment?.createdAt}
                  isLiked={comment?.isLiked}
                  likesCount={comment?.likesCount}
                  username={comment?.owner?.username}
                />
              ))}
              {loading && (
                <div className="w-full flex justify-center items-center">
                  <Loader width={10} />
                </div>
              )}
            </div>
          </InfiniteScroll>
        </div>
        <div className="lg:w-1/3 w-full max-h-[250vh] overflow-y-auto">
          <div className="text-white mb-4">Releted videos More</div>
          <div className="space-y-4">
            {videos
              ?.filter((video) => video._id !== videoId)
              .map((video) => (
                <VideoList
                  key={video._id}
                  videoId={video._id}
                  avatar={video.ownerDetails?.avatar?.url}
                  duration={video.duration}
                  title={video.title}
                  thumbnail={video.thumbnail?.url}
                  createdAt={video.createdAt}
                  views={video.views}
                  channelName={video.ownerDetails.username}
                />
              ))}
          </div>
        </div>
       </div>
    </>
  );
}

export default VideoDetail;
