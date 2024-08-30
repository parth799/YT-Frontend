import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/login";
import { getCurrentUser } from "./store/Slice/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import AuthLayout from "./components/components/AuthLayout";
import VideoDetail from "./components/Videos/VideoDetail";
import Channel from "./pages/Channel/Channel";
import ChannelVideos from "./pages/Channel/ChannelVideos";
import ChannelPlaylist from "./pages/Channel/ChannelPlaylist";
import ChannelSubscribers from "./pages/Channel/ChannelSubscribers";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path=""
            element={
              <AuthLayout authentication={false}>
                {" "}
                <Home />
              </AuthLayout>
            }
          />
          <Route
            path="/search/:query"
            element={
              <AuthLayout authentication={false}>
                {/* <PlaylistVideos /> */}
              </AuthLayout>
            }
          />
          <Route
            path="/playlist/:playlistId"
            element={
              <AuthLayout authentication={false}>
                {/* <SearchVideos /> */}
              </AuthLayout>
            }
          />
          <Route
            path="/channel/:username"
            element={
              <AuthLayout authentication>
                <Channel />
              </AuthLayout>
            }
          >
            <Route
              path="videos"
              element={
                <AuthLayout authentication>
                  <ChannelVideos />
                </AuthLayout>
              }
            />
            <Route
              path="playlists"
              element={
                <AuthLayout authentication>
                  <ChannelPlaylist />
                </AuthLayout>
              }
            />
            {/* <Route
              path="tweets"
              element={
                <AuthLayout authentication>
                  <ChannelTweets />
                </AuthLayout>
              }
            /> */}
            <Route
              path="subscribed"
              element={
                <AuthLayout authentication={false}>
                  <ChannelSubscribers />
                </AuthLayout>
              }
            />
          </Route>
        </Route>
        <Route
          path="/login"
          element={
            <AuthLayout authentication={false}>
              <Login />
            </AuthLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthLayout authentication={false}>
              <Signup />
            </AuthLayout>
          }
        />
        <Route
          path="/watch/:videoId"
          element={
            <AuthLayout authentication>
              <VideoDetail />
            </AuthLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
