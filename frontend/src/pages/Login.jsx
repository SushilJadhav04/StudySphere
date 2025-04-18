import { useContext } from "react";
import { AuthContext } from "../components/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { Login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOAuthLogin = async (provider) => {
    const url = `http://192.168.89.110:5000/auth/${provider}`;
    
    try {
      // Redirect to the OAuth provider (Google/Facebook/GitHub)
      window.location.href = url;
    } catch (error) {
      console.error("Error during OAuth login:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black transition-all duration-500 ease-in-out">
      <div className="bg-gradient-to-r from-black to-neutral-800 p-10 rounded-lg shadow-lg max-w-full sm:w-[500px] w-[90%] flex flex-col justify-between transition-all duration-500 ease-in-out">
        <h2 className="text-3xl font-bold text-center text-white mb-6 transition duration-300 ease-in-out">
          Login with your account
        </h2>

        <div className="flex flex-col space-y-4">
          <button
            onClick={() => handleOAuthLogin("google")}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-400 transition-all duration-300 ease-in-out"
          >
            Login with Google
          </button>

          <button
            onClick={() => handleOAuthLogin("github")}
            className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-all duration-300 ease-in-out"
          >
            Login with GitHub
          </button>

          <button
            onClick={() => handleOAuthLogin("facebook")}
            className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out"
          >
            Login with Facebook
          </button>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-6 text-sm text-black bg-white px-4 py-2 rounded-lg hover:bg-gray-200 transition-all duration-300 ease-in-out"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Login;
