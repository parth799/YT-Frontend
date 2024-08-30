import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import ChannelHeader from '../../pages/Channel/ChannelHeader';
import ChannelNavigate from '../../pages/Channel/ChannelNavigate';
import { Outlet } from 'react-router-dom';

function EditChannel() {
    const channel = useSelector((state) => state.auth?.userData);
    const loading = useSelector((state) => state.auth?.loading);
    
    window.scrollTo(0, 0);
  return (
    <>
            {loading && (
                <div className="fixed top-5 right-5 flex items-center z-20 bg-black border border-slate-600 p-3 rounded shadow-lg">
                    <Loader width={8} />
                    <span className="text-md font-bold text-white ml-2">
                        Loading...
                    </span>
                </div>
            )}

            {channel && (
                <ChannelHeader
                    username={channel?.username}
                    coverImage={channel?.coverImage?.url}
                    avatar={channel?.avatar?.url}
                    subscribedCount={channel?.channelsSubscribedToCount}
                    fullName={channel?.fullName}
                    subscribersCount={channel?.subcribersCount}
                    isSubscribed={channel?.isSubscribed}
                    channelId={channel?._id}
                    edit={true}
                />
            )}
            <ChannelNavigate edit={true} />
            <div className="overflow-y-scroll h-[32rem] sm:h-96 mb-20 sm:mb-0">
                <Outlet />
            </div>
        </>
  )
}

export default EditChannel
