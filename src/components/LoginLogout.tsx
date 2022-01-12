import { useUserContext } from "../context/user_context";
import { FaUserMinus, FaUserPlus } from "react-icons/fa";

const LoginButton = () => {
  const { loginWithRedirect, myUser, logout } = useUserContext();

  return (
    <div className="auth-btn">
      {myUser ? (
        <button
          type="button"
          className="auth-btn"
          onClick={() => {
            localStorage.removeItem("user");
            logout({ returnTo: window.location.origin });
          }}
        >
          Logout
          <FaUserMinus />
        </button>
      ) : (
        <button className="auth-btn" type="button" onClick={loginWithRedirect}>
          Login
          <FaUserPlus />
        </button>
      )}
    </div>
  );
};

export default LoginButton;
