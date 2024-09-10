/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos } from "../../store/Slice/videoSlice";
import {
  addVideoToPlayList,
  getPlaylistById,
} from "../../store/Slice/playListSlice";
import VideoList from "../Videos/VideoList";
import Button from "../components/Button";
import { FaPlayCircle } from "react-icons/fa";

function AddVideoInPlaylist({ playlistId, onClose }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth?.userData?._id);
  const videos = useSelector((state) => state.video?.videos?.docs);
  const playlist = useSelector((state) => state.playlist.playlist);
  const [selectedVideos, setSelectedVideos] = useState([]);

  useEffect(() => {
    dispatch(getAllVideos({ userId }));
  }, [dispatch, userId]);

  const availableVideos = videos?.filter(
    (video) =>
      !playlist?.videos?.some(
        (playlistVideo) => playlistVideo._id === video._id
      )
  );

  const handleCheckboxChange = (videoId) => {
    setSelectedVideos((prevSelected) =>
      prevSelected.includes(videoId)
        ? prevSelected.filter((id) => id !== videoId)
        : [...prevSelected, videoId]
    );
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    for (let videoId of selectedVideos) {
      await dispatch(addVideoToPlayList({ videoId, playlistId }));
      await dispatch(getPlaylistById(playlistId));
    }
    onClose();
  };

  return (
    <div className="fixed top-0 mt-5 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-40">
      <div className="relative w-full max-w-lg border bg-black p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4">
          Add Videos to Playlist
        </h2>
        {availableVideos.length > 0 ? (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="videos-list grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-scroll hide-scrollbar max-h-96">
              {availableVideos?.map((video) => (
                <div key={video._id} className="relative">
                  <VideoList
                    thumbnail={video?.thumbnail.url}
                    duration={video?.duration}
                    title={video?.title}
                    views={video?.views}
                    createdAt={video?.createdAt}
                    videoId={video?._id}
                  />
                  <input
                    type="checkbox"
                    className="checkbox-position size-5"
                    onChange={() => handleCheckboxChange(video._id)}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <Button
                className="bg-red-500 text-sm px-4 py-2 rounded"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                className="bg-purple-500 text-white px-4 py-2 rounded"
                type="submit"
              >
                Add Selected Videos
              </Button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col pb-20 items-center justify-center text-white">
            <FaPlayCircle size={45} className="text-purple-500" />
            <p className="mt-4 text-lg">There are no videos available here.</p>
            <Button
              className="bg-red-500 text-sm px-4 py-2 mt-4 rounded"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddVideoInPlaylist;
