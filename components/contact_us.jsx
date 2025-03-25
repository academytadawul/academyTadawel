"use client";
import React from "react";
import CustomForm from "../components/form";

const ContactUs = ({
  formDataelements,
  handleChange,
  onSubmit,
  formData,
  setFormData,
}) => {
  return (
    <>
      <div id="contact" className="contact_container">
        <div className="contact_header1">تواصل معنا</div>
        <div className="contact_header2">ابدأ رحلتك في عالم التداول اليوم</div>
        <CustomForm
          onSubmit={onSubmit}
          form_header_title={""}
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          formDataelements={formDataelements}
        />
      </div>
    </>
  );
};

export default ContactUs;
