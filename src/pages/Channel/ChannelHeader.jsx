/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSubscription } from "../../store/Slice/subscriptionSlice";
import EditAvatar from "../../components/user/EditAvatar";
import { Link } from "react-router-dom";
import Button from "../../components/components/Button";
import { loadStripe } from "@stripe/stripe-js";
import axiosIN from "../../hooks/axiosIN";
import { userChannelProfile } from "../../store/Slice/userSlice";

function ChannelHeader({
  coverImage,
  avatar,
  username,
  fullName,
  subscribersCount,
  subscribedCount,
  isSubscribed,
  channelId,
  edit,
}) {
  const [localIsSubscribed, setLocalIsSubscribed] = useState(isSubscribed);
  const [localSubscribersCount, setLocalSubscribersCount] =
    useState(subscribersCount);
  const [isOfficialMember, setIsOfficialMember] = useState(false);
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user?.profileData?._id);
  const joinUsers = useSelector((state) => state.user?.profileData?.joinUsers);
  const user = useSelector((state) => state.auth?.userData?._id);
  const [channelJoinCount, setChannelJoinCount] = useState(0); 

  useEffect(() => {
    dispatch(userChannelProfile(username));
  }, [dispatch]);

  useEffect(() => {
    setLocalSubscribersCount(subscribersCount);
    setLocalIsSubscribed(isSubscribed);

    if (joinUsers && joinUsers.includes(channelId)) {
      setIsOfficialMember(true);
    } else {
      setIsOfficialMember(false);
    }
    if (joinUsers) {
      setChannelJoinCount(joinUsers.length);
    }
  }, [subscribersCount, isSubscribed, joinUsers, channelId]);

  const handleSubscribe = () => {
    dispatch(toggleSubscription(channelId));
    setLocalIsSubscribed((prev) => !prev);
    if (localIsSubscribed) {
      setLocalSubscribersCount((prev) => prev - 1);
    } else {
      setLocalSubscribersCount((prev) => prev + 1);
    }
  };

  const stripePromise = loadStripe(
    "pk_test_51Pt572DcxgPqDrQhLu97t0PwklaYGSOW5jg84F0d2ISTIvtWjDUMAGtqn866bsGbXpTFWyhaIyOs1mCjVIyDOImr00cOIxl7ow"
  );
  const makePayment = async () => {
    const stripe = await stripePromise;
    try {
      const response = await axiosIN.post("/users/payment", {
        username,
        channelId,
      });

      const result = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });

      if (result.error) {
        console.error("Stripe Checkout Error:", result.error);
      }
    } catch (error) {
      console.error("Payment error:", error.message);
    }
  };
  return (
    <>
      <div className="w-full text-white">
        <section className="w-full">
          {coverImage ? (
            <div className="relative">
              <img
                src={coverImage}
                className="sm:h-40 h-28 w-full object-cover"
                alt="Channel cover"
              />
              {edit && (
                <div className="absolute inset-0 flex justify-center items-center">
                  <EditAvatar cover={true} preImage={coverImage} />
                </div>
              )}
            </div>
          ) : (
            <div className="sm:h-40 h-28 w-full border-slate-600 border-b bg-black"></div>
          )}
        </section>

        <section className="w-full sm:px-5 p-2 flex sm:flex-row flex-col items-start sm:gap-4">
          <div className="h-12">
            <div className="relative sm:w-32 w-28 sm:h-32 h-28">
              <img
                src={avatar}
                className="rounded-full sm:w-32 w-28 sm:h-32 h-28 object-cover absolute sm:bottom-10 bottom-20 outline-none"
                alt="Channel avatar"
              />
              {edit && (
                <div className="absolute inset-0 flex justify-center items-start">
                  <EditAvatar preImage={avatar} />
                </div>
              )}
            </div>
          </div>

          <div className="w-full md:h-24 sm:h-20 flex justify-between items-start px-1">
            <div>
              <h1 className="text-xl font-bold">{fullName}</h1>
              <h3 className="text-sm text-slate-400">@{username}</h3>
              <div className="flex gap-1">
                <p className="text-xs text-slate-400">
                  {localSubscribersCount && localSubscribersCount} Subscribers
                </p>
                <p className="text-xs text-slate-400">
                  {subscribedCount && subscribedCount} Subscribed
                </p>
               {channelId === user && (<p className="text-xs text-slate-300">
                  {channelJoinCount} Official Members
                </p>)}
              </div>
            </div>

            {user === userProfile && !edit && (
              <Link to={"/edit"}>
                <Button className="border-slate-500 hover:scale-110 transition-all text-black font-bold px-4 py-1 bg-purple-500">
                  Edit
                </Button>
              </Link>
            )}

            {user !== userProfile && !edit && (
              <div className="flex flex-col gap-2">
                {/* Subscribe button */}
                <Button
                  onClick={handleSubscribe}
                  className="border-slate-500 hover:scale-110 transition-all text-black font-bold px-4 py-1 bg-purple-500"
                >
                  {localIsSubscribed ? "Subscribed" : "Subscribe"}
                </Button>
                {isOfficialMember ? (
                  <Button
                    disabled
                    className="border-slate-500 cursor-default transition-all text-black font-bold px-4 py-1 bg-green-500"
                  >
                    You are an official member
                  </Button>
                ) : (
                  <Button
                    onClick={makePayment}
                    className="border-slate-500 hover:scale-110 transition-all text-black font-bold px-4 py-1 bg-green-500"
                  >
                    Join
                  </Button>
                )}
              </div>
            )}

            {edit && (
              <Link to={`/channel/${username}`}>
                <Button className="border-slate-500 hover:scale-110 transition-all text-black font-bold px-4 py-1 bg-purple-500">
                  View Channel
                </Button>
              </Link>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default ChannelHeader;
