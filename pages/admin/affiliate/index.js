import React from "react";
import {
  show_error_msg,
  show_successfull_msg,
} from "../../../lib/helper/logger";
import { addUser } from "../../../lib/models/sessionStorage";
import Login from "../../../components/dashboard/Login";

const AffiateAdmin = () => {
  const checkAdmin = async (email, password) => {
    const resjson = await fetch(`/api/creator?login=true`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    return resjson.json();
  };
  const toDoNext = (e, userData, router) => {
    if (!e.error) {
      addUser(e._id, userData.email, userData.password, 'affiliate');
      console.log(e)
      router.push(`/dashboard/affiliate?id=${e._id}`);
      show_successfull_msg("Login Successfully");
    } else {
      show_error_msg(e.error);
    }
  };
  return (
    <>
      <Login toDoNext={toDoNext} checkAdmin={checkAdmin} type = {'affiliate'} routed_page ={'/dashboard/affiliate'}/>
    </>
  );
};

export default AffiateAdmin;
