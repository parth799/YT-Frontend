/* eslint-disable react/prop-types */

import { useState } from "react";
import { Controller } from "react-hook-form";
import { FaCamera } from "react-icons/fa";

function GetImagePreview({
  name,
  control,
  lable,
  defaultValue = "",
  className,
  cameraIcon = false,
  cameraSize = 20,
  image,
}) {
  const [preview, setPreview] = useState(null);

  const handlePreview = (e) => {
    const files = e.target.files;
    setPreview(URL.createObjectURL(files[0]));
    return files;
  };

  return (
    <>
      <div className="w-full">
        <label
          htmlFor={name}
          className="cursor-pointer relative flex flex-col justify-center items-start "
        >
          {lable && <label className="inline-block mb-2 pl-1">{lable}</label>}
          <img src={preview || image} className={className} />
          {cameraIcon && (
            <FaCamera
              size={cameraSize}
              className="hover:text-purple-500 text-purple-300  absolute inline-flex justify-center items-center w-full "
            />
          )}
          <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || ""}
            render={({ field: { onChange } }) => (
              <input
                id={name}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  onChange(handlePreview(e));
                }}
              />
            )}
            rules={{ required: `${name} iss required` }}
          />
        </label>
      </div>
    </>
  );
}

export default GetImagePreview;
