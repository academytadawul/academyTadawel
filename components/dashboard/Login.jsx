import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { addUser, isUser } from "../../lib/models/sessionStorage";
import { show_error_msg, show_successfull_msg } from "../../lib/helper/logger";
import { ToastContainer } from "react-toastify";
const Login = () => {
  const router = useRouter();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const checkAdmin = async (email, password) => {
    const resjson = await fetch(`/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    console.log({ resjson });
    return resjson.json();
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const user = isUser();
    if (user) {
      router.push("/dashboard");
      show_successfull_msg("Login successfully");
    }
  }, []);

  return (
    <div className="login-container">
      <ToastContainer />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          checkAdmin(userData.email, userData.password)
            .then((e) => {
              if (!e.error) {
                addUser(userData.email, userData.password);
                router.push("/dashboard");
                show_successfull_msg("Login Successfully");
              } else {
                show_error_msg(e.error);
              }
            })
            .catch((e) => {
              if (!e.error) {
                show_error_msg("Wrong Credentials");
              } else {
                show_error_msg(e.error);
              }
            });
        }}
      >
        <div className="input-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            placeholder="Enter your password"
            onChange={handleChange}
            required
          />
        </div>

        <div className="checkbox-group">
          <input type="checkbox" id="terms" name="terms" required />
          <label for="terms">I agree to the terms and conditions</label>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Login;
