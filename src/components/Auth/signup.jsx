import { useForm } from "react-hook-form";
import GetImagePreview from "../components/GetImagePreview";
import Logo from "../components/Logo";

function Signup() {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();
  return (
    <>
      <div className="w-full h-screen text-white p-3 flex justify-center items-start sm:mt-8">
        <div className="flex flex-col space-y-2 justify-center items-center border-slate-600 p-3">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          <form className="space-y-4 p-2 text-sm sm:w-96 w-full">
            <div className="w-full relative h-28 bg-[#222222] ">
              <div className="w-full h-full">
                <GetImagePreview
                  name="coverImage"
                  control={control}
                  className="w-full h-28 object-cover border-none border-slate-900"
                  cameraIcon
                />
                <div className="text-sm absolute right-2 bottom-2 hover:text-purple-500 cursor-default">
                  cover Image
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
