import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserTweets, createTweet } from "../../store/Slice/tweetSlice";
import TweetsList from "../../components/components/TweetsList";
import Button from "../../components/components/Button";
import CommunityPostForm from "../../components/components/CommunityPostForm";
import Loader from "../../components/loader/Loader";

function ChannelTweets() {
  const dispatch = useDispatch();
  const authId = useSelector((state) => state.auth?.userData?._id);
  const userId = useSelector((state) => state.user?.profileData?._id);
  const tweets = useSelector((state) => state.tweet?.tweets);
  const loading = useSelector((state) => state.tweet?.loading); // Check loading state

  const [isPostFormVisible, setPostFormVisible] = useState(false);

  useEffect(() => {
    if (userId) dispatch(getUserTweets(userId));
  }, [dispatch, userId]);

  const submitCommunityPost = async (data) => {
    const formData = new FormData();
    formData.append("content", data.content);

    if (data.image && data.image[0]) {
      formData.append("CommunityPostImage", data.image[0]);
    }

    await dispatch(createTweet(formData));
    await dispatch(getUserTweets(userId));
    setPostFormVisible(false);
  };

  return (
    <>
      {authId === userId && (
        <>
          <Button
            onClick={() => setPostFormVisible(!isPostFormVisible)}
            className="bg-purple-500 text-white px-4 py-2 m-4 rounded"
          >
            {isPostFormVisible ? "Cancel" : "Add Community Post"}
          </Button>

          {isPostFormVisible && (
            <CommunityPostForm
            loading={loading}
              onSubmit={submitCommunityPost}
              onCancel={() => setPostFormVisible(false)}
            />
          )}
        </>
      )}

      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <Loader width={12} />
        </div>
      ) : (
        tweets?.map((tweet) => (
          <TweetsList
            key={tweet?._id}
            avatar={tweet?.ownerDetails?.avatar?.url}
            content={tweet?.content}
            createdAt={tweet?.createdAt}
            likesCount={tweet?.likesCount}
            tweetId={tweet?._id}
            username={tweet?.ownerDetails?.username}
            isLiked={tweet?.isLiked}
            CommunityPostImage={tweet?.CommunityPostImage?.url}
          />
        ))
      )}
    </>
  );
}

export default ChannelTweets;
