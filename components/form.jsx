"use client";
import React from "react";

const CustomForm = (props) => {
  return (
    <div className="form-container">
      <div className="form_header_title">{`${props.form_header_title} login`}</div>
      <form onSubmit={props.onSubmit}>
        {props.formDataelements.map((field_vals, ind) => (
          <div className="input-group">
            <label for="name">{field_vals.label}</label>
            {field_vals.required ? (
              field_vals.readOnly ? (
                <input
                  type={field_vals.type}
                  id={field_vals.id}
                  name={field_vals.id}
                  placeholder={field_vals.placeholder}
                  value={props.formData ? props.formData[field_vals.id] : ""}
                  onChange={props.handleChange}
                  required
                  readOnly
                />
              ) : (
                <input
                  type={field_vals.type}
                  id={field_vals.id}
                  name={field_vals.id}
                  placeholder={field_vals.placeholder}
                  value={props.formData ? props.formData[field_vals.id] : ""}
                  onChange={props.handleChange}
                  required
                />
              )
            ) : field_vals.readonly ? (
              <input
                type={field_vals.type}
                id={field_vals.id}
                name={field_vals.id}
                placeholder={field_vals.placeholder}
                value={props.formData ? props.formData[field_vals.id] : ""}
                onChange={props.handleChange}
                readOnly
              />
            ) : (
              <input
                type={field_vals.type}
                id={field_vals.id}
                name={field_vals.id}
                placeholder={field_vals.placeholder}
                value={props.formData ? props.formData[field_vals.id] : ""}
                onChange={props.handleChange}
              />
            )}
          </div>
        ))}
        {props.showTermsAndConditions ? (
          <div className="checkbox-group">
            <input type="checkbox" id="terms" name="terms" required />
            <label for="terms">I agree to the terms and conditions</label>
          </div>
        ) : (
          <></>
        )}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default CustomForm;
