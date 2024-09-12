/* eslint-disable react/prop-types */
import { useState } from "react";

function EditCommunityPost({ initialContent, onCancel, onSave }) {
  const [editedContent, setEditedContent] = useState(initialContent);

  const handleSave = () => {
    onSave(editedContent);
  };

  return (
    <div className="w-full text-sm">
      <textarea
        className="bg-[#222222] outline-none border-b w-full p-2"
        value={editedContent}
        autoFocus
        rows={3}
        onChange={(e) => setEditedContent(e.target.value)}
      />
      <div className="space-x-4 mt-3 w-full flex justify-end items-center">
        <span
          className="bg-red-500 py-1 px-3 font-normal rounded-lg hover:bg-red-600 cursor-pointer text-white"
          onClick={onCancel}
        >
          Cancel
        </span>
        <button
          onClick={handleSave}
          className="bg-purple-500 py-1 px-3 font-normal rounded-lg hover:bg-purple-600 cursor-pointer text-white"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default EditCommunityPost;
