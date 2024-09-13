/* eslint-disable react/prop-types */
import { FaRegEye } from "react-icons/fa";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { AiOutlineLike } from "react-icons/ai";
function StatsSection({ dashboard }) {
  return (
    <>
      <section className="grid sm:grid-cols-4 grid-cols-2 justify-evenly items-center gap-2">
        <div className="border border-slate-500 sm:p-3 p-2">
          <MdOutlineSlowMotionVideo
            className="text-purple-500 mb-2"
            size={30}
          />
          <p>Total Videos</p>
          <span className="font-bold text-2xl">{dashboard?.totalVideos}</span>
        </div>
        <div className="border border-slate-500 sm:p-3 p-2">
          <FaRegEye className="text-purple-500 mb-2" size={30} />
          <p>Total Views</p>
          <span className="font-bold text-2xl">{dashboard?.totalViews}</span>
        </div>
        <div className="border border-slate-500 sm:p-3 p-2">
          <RxAvatar className="text-purple-500 mb-2 whitespace-nowrap" size={30} />
          <p>Total subscribers</p>
          <span className="font-bold text-2xl">
            {dashboard?.totalSubscribers}
          </span>
        </div>
        <div className="border border-slate-500 sm:p-3 p-2">
          <AiOutlineLike className="text-purple-500 mb-2" size={30} />
          <p>Total likes</p>
          <span className="font-bold text-2xl">{dashboard?.totalLikes}</span>
        </div>
      </section>
    </>
  );
}

export default StatsSection;
