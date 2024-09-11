/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import GetImagePreview from "../components/GetImagePreview";
import Loader from "../loader/Loader";

const CommunityPostForm = ({ onSubmit, onCancel, loading }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-black p-6 rounded-lg shadow-lg max-w-lg w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <textarea
            placeholder="Write Content..."
            className="p-2 text-sm border border-white bg-[#060505] text-white outline-none w-full"
            rows={3}
            {...register("content", { required: "Content is required" })}
          />
          {errors.content && (
            <span className="text-red-500">{errors.content.message}</span>
          )}

          <div className="w-full">
            <GetImagePreview
              name="image"
              control={control}
              label="Community Post Image"
              className="w-full h-56 border text-white object-contain"
              cameraIcon={true}
              cameraSize={40}
            />
            {errors.image && (
              <span className="text-red-500">{errors.image.message}</span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <Button
              type="button"
              className="bg-red-500 text-sm px-4 py-2 rounded"
              onClick={onCancel}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-purple-500 text-white px-4 py-2 rounded flex items-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader width={4} />
                  <span className="ml-2">Submitting...</span>
                </>
              ) : (
                "Submit Post"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommunityPostForm;
