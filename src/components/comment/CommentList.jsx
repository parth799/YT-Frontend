/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { timeAgo } from "../../hooks/createdAt";
import { HiOutlineDotsVertical } from "react-icons/hi";
import DeleteComment from "./DeleteComment";
import EditComment from "./EditComment";
import { deleteAComment, editAComment } from "../../store/Slice/commentSlice";
import Like from "../components/Like";
import { useParams } from "react-router-dom";

function CommentList({
  avatar,
  username,
  createdAt,
  content,
  commentId,
  isLiked,
  likesCount,
}) {
  const [editState, setEditState] = useState({
    editing: false,
    editedContent: content,
    isOpen: false,
    delete: false,
  });

  const { videoId } = useParams();
  const avatar2 = useSelector((state) => state.auth?.userData?.avatar.url);
  const authUsername = useSelector((state) => state.auth?.userData?.username);
  const dispatch = useDispatch();

  useEffect(() => {
    setEditState((prevState) => ({
      ...prevState,
      editedContent: content,
    }));
  }, [content]);

  const handleDeleteComment = () => {
    dispatch(deleteAComment(commentId, { videoId }));
    setEditState((prevState) => ({
      ...prevState,
      delete: false,
    }));
  };

  const handleEditComment = (editedContent) => {
    dispatch(editAComment({ commentId, content: editedContent }));
    setEditState((prevState) => ({
      ...prevState,
      editing: false,
      editedContent,
      isOpen: false,
      delete: false,
    }));
  };

  return (
    <div className="text-white w-full flex justify-start items-center sm:gap-5 gap-3 border-b border-slate-600 p-3 ml-5 sm:p-5">
      <div className="w-12">
        <img
          src={avatar || avatar2}
          alt="avatar"
          className="w-10 h-10 object-cover rounded-full"
        />
      </div>
      <div className="w-full flex flex-col gap-1 relative">
        <div className="flex items-center gap-2">
          <h2 className="text-xs">{username || authUsername}</h2>
          <span className="text-xs text-slate-400">{timeAgo(createdAt)}</span>
        </div>
        {authUsername === username && (
          <div className="absolute right-0">
            <div className="relative">
              <HiOutlineDotsVertical
                className="text-white cursor-pointer"
                onClick={() =>
                  setEditState((prevState) => ({
                    ...prevState,
                    isOpen: !prevState.isOpen,
                  }))
                }
              />
              {editState.isOpen && (
                <div className="border bg-[#222222] text-lg border-slate-600 absolute text-center right-2 rounded-xl">
                  <ul>
                    <li
                      className="hover:opacity-50 px-5 cursor-pointer border-b border-slate-600"
                      onClick={() =>
                        setEditState((prevState) => ({
                          ...prevState,
                          editing: true,
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
            </div>
          </div>
        )}
        {editState.delete && (
          <DeleteComment
            onCancel={() =>
              setEditState((prevState) => ({
                ...prevState,
                delete: false,
                isOpen: false,
              }))
            }
            onDelete={handleDeleteComment}
          />
        )}
        {editState.editing ? (
          <EditComment
            initialContent={editState.editedContent}
            onCancel={() =>
              setEditState((prevState) => ({
                ...prevState,
                editing: false,
                isOpen: false,
              }))
            }
            onSave={handleEditComment}
          />
        ) : (
          <p className="text-sm">{editState.editedContent}</p>
        )}

        <Like
          isLiked={isLiked}
          likesCount={likesCount}
          commentId={commentId}
          size={17}
        />
      </div>
    </div>
  );
}

export default CommentList;
