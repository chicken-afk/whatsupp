"use client";

import { useEffect, useState } from "react";
import Button from "./components/button";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from "next/navigation";
import { apiPost } from "./api/apiClient";
import { setProfile, setLoginState } from './store/authSlice';
import LoadingButton from "./components/loadingButton";
import Cookies from "js-cookie";

export default function Home() {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailAlert, setEmailAlert] = useState("");

  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();

  const handleClick = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  //email validation format
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //validate email
    if (email !== "") {
      if (validateEmail(email)) {
        setEmailAlert("");
      } else {
        setEmailAlert("Email not in valid format");
      }
    }

  }, [email]);


  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await apiPost("/login", {
        email: email,
        password: password
      });

      if (response) {
        const { statusCode, responseBody } = response;
        console.log("login status code", statusCode);
        console.log("login response body", responseBody);
        if (statusCode === 200) {
          const data = responseBody.data;
          handleSuccessLogin(data);
        } else {
          setEmailAlert(responseBody.message);
        }
      }
    } catch (err) {
      console.error("Post error:", err);
      alert("Internal Server Error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const response = await apiPost("/register", {
        email: email,
        password: password
      });
      console.log("response", response);
      if (response) {
        const { statusCode, responseBody } = response;
        if (statusCode === 200) {
          const data = responseBody.data;
          handleSuccessLogin(data);
        } else {
          setEmailAlert(responseBody.message);
        }
      }
    } catch (err) {
      console.error("Post error:", err);
      alert("Internal Server Error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessLogin = (bodyData) => {
    const loginToken = bodyData.token.accessToken;
    const loginRefreshToken = bodyData.token.refreshToken;
    const loginProfile = {
      uuid: bodyData.uuid,
      email: bodyData.email,
    };

    dispatch(setProfile(loginProfile));
    dispatch(setLoginState(true));

    Cookies.set("token", loginToken); // Save token for 1 day
    Cookies.set("refreshToken"); // Save refresh token for 1 day
    Cookies.set("email", bodyData.email); // Save email for 1 day
    router.push("/roomchat");
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {isModalVisible && (
          <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              <div className="relative bg-white rounded-lg shadow-sm dark:bg-blue-700">
                <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Login or Register</h3>
                </div>
                <div className="p-4 space-y-4">
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                      <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-green-500 sm:text-sm" required />
                      {emailAlert !== "" && <p className="text-red-500 text-xs italic">{emailAlert}</p>}
                    </div>
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                      <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-green-500 sm:text-sm" required />
                    </div>
                  </form>
                </div>
                <div className="flex items-center justify-end p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button onClick={handleLogin} className="mx-1 text-white bg-green-500 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5" disabled={isLoading}>
                    {isLoading ? <LoadingButton className="text-white" /> : "Login"}
                  </button>
                  <button onClick={handleRegister} className="mx-1 text-white bg-green-500 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5" disabled={isLoading}>
                    {isLoading ? <LoadingButton className="text-white" /> : "Register"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}