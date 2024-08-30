import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { userChannelProfile } from '../../store/Slice/userSlice';
import ChannelHeader from './ChannelHeader';

function Channel() {
    const dispatch = useDispatch();
    const {username} = useParams()

    const channel = useSelector((state) => state.user?.profileData);
    useEffect(() => {
        dispatch(userChannelProfile(username))
    }, [dispatch, username]);
    window.scrollTo(0, 0);
  return (
    <>
     {channel && (
        <ChannelHeader
        username={username}
        coverImage={channel?.coverImage.url}
        avatar={channel?.avatar.url}
        subscribedCount={channel?.channelsSubscribedToCount}
        fullName={channel?.fullName}
        subscribersCount={channel?.subcribersCount}
        isSubscribed={channel?.isSubscribed}
        channelId={channel?._id}
    />
     )} 
    </>
  )
}

export default Channel
