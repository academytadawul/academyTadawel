"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import CustomForm from "../components/form";
import { submit_form } from "../lib/helper/form_submissions";
import { useRouter } from "next/router";

export const Main = () => {
  const router = useRouter();
  const { affiliate_id } = router.query;
  const [all_courses, set_all_courses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const getAllCources = async () => {
    const resjson = await fetch("/api/course");
    return await resjson.json();
  };
  useEffect(() => {
    // get all courses
    (async () => {
      const courses = await getAllCources();
      console.log("res");
      if (!courses.error) {
        set_all_courses(courses);
      }
      console.log({ courses });
    })();
  }, []);

  return (
    <>
      <div className="header_part_1_flag"></div>
      <div className="header_part_2">
        <img src="/tadawel.jpg" alt="" />
      </div>
      <div className="courses_container">
        {all_courses.map((course_val, index) => (
          <Link
            className="sigle_course"
            href={{
              pathname: `/course/${course_val._id ? course_val._id : null}`,
              query: { course_title: course_val.title },
            }}
          >
            <img src="/tadawel_2.jpg" alt="tadawel image" />
          </Link>
        ))}
      </div>
      <div className="header_part_3">
        <img className="first" alt="" />
        <img alt="" />
        <img alt="" />
        <img alt="" />
        <img alt="" />
        <img className="last" alt="" />
      </div>
      <div className="contact_container">
        <div className="contact_header">Request Custom Plan</div>
        <CustomForm
          onSubmit={(form_event) => {
            submit_form(formData, form_event, "", affiliate_id);
          }}
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          formDataelements={[
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
      </div>
    </>
  );
};
