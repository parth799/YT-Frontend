import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../store/Slice/authSlice";
import Input from "../components/Input";
import Button from "../components/Button";

function ChangePassword() {
    const {
        handleSubmit,
        register,
        formState: { errors },
        getValues,
        resetField,
        setError,
    } = useForm();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth?.loading);

    const onSubmit = async (data) => {
        try {
            const result = await dispatch(
                changePassword({
                    oldPassword: data?.oldPassword,
                    newPassword: data?.newPassword,
                })
            ).unwrap();

            if (result?.success) {
                // Reset fields on success
                resetField("oldPassword");
                resetField("newPassword");
                resetField("confirmPassword");
                // You can add a success message or redirect the user
            } else {
                // Handle errors from the server
                setError("oldPassword", { type: "manual", message: result?.message || "Password change failed" });
            }
        } catch (error) {
            setError("oldPassword", { type: "manual", message: "An error occurred while changing the password" });
            console.log(error.message);
            
        }
    };

    return (
        <div className="w-full text-white flex justify-center items-center mt-2 !h-[27rem]">
            <div className="bg-transparent p-8 border rounded shadow-lg w-full max-w-md">
                <h2 className="text-lg font-bold mb-4">Change Password</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex flex-col">
                        <Input
                            label="Old Password"
                            type="password"
                            className="rounded"
                            {...register("oldPassword", {
                                required: "Old password is required",
                            })}
                        />
                        {errors.oldPassword && (
                            <span className="text-sm text-red-500">
                                {errors.oldPassword.message}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <Input
                            label="New Password"
                            type="password"
                            className="rounded"
                            {...register("newPassword", {
                                required: "New password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters long",
                                },
                            })}
                        />
                        {errors.newPassword && (
                            <span className="text-sm text-red-500">
                                {errors.newPassword.message}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <Input
                            label="Confirm New Password"
                            type="password"
                            className="rounded"
                            {...register("confirmPassword", {
                                required: "Please confirm your new password",
                                validate: {
                                    matchesNewPassword: (value) =>
                                        value === getValues("newPassword") || "Passwords do not match",
                                },
                            })}
                        />
                        {errors.confirmPassword && (
                            <span className="text-sm text-red-500">
                                {errors.confirmPassword.message}
                            </span>
                        )}
                    </div>
                    <div className="flex justify-center mt-4">
                        <Button
                            type="submit"
                            className="bg-purple-500 text-white px-4 py-2 rounded"
                            disabled={loading}
                        >
                            {loading ? "Changing..." : "Change Password"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;
