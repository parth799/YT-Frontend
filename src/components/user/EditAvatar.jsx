/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateAvatar, updateCoverImg } from "../../store/Slice/authSlice";
import { MdClose, MdOutlineCloudUpload } from "react-icons/md";
import GetImagePreview from "../components/GetImagePreview";

function EditAvatar({ cover, preImage }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const upload = (data) => {
    setIsOpen(false);
    const formData = new FormData();
    formData.append(`${cover ? "coverImage" : "avatar"}`, data.avatar[0]);

    if (data) {
      if (cover) {
        dispatch(updateCoverImg(formData));
      } else {
        dispatch(updateAvatar(formData));
      }
    }
    // dispatch(getCurrentUser())
  };
  return (
    <>
      <form onSubmit={handleSubmit(upload)} className="">
        <MdOutlineCloudUpload
          className={`hover:text-gray-200 text-black rounded-md bg-white opacity-80 hover:opacity-100 p-1 cursor-pointer top-[-37px] ${preImage ? "sm:top-[-37px]" : ""}`}
          size={35}
          onClick={() => setIsOpen((prev) => !prev)}
        />
        {isOpen && (
          <div className="fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70">
            <div className="bg-black p-8  border shadow-lg w-full max-w-md">
              <button
                className=" top-5 right-5 text-white hover:text-gray-200"
                onClick={() => setIsOpen(false)}
              >
                <MdClose size={20} />
              </button>

              <h2 className="text-lg font-bold text-white mb-4">
                Change {cover ? "Cover" : "Profile"} Picture
              </h2>
              <div className="flex flex-col items-center">
                <GetImagePreview
                  name={"avatar"}
                  control={control}
                  cameraIcon
                  cameraSize={30}
                  className={
                    "w-full h-full object-contain min-h-20 max-h-60 bg-[#222222]"
                  }
                  image={preImage}
                />
                <button
                  type="submit"
                  className="bg-purple-500 text-white px-4 py-2 mt-4 w-full"
                >
                  Upload
                </button>
              </div>
              {errors.avatar && (
                <span className="text-red-500">{errors.avatar.message}</span>
              )}
            </div>
          </div>
        )}
      </form>
    </>
  );
}

export default EditAvatar;
