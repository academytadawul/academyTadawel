"use client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import {
  get_creator,
  getRequestsCountForUser,
  updateCreatorCred,
} from "../../../lib/helper/db";
import {
  show_successfull_msg,
  show_error_msg,
} from "../../../lib/helper/logger";
const AffiliateDashboard = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState([
    {
      left: "form submitions",
      right: <i class="bx bxs-business"></i>,
      value: 0,
    },
    {
      left: "Money Rate",
      right: <i class="bx bx-money"></i>,
      value: 0,
    },
    {
      left: "Money Pinned",
      right: <i class="bx bx-money-withdraw"></i>,
      value: 0,
    },
    {
      left: "Money Recieved",
      right: <i class="bx bxs-wallet"></i>,
      value: 0,
    },
  ]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [new_affiliate_url, set_new_affiliate_url] = useState("");
  const [current_affiliate_url, set_current_affiliate_url] = useState(
    `https://academytadawul.com?affiliate_id=${id}`
  );
  const [input_readonly, set_input_readonly] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    set_current_affiliate_url(
      `https://academytadawul.com?affiliate_id=${id}  `
    );
  }, [id]);

  useEffect(() => {
    (async () => {
      // add creator info
      const creator = await get_creator(id);
      console.log({ creator });
      setFormData({
        email: creator.email,
        password: creator.password,
      });
      // add form submitions count for user
      const requestsCountForUser = await getRequestsCountForUser();
    })();
  }, [id]);

  return (
    <section className="affiliate_dashboard_container">
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
      <div className="data_section">
        <div className="form-container">
          <form onSubmit={() => {}}>
            {input_readonly ? (
              <>
                <div className="input-group">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="add your email"
                    value={formData ? formData.email : ""}
                    onChange={handleChange}
                    required
                    readOnly
                  />
                </div>
                <div className="input-group">
                  <input
                    type="text"
                    id="password"
                    name="password"
                    placeholder="add your password"
                    value={formData ? formData.password : ""}
                    onChange={handleChange}
                    required
                    readOnly
                  />
                </div>
                <div className="btns_container">
                  <button disabled type="submit">
                    Save
                  </button>
                  <button
                    onClick={() => {
                      set_input_readonly(false);
                    }}
                    type="button"
                  >
                    Change
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="input-group">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="add your email"
                    value={formData ? formData.email : ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <input
                    type="text"
                    id="password"
                    name="password"
                    placeholder="add your password"
                    value={formData ? formData.password : ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="btns_container">
                  <button
                    onClick={async () => {
                      set_input_readonly(true);
                      const updateCreatorCred_res = await updateCreatorCred(
                        id,
                        formData.email,
                        formData.password
                      );
                      console.log({ updateCreatorCred_res });
                    }}
                    type="submit"
                  >
                    Save
                  </button>
                  <button type="button">Change</button>
                </div>
              </>
            )}
          </form>
        </div>
        <div className="text-fields-container">
          <h1>Add Any Url From The Site</h1>
          <div className="url-container 1">
            <input
              type="text"
              value={new_affiliate_url}
              onChange={(e) => set_new_affiliate_url(e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              let new_current = new_affiliate_url;
              if (new_affiliate_url[new_affiliate_url.length - 1] == "/") {
                new_current = new_affiliate_url.slice(
                  0,
                  new_affiliate_url.length - 1
                );
              }
              if (new_current.includes("?")) {
                new_current += `&affiliate_id=${id}`;
              } else {
                new_current += `?affiliate_id=${id}`;
              }
              set_current_affiliate_url(new_current);
            }}
          >
            Create Affiliate Link <i class="bx bxs-down-arrow-alt"></i>
          </button>
          <div className="url-container _2">
            <input type="text" value={current_affiliate_url} readOnly />
            <i
              onClick={() => {
                // Get the input field
                let textField = document.querySelector(
                  ".text-fields-container > .url-container._2 input"
                );
                // Select the text
                textField.select();
                textField.setSelectionRange(0, 99999); // For mobile devices

                // Copy the text to clipboard
                navigator.clipboard
                  .writeText(textField.value)
                  .then(() => {
                    show_successfull_msg(
                      "Copied to clipboard: " + textField.value
                    );
                  })
                  .catch((err) => {
                    show_error_msg("Failed to copy: ", err);
                  });
              }}
              class="bx bx-copy"
            ></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AffiliateDashboard;
