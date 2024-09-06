import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserTweets } from '../../store/Slice/tweetSlice';
import Comment from '../../components/comment/Comment';
import TweetsList from '../../components/components/TweetsList';

function ChannelTweets() {
    const dispatch = useDispatch();
    const authId = useSelector((state) => state.auth?.userData?._id);
    const userId = useSelector((state) => state.user?.profileData?._id);
    const tweets = useSelector((state) => state.tweet?.tweets);
    console.log("tweets", tweets);
    
    useEffect(() => {
        if (userId) dispatch(getUserTweets(userId));
    }, [dispatch, userId]);
    return (
        <>
            {authId === userId && <Comment tweet={true}/>}
            {tweets?.map((tweet) => (
                <TweetsList
                    key={tweet?._id}
                    avatar={tweet?.ownerDetails?.avatar.url}
                    content={tweet?.content}
                    createdAt={tweet?.createdAt}
                    likesCount={tweet?.likesCount}
                    tweetId={tweet?._id}
                    username={tweet?.ownerDetails?.username}
                    isLiked={tweet?.isLiked}
                />
            ))}
        </>
    );
}

export default ChannelTweets
