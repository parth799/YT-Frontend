import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { userChannelProfile } from '../../store/Slice/userSlice';

function Channel() {
    const dispatch = new useDispatch();
    const {username} = useParams()

    const channel = useSelector((state) => state.user?.profileData);
    useEffect(() => {
        dispatch(userChannelProfile(username))
    }, [dispatch, username]);
    window.scrollTo(0, 0);
  return (
    <>
     {channel && (
        
     )} 
    </>
  )
}

export default Channel
