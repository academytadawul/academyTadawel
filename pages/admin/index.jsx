import React from "react";
import Login from "../../components/dashboard/Login";
import { show_error_msg, show_successfull_msg } from "../../lib/helper/logger";
import { addUser } from "../../lib/models/sessionStorage";
const Admin = () => {
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
  const toDoNext = (e, userData, router) => {
    if (!e.error) {
      addUser(e._id, userData.email, userData.password, 'admin');

      router.push("/dashboard");
      show_successfull_msg("Login Successfully");
    } else {
      show_error_msg(e.error);
    }
  };
  return (
    <>
      <Login toDoNext={toDoNext} checkAdmin={checkAdmin} type = {'admin'} routed_page ={'/dashboard'} />
    </>
  );
};

export default Admin;
