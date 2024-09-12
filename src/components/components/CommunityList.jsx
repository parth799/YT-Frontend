/* eslint-disable react/prop-types */
import { useState } from "react";
import DeleteConfirmation from "./DeleteConfirmation";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdOutlineCloudUpload } from "react-icons/md";
import Like from "./Like";
import {
  deleteTweet,
  editTweet,
  getUserTweets,
} from "../../store/Slice/tweetSlice";
import { useDispatch, useSelector } from "react-redux";
import { timeAgo } from "../../hooks/createdAt";
import EditCommunityPost from "./EditCommunityPost";

function TweetsList({
  tweetId,
  avatar,
  username,
  createdAt,
  content,
  likesCount = 0,
  isLiked,
  CommunityPostImage,
}) {
  const avatar2 = useSelector((state) => state.user?.profileData?.avatar?.url);
  const authUsername = useSelector((state) => state.auth?.userData?.username);
  const userId = useSelector((state) => state.user?.profileData?._id);
  const dispatch = useDispatch();

  const [editState, setEditState] = useState({
    editing: false,
    editedContent: content,
    newImage: null,
    imagePreviewUrl: CommunityPostImage,
    isOpen: false,
    delete: false,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditState((prevState) => ({
        ...prevState,
        newImage: file,
        imagePreviewUrl: imageUrl,
      }));
    }
  };

  const handleEditTweet = async (updatedContent) => {
    const { newImage } = editState;

    await dispatch(
      editTweet({ tweetId, content: updatedContent, image: newImage })
    );

    setEditState({
      editing: false,
      isOpen: false,
      delete: false,
      newImage: null,
      imagePreviewUrl: CommunityPostImage,
    });

    await dispatch(getUserTweets(userId));
  };

  const handleDeleteTweet = async () => {
    await dispatch(deleteTweet(tweetId));
    setEditState({
      editing: false,
      isOpen: false,
      delete: false,
    });
    await dispatch(getUserTweets(userId));
  };

  return (
    <>
      <div className="text-white w-full flex sm:flex-row flex-col sm:gap-5 gap-3 border-b border-slate-600 p-3 sm:p-5">
        {editState.imagePreviewUrl && (
          <div className="relative flex-shrink-0">
            <img
              src={editState.imagePreviewUrl}
              className="w-[200px] h-[100px] rounded-lg object-cover"
              alt="Community Post"
            />
            {editState.editing && (
              <div className="absolute top-2 right-2">
                <label htmlFor="imageUpload">
                  <MdOutlineCloudUpload className="hover:text-gray-200 text-black rounded-md bg-white opacity-80 hover:opacity-100 p-1 cursor-pointer" />
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            )}
          </div>
        )}

        <div className="w-full flex flex-col gap-1 relative">
          <div className="flex items-center gap-2">
            <img
              src={avatar || avatar2}
              className="w-8 h-8 object-cover rounded-full"
              alt="avatar"
            />
            <h2 className="text-xs">{username}</h2>
            <span className="text-xs text-slate-400">{timeAgo(createdAt)}</span>
          </div>

          {editState.editing ? (
            <EditCommunityPost
              initialContent={editState.editedContent}
              onCancel={() =>
                setEditState((prevState) => ({
                  ...prevState,
                  editing: false,
                  isOpen: false,
                }))
              }
              onSave={handleEditTweet}
            />
          ) : (
            <p>{editState.editedContent}</p>
          )}

          <div className="flex items-center justify-between mt-2">
            <Like
              isLiked={isLiked}
              likesCount={likesCount}
              tweetId={tweetId}
              size={20}
            />

            {authUsername === username && (
              <div className="w-5 h-5 cursor-pointer">
                <HiOutlineDotsVertical
                  onClick={() =>
                    setEditState((prevState) => ({
                      ...prevState,
                      isOpen: !prevState.isOpen,
                    }))
                  }
                />
              </div>
            )}
          </div>

          {editState.isOpen && (
            <div className="border bg-[#222222] text-lg border-slate-600 absolute text-center right-5 rounded-xl">
              <ul>
                <li
                  className="hover:opacity-50 px-5 cursor-pointer border-b border-slate-600"
                  onClick={() =>
                    setEditState((prevState) => ({
                      ...prevState,
                      editing: !prevState.editing,
                      isOpen: false,
                    }))
                  }
                >
                  Edit
                </li>
                <li
                  className="px-5 hover:opacity-50 cursor-pointer"
                  onClick={() =>
                    setEditState((prevState) => ({
                      ...prevState,
                      delete: true,
                      isOpen: false,
                    }))
                  }
                >
                  Delete
                </li>
              </ul>
            </div>
          )}

          {editState.delete && (
            <DeleteConfirmation
              tweet={true}
              onCancel={() =>
                setEditState((prevState) => ({
                  ...prevState,
                  delete: !prevState.delete,
                }))
              }
              onDelete={handleDeleteTweet}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default TweetsList;
