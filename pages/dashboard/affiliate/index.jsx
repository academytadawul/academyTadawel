import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { get_creator } from "../../../lib/helper/db";

const AffiliateDashboard = () => {
  const router = useRouter();
  const { id } = router.query;
  const data = [
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
  ];
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [input_readonly, set_input_readonly] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    (async () => {
      const creator = await get_creator(id);
      console.log({ creator });
      setFormData({
        email: creator.email,
        password: creator.password,
      });
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
                    onClick={() => {
                      set_input_readonly(true);
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
      </div>
    </section>
  );
};

export default AffiliateDashboard;
