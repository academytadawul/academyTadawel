"use client";
import React, { useEffect, useState } from "react";
import { show_error_msg, show_successfull_msg } from "../../lib/helper/logger";
import { ToastContainer } from "react-toastify";
import {
  addNewCreator,
  getTotalCreators,
  getTotalRequests,
  getCreatorCount,
  getRequestsCount,
} from "../../lib/helper/db";
const Dashboard = () => {

  useEffect(() => {
    document.body.style.background = "white";
  }, []);
  const [data, setData] = useState([
    {
      left: "creators",
      right: <i class="bx bxs-business"></i>,
      value: 0,
    },
    {
      left: "form requests",
      right: <i class="bx bx-user-plus"></i>,
      value: 0,
    },
    {
      left: "money Paid",
      right: <i class="bx bx-money-withdraw"></i>,
      value: 0,
    },
    {
      left: "money Pinned",
      right: <i class="bx bxs-wallet"></i>,
      value: 0,
    },
  ]);

  const [newAffiliate, setNewAffiliate] = useState({
    username: "",
    email: "",
    password: "",
    startDate: "",
    pay_rate: 0,
    endDate: "",
  });

  const updateNewAffiliate = (e) => {
    setNewAffiliate({ ...newAffiliate, [e.target.name]: e.target.value });
  };

  const [totalCreators, setTotalCreators] = useState([]);

  const [totalRequest, setTotalRequests] = useState([]);

  useEffect(() => {
    (async () => {
      const promise_list = [
        getCreatorCount(),
        getRequestsCount(),
        getTotalCreators(),
      ];
      const promise_list_res = await Promise.all(promise_list);
      const creatorscount = promise_list_res[0];
      const requestscount = promise_list_res[1];
      const total_creators = promise_list_res[2];
      setData((oldata) => {
        const copy = [...oldata];
        copy[0].value = creatorscount;
        copy[1].value = requestscount;
        return copy;
      });
      if (!total_creators.error) {
        setTotalCreators(total_creators);
      }
      // total requests
      const total_requests = await getTotalRequests();
      if (!total_requests.error) {
        setTotalRequests(total_requests);
        console.log({ total_requests });
      }
    })();
  }, []);
  return (
    <section className="dashboard_container">
      <ToastContainer />
      <section className="first_section">
        {data.map((value, index) => (
          <div className="data_section">
            <div className="left_icon">{value.left}</div>
            <div className="right_icon">{value.right}</div>
            {value.value}
          </div>
        ))}
      </section>
      <section className="second_section">
        <div className="data_section one">
          <h1 className="table_title">Total Affiliates</h1>
          <div className="table_heading">
            <div>USER NAME</div>
            <div>EMAIL</div>
            <div>START DATE</div>
            <div>END DATE</div>
          </div>
          {totalCreators.map((value) => (
            <div>
              <div className="table_item">{value.username}</div>
              <div className="table_item">{value.email}</div>
              <div className="table_item">
                {value.startDate
                  ? new Date(value.startDate).toDateString()
                  : ""}
              </div>
              <div className="table_item">
                {value.endDate ? new Date(value.endDate).toDateString() : ""}
              </div>
            </div>
          ))}
        </div>
        <div className="data_section two">
          <h1 className="table_title">Total Requests</h1>
          <div className="table_heading">
            <div>client id</div>
            <div>creator id</div>
            <div>course id</div>
          </div>
          {totalRequest.map((value) => (
            <div>
              <div className="table_item">{value.user_id}</div>
              <div className="table_item">{value.creator_id}</div>
              <div className="table_item">{value.course_id}</div>
            </div>
          ))}
        </div>
        <div className="data_section">
          <h1 className="form_heading">Add New Affiliate</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addNewCreator(
                newAffiliate.username,
                newAffiliate.email,
                newAffiliate.password,
                newAffiliate.startDate,
                newAffiliate.endDate,
                newAffiliate.pay_rate
              )
                .then((e) => {
                  if (e.error) {
                    show_error_msg(e.error);
                  } else {
                    show_successfull_msg("added affiliate successfully");
                  }
                })
                .catch((error) => {
                  show_error_msg("Something went wrong!");
                });
            }}
            action="#"
          >
            <div className="input_field">
              <label htmlFor="username">UserName: </label>
              <input
                onChange={updateNewAffiliate}
                value={newAffiliate.username}
                type="text"
                name="username"
                id="username"
                required
              />
            </div>
            <div className="input_field">
              <label htmlFor="email">Email: </label>
              <input
                onChange={updateNewAffiliate}
                value={newAffiliate.email}
                type="text"
                name="email"
                id="email"
                required
              />
            </div>
            <div className="input_field">
              <label htmlFor="pay_rate">Pay Rate: </label>
              <input
                required
                onChange={updateNewAffiliate}
                value={newAffiliate.pay_rate}
                type="number"
                name="pay_rate"
                id="pay_rate"
              />
            </div>
            <div className="input_field">
              <label htmlFor="password">Password: </label>
              <input
                required
                onChange={updateNewAffiliate}
                value={newAffiliate.password}
                type="password"
                name="password"
                id="password"
              />
            </div>
            <div className="input_field">
              <label htmlFor="startDate">Start Date: </label>
              <input
                required
                onChange={updateNewAffiliate}
                value={newAffiliate.startDate}
                type="date"
                name="startDate"
                id="startDate"
              />
            </div>
            <div className="input_field">
              <label htmlFor="endDate">End Date: </label>
              <input
                required
                onChange={updateNewAffiliate}
                value={newAffiliate.endDate}
                type="date"
                name="endDate"
                id="endDate"
              />
            </div>
            <button type="submit">Add</button>
          </form>
        </div>
      </section>
    </section>
  );
};

export default Dashboard;
