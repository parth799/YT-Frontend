import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stopeWatchHistory, clearWatchHistory } from "../store/Slice/userSlice";
import { getCurrentUser } from "../store/Slice/authSlice";
import DeleteConfirmation from "../components/components/DeleteConfirmation";
import { useNavigate } from "react-router-dom";
import Button from "../components/components/Button";

function Setting() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth?.userData?._id);
  const isHistoryStopped = useSelector(
    (state) => state.auth?.userData?.stopeWatchHistory
  );

  const [isChecked, setIsChecked] = useState(isHistoryStopped || false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();
  const handleToggleHistory = async () => {
    await dispatch(stopeWatchHistory(userId));
    setIsChecked(!isChecked);
  };

  const handleClearHistory = async () => {
    await dispatch(clearWatchHistory());
    setShowDeleteConfirm(false);
  };

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    setIsChecked(isHistoryStopped);
  }, [isHistoryStopped]);

  const handleEditProfile = () => {
    navigate("/edit/personalInfo");
  };
  const changePassword = () => {
    navigate("/edit/password");
  };

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="flex justify-between items-center mb-4">
        <label className="text-lg">Stop Watch History</label>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isChecked}
            onChange={handleToggleHistory}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>
      <p className="text-sm text-gray-400 mb-6">
        Turning on this option will stop recording your watch history.
      </p>

      <div className="flex justify-between items-center mb-4">
        <label className="text-lg">Clear Watch History</label>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:opacity-70 lg:w-[200px]"
        >
          Clear History
        </button>
      </div>
      <div className="flex justify-between items-center mb-4 ">
        <label className="text-lg">Edit personal information </label>
        <Button
          onClick={handleEditProfile}
          className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:opacity-70 lg:w-[200px]"
        >
          Edit Profile
        </Button>
      </div>
      <div className="flex justify-between items-center mb-4 ">
        <label className="text-lg">Edit Password </label>
        <Button
          onClick={changePassword}
          className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:opacity-70 lg:w-[200px]"
        >
          Change Password
        </Button>
      </div>

      {showDeleteConfirm && (
        <DeleteConfirmation
          onCancel={() => setShowDeleteConfirm(false)}
          onDelete={handleClearHistory}
          video={true}
          content={"history "}
        />
      )}
    </div>
  );
}

export default Setting;
