/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginPopup from "../Auth/LoginPopup";

function AuthLayout({ children, authentication }) {
  const navigate = useNavigate();
  const authStates = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && authStates !== authentication) {
      return;
    }
  }, [authStates, authentication, navigate]);

  if (!authentication && authStates === "authenticated") {
    return <LoginPopup />;
  }
  return children;
}

export default AuthLayout;
