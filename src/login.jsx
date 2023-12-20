import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "./backEnd/authHelper"; // Update the path

//! Import Assets
import "./assets/css/login/login.css";
import bgimage from "./assets/img/wy.png";
import youthLogo from "./assets/img/youth-logo.png";

function Login() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const role = await handleLogin(email, password);
    if (role) {
      // Redirect based on user role
      if (role === "coordinator") {
        navigate("/coordinator-dashboard");
      } else if (role === "admin") {
        navigate("/Admin-MainPage");
      } else {
        // If it's a different role, you can handle it here
        console.log("Unknown role:", role);
      }
    } else {
      // Handle the case when user data or role is missing
      console.log("User data or role missing");
    }
  };

  return (
    <div
      className="h-screen bg-center bg-no-repeat bg-cover flex items-center"
      style={{ backgroundImage: `url(${bgimage})` }}
    >
      <div
        className="md:container md:mx-auto w-128 h-128 rounded-2xl grid gap-4 grid-cols-2 flex items-center"
        style={{
          backgroundColor: "#EFE9DD",
          boxShadow:
            "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        }}
      >
        <div className="flex justify-start">
          <img src={youthLogo} alt="youth-logo" />
        </div>
        <div className="flex justify-normal">
          <section>
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-3xl">
                Sign in to your account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={(event) => {
                  event.preventDefault();
                  handleLogin(email, password, navigate, setLoggedIn);
                }}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@email.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div className="flex items-center justify-between">
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-600"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-600"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Login;
