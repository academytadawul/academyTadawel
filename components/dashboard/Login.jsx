"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isUser } from "../../lib/models/sessionStorage";
import { show_error_msg, show_successfull_msg } from "../../lib/helper/logger";
import { ToastContainer } from "react-toastify";
import CustomForm from "../form";
const Login = (props) => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const isAdmin = async (e) => {
    try {
      return await props.checkAdmin(userData.email, userData.password);
    } catch (error) {
      if (!e.error) {
        show_error_msg("Wrong Credentials");
      } else {
        show_error_msg(e.error);
      }
    }
  };

  useEffect(() => {
    const user = isUser(props.type);
    if (user) {
      console.log(user);
      if (props.type == "affiliate") {
        router.push(`${props.routed_page}?id=${user.id}`);
        console.log({user});
      } else {
        router.push(props.routed_page);
      }
      show_successfull_msg("Login successfully");
    }
  }, [props.type, props.routed_page]);

  return (
    <div className="login-container">
      <ToastContainer />
      <CustomForm
        form_header_title={`${props.type} login`}
        onSubmit={async (form_event) => {
          form_event.preventDefault();
          const is_admin_event = await isAdmin(form_event);
          console.log({ is_admin_event });
          props.toDoNext(is_admin_event, userData, router);
        }}
        showTermsAndConditions={true}
        formData={userData}
        setFormData={setUserData}
        handleChange={handleChange}
        formDataelements={[
          {
            type: "email",
            id: "email",
            placeholder: "Enter your email",
            readOnly: false,
            required: true,
            label: "Email",
          },
          {
            type: "password",
            id: "password",
            placeholder: "Enter your password",
            readOnly: false,
            required: true,
            label: "Password",
          },
        ]}
      />
    </div>
  );
};

export default Login;
