import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "./backEnd/authHelper";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase/firebase-config";
import "./assets/css/login/login.css";
import bgimage from "./assets/img/wy.png";
import youthLogo from "./assets/img/youth-logo.png";

function Login() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const role = await handleLogin(email, password);
    if (role) {
      // Redirect based on user role
      if (role === "coordinator") {
        navigate("/Coordinator-MainPage");
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

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);

      setEmail("");
      setShowModal(false);
    } catch (error) {
      console.error("Error sending password reset email:", error.message);
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
                    onClick={() => setShowModal(true)}
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
                {showModal && (
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-auto bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                          <h3 className="text-3xl font-semibold">
                            Forgot Password
                          </h3>
                          <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setShowModal(false)}
                          >
                            <span className="text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                              ×
                            </span>
                          </button>
                        </div>
                        <div className="relative p-6 flex-auto">
                          <form action="POST">
                            <div className="mb-4">
                              <label
                                htmlFor="email"
                                className="block text-sm font-bold text-gray-700"
                              >
                                Email:
                              </label>
                              <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="name@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 p-2 w-full border rounded-md"
                              />
                            </div>
                          </form>
                        </div>
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Close
                          </button>
                          <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={handleResetPassword}
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Login;
