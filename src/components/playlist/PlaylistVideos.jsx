/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoCloseCircleOutline } from "react-icons/io5";
import VideoList from "../Videos/VideoList";
import {
  getPlaylistById,
  upadtePlaylist,
  deletePlaylist,
} from "../../store/Slice/playListSlice";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import Input from "../components/Input";
import AddVideoInPlaylist from "./AddVideoInPlaylist";
import RemoveVideoFromPlaylist from "./RemoveVideoFromPlaylist";
import { userChannelProfile } from "../../store/Slice/userSlice"

function PlaylistVideos() {
  const { username, playlistId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const playlist = useSelector((state) => state.playlist.playlist);
  const authUsername = useSelector((state) => state.auth?.userData?.username);
  const userId = useSelector((state) => state.user?.profileData?._id);
  const authId = useSelector((state) => state.auth.userData?._id);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showAddVideoForm, setShowAddVideoForm] = useState(false);
  const [showRemoveVideoForm, setShowRemoveVideoForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  useEffect(() => {
    dispatch(getPlaylistById(playlistId));
  }, [dispatch, playlistId]);

  useEffect(() => {
    dispatch(userChannelProfile(username));
  }, [dispatch])

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleUpdateClick = () => {
    setDropdownOpen(false);
    setShowUpdateForm(true);
    resetFormValues();
  };

  const handleAddVideoClick = () => {
    setDropdownOpen(false);
    setShowAddVideoForm(true);
  };

  const handleRemoveVideoClick = () => {
    setDropdownOpen(false);
    setShowRemoveVideoForm(true);
  };
  const handleDeleteClick = () => {
    setDropdownOpen(false);
    setShowDeleteConfirm(true);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const resetFormValues = () => {
    reset({
      name: playlist?.name || "",
      description: playlist?.description || "",
    });
  };

  const handleUpdateSubmit = (data) => {
    dispatch(upadtePlaylist({ playlistId, ...data }));
    dispatch(getPlaylistById(playlistId));
    setShowUpdateForm(false);
  };

  const handleDeleteConfirm = async () => {
    await dispatch(deletePlaylist(playlistId));
    setShowDeleteConfirm(false);
    navigate(`/channel/${authUsername}/playlists`);
  };

  return (
    <div className="playlist-container p-4">
      <div className="flex justify-between items-center mb-4 pb-4 border-b-2">
        <h2 className="playlist-title text-2xl font-bold text-white">
          {playlist?.name}
        </h2>
        <div className="relative">
          {userId === authId &&  (<HiOutlineDotsVertical
            className="text-white cursor-pointer text-[25px]"
            onClick={toggleDropdown}
          />)}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded shadow-lg z-10">
              <ul className="py-1">
                <li
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                  onClick={handleUpdateClick}
                >
                  Update Plalist
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                  onClick={handleAddVideoClick}
                >
                  Add Video
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                  onClick={handleRemoveVideoClick}
                >
                  Remove Video
                </li>
                <li
                  className="px-4 py-2 hover:bg-red-700 cursor-pointer"
                  onClick={handleDeleteClick}
                >
                  Delete Playlist
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <p className="text-xs bg-[#222222] rounded-lg p-2 outline-none text-slate-400 mb-4">
        {playlist?.description}
      </p>
      <div className="videos-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {playlist?.videos?.map((video, index) => (
          <VideoList
            key={index}
            thumbnail={video?.thumbnail?.url}
            duration={video?.duration}
            title={video?.title}
            views={video?.views}
            createdAt={video?.createdAt}
            videoId={video._id}
          />
        ))}
      </div>

      {showUpdateForm && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-40">
          <div className="relative w-full max-w-sm border bg-black p-6 rounded-lg shadow-lg">
            <form
              onSubmit={handleSubmit(handleUpdateSubmit)}
              className="w-full space-y-5"
            >
              <h2 className="text-2xl font-bold text-white">Update Playlist</h2>

              {(<IoCloseCircleOutline
                size={30}
                className="absolute -top-2 right-4 cursor-pointer text-white"
                onClick={() => setShowUpdateForm(false)}
              />)}
              <Input
                label="Name: "
                placeholder="Enter playlist name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}

              <Input
                label="Description: "
                placeholder="Enter description for your playlist"
                {...register("description")}
              />
              {errors.description && (
                <span className="text-red-500 text-sm">
                  {errors.description.message}
                </span>
              )}
              <Button
                className="bg-purple-500 text-sm p-2 w-full"
                type="submit"
              >
                Update Playlist
              </Button>
            </form>
          </div>
        </div>
      )}

      {showAddVideoForm && (
        <AddVideoInPlaylist
          playlistId={playlistId}
          onClose={() => setShowAddVideoForm(false)}
        />
      )}

      {showRemoveVideoForm && (
        <RemoveVideoFromPlaylist
          playlistId={playlistId}
          onClose={() => setShowRemoveVideoForm(false)}
        />
      )}

      {showDeleteConfirm && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-40">
          <div className="relative w-full max-w-sm border bg-black p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4">
              Delete Playlist
            </h2>
            <p className="text-white mb-4">
              Are you sure you want to delete this playlist? This action cannot
              be undone.
            </p>
            <div className="flex justify-between">
              <Button
                className="bg-gray-600 text-sm px-4 py-2 rounded"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-600 text-sm px-4 py-2 rounded"
                onClick={handleDeleteConfirm}
              >
                Delete Playlist
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlaylistVideos;
