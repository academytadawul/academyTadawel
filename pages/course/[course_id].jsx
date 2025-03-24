"use client";
import { useRouter } from "next/router";
import CustomForm from "../../components/form";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { submit_form } from "../../lib/helper/form_submissions";

const CoursePage = () => {
  const router = useRouter();
  const { course_id, affiliate_id, course_title } = router.query;
  useEffect(() => {
    console.log({ course_title });
  }, [course_title]);
  const [formData, setFormData] = useState({
    course_name: "",
    name: "",
    email: "",
    phonenumber: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    setFormData((prevdata) => {
      const newdata = { ...prevdata };
      newdata.course_name = course_title;
      console.log({ newdata });
      return newdata;
    });
  }, [course_id]);
  return (
    <>
      <ToastContainer />
      <CustomForm
        onSubmit={(e) => {
          submit_form(formData, e, course_id, affiliate_id);
        }}
        form_header_title={""}
        showTermsAndConditions={false}
        courseName={course_id}
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
        formDataelements={[
          {
            type: "text",
            id: "course_name",
            placeholder: "Enter your course name",
            readOnly: true,
            required: true,
            label: "Course Name",
          },
          {
            type: "text",
            id: "name",
            placeholder: "Enter your full name",
            readOnly: false,
            required: true,
            label: "Full Name",
          },

          {
            type: "email",
            id: "email",
            placeholder: "Enter your email",
            readOnly: false,
            required: true,
            label: "Email",
          },
          {
            type: "number",
            id: "phonenumber",
            placeholder: "Enter your WhatsApp Number",
            readOnly: false,
            required: true,
            label: "WhatsApp PhoneNumber",
          },
        ]}
      />
    </>
  );
};

export default CoursePage;
