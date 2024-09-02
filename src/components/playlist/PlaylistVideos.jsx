import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { IoCloseCircleOutline } from 'react-icons/io5';
import VideoList from '../Videos/VideoList';
import { getPlaylistById, upadtePlaylist } from '../../store/Slice/playListSlice';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import Input from '../components/Input';
import AddVideoInPlaylist from './AddVideoInPlaylist';
import RemoveVideoFromPlaylist from './RemoveVideoFromPlaylist';

function PlaylistVideos() {
    const { playlistId } = useParams();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.playlist?.loading);
    const playlist = useSelector((state) => state.playlist.playlist);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showAddVideoForm, setShowAddVideoForm] = useState(false);
    const [showRemoveVideoForm, setShowRemoveVideoForm] = useState(false);

    useEffect(() => {
        dispatch(getPlaylistById(playlistId));
    }, [dispatch, playlistId]);

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

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: '',
            description: '',
        },
    });

    const resetFormValues = () => {
        reset({
            name: playlist?.name || '',
            description: playlist?.description || '',
        });
    };

    const handleUpdateSubmit = (data) => {
        dispatch(upadtePlaylist({ playlistId, ...data }));
        dispatch(getPlaylistById(playlistId));
        setShowUpdateForm(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!playlist) {
        return <div>No playlist found.</div>;
    }

    return (
        <div className="playlist-container p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="playlist-title text-2xl font-bold text-white">
                    {playlist.name}
                </h2>
                <div className="relative">
                    <HiOutlineDotsVertical
                        className="text-white cursor-pointer"
                        onClick={toggleDropdown}
                    />
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded shadow-lg z-10">
                            <ul className="py-1">
                                <li
                                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                                    onClick={handleUpdateClick}
                                >
                                    Update Playlist
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
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <p className="playlist-description text-slate-400 mb-4">{playlist.description}</p>
            <div className="videos-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {playlist?.videos?.map((video) => (
                    <VideoList
                        key={video._id}
                        thumbnail={video.thumbnail.url}
                        duration={video.duration}
                        title={video.title}
                        views={video.views}
                        avatar={playlist.owner.avatar.url}
                        channelName={playlist.owner.username}
                        createdAt={video.createdAt}
                        videoId={video._id}
                    />
                ))}
            </div>

            {showUpdateForm && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-40">
                    <div className="relative w-full max-w-sm border bg-black p-6 rounded-lg shadow-lg">
                        <form onSubmit={handleSubmit(handleUpdateSubmit)} className="w-full space-y-5">
                            <h2 className="text-2xl font-bold text-white">Update Playlist</h2>
                            <IoCloseCircleOutline
                                size={30}
                                className="absolute -top-2 right-4 cursor-pointer text-white"
                                onClick={() => setShowUpdateForm(false)}
                            />
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
        </div>
    );
}

export default PlaylistVideos;
