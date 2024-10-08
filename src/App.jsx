import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import EditChannel from "./components/user/EditChannel";
import EditProfileData from "./components/user/EditProfileData";
import ChangePassword from "./components/user/ChangePassword";
import LikedVideos from "./pages/LikedVideos";
import History from "./pages/History";
import AdminDashboard from "./pages/AdminDashboard";
import MySubscriptions from "./pages/MySubscriptions";
import SearchVideos from "./pages/SearchVideos";
import PlaylistVideos from "./components/playlist/PlaylistVideos";
import ChannelCommunity from "./pages/Channel/ChannelCommunity";
import Setting from "./pages/Setting";
import TermsAndConditions from "./pages/TermsAndConditions";
import Signup from "./components/Auth/signup";

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
                <Home />
              </AuthLayout>
            }
          />
          <Route
            path="/search/:query"
            element={
              <AuthLayout authentication={false}>
                <SearchVideos />
              </AuthLayout>
            }
          />
          <Route
            path="/playlist/:username/:playlistId"
            element={
              <AuthLayout authentication={false}>
                <PlaylistVideos />
              </AuthLayout>
            }
          />
          <Route
            path="/collections"
            element={
              <AuthLayout authentication>
                <AdminDashboard />
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
            <Route
              path="community"
              element={
                <AuthLayout authentication>
                  <ChannelCommunity />
                </AuthLayout>
              }
            />
            <Route
              path="subscribed"
              element={
                <AuthLayout authentication={false}>
                  <ChannelSubscribers />
                </AuthLayout>
              }
            />
          </Route>
          <Route
            path="/liked-videos"
            element={
              <AuthLayout authentication>
                <LikedVideos />
              </AuthLayout>
            }
          />
          <Route
            path="/history"
            element={
              <AuthLayout authentication>
                <History />
              </AuthLayout>
            }
          />
          <Route
            path="/setting"
            element={
              <AuthLayout authentication>
                <Setting />
              </AuthLayout>
            }
          />
          <Route
            path="/subscriptions"
            element={
              <AuthLayout authentication>
                <MySubscriptions />
              </AuthLayout>
            }
          />
          <Route
            path="/edit"
            element={
              <AuthLayout authentication>
                <EditChannel />
              </AuthLayout>
            }
          >
            <Route
              path="personalInfo"
              element={
                <AuthLayout authentication>
                  <EditProfileData />
                </AuthLayout>
              }
            />
            <Route
              path="password"
              element={
                <AuthLayout authentication>
                  <ChangePassword />
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

        <Route
          path="/terms&conditions"
          element={
            <AuthLayout authentication>
              <TermsAndConditions />
            </AuthLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
