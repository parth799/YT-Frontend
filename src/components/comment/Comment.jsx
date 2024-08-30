/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import { createAComment } from "../../store/Slice/commentSlice";
import { useDispatch } from "react-redux";

function Comment({ tweet, comment, videoId }) {
  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();

  const sendContent = (data) => {
    if (data) {
        if (tweet) {
            console.log("crete tweet");
            // dispatch(createTweet(data))
        } else if (comment) {
            dispatch(createAComment({content:data.content, videoId , dispatch:dispatch}))
        }
        setValue("content", "");
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(sendContent)}
        className="sm:p-5 p-3 sm:max-w-4xl w-full relative"
      >
        <textarea
          placeholder={`${tweet ? "Write a tweet" : "Add a comment"}`}
          className="p-2 text-sm pr-16 focus:border-white text-white border border-slate-500 bg-[#222222] outline-none w-full"
          {...register("content", { required: true })}
          rows={2}
        />
        <Button
          type="submit"
          className="bg-purple-500 px-2 py-1 text-black hover:scale-110 transition-all ease-in absolute sm:bottom-8 sm:right-8 bottom-8 right-4 text-xs sm:text-base"
        >
          Send
        </Button>
      </form>
    </>
  );
}

export default Comment;