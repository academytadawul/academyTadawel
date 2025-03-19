import React from "react";

const CustomForm = (props) => {
  const handleChange = (e) => {
    props.setFormData({ ...props.formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container">
      <form onSubmit={props.onSubmit}>
        <div className="input-group">
          <label for="course_name">Course Name</label>
          <input
            type="text"
            id="course_name"
            name="course_name"
            placeholder="Enter your course name"
            required
            readOnly
            value={props.formData ? props.formData.course_name : ""}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label for="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={props.formData ? props.formData.name : ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={props.formData ? props.formData.email : ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label for="name">WhatsApp PhoneNumber</label>
          <input
            type="number"
            id="phonenumber"
            name="phonenumber"
            placeholder="Enter your WhatsApp Number"
            value={props.formData ? props.formData.phonenumber : ""}
            onChange={handleChange}
            required
          />
        </div>

        {/*   <div className="input-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div> */}

        {/*  <div className="input-group">
          <label for="gender">Gender</label>
          <select id="gender" name="gender">
            <option value="" disabled selected>
              Select your gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div> */}

        <div className="checkbox-group">
          <input type="checkbox" id="terms" name="terms" required />
          <label for="terms">I agree to the terms and conditions</label>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default CustomForm;
