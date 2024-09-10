import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stopeWatchHistory } from "../store/Slice/userSlice";


function Setting() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth?.userData?._id);
  const isHistoryStopped = useSelector((state) => state.user?.isHistoryStopped);

  const [isChecked, setIsChecked] = useState(isHistoryStopped || false);

  const handleToggleHistory = async () => {
    await dispatch(stopeWatchHistory(userId));
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    setIsChecked(isHistoryStopped); 
  }, [isHistoryStopped]);

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

      <p className="text-sm text-gray-400">
        Turning on this option will stop recording your watch history.
      </p>
    </div>
  );
}

export default Setting;
