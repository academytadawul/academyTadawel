"use client";
import React, { useEffect, useState } from "react";
import Course from "../../components/Course";
import { getAllCourses } from "../../lib/helper/db";

const Courses = () => {
  const [all_courses, set_all_courses] = useState([]);

  useEffect(() => {
    // get all courses
    (async () => {
      const courses = await getAllCourses();
      console.log("res");
      if (!courses.error) {
        set_all_courses(courses);
      }
      console.log({ courses });
    })();
  }, []);
  const data = [
    {
      imgurl: "/asset1.jpeg",
      sec2: "التحليل الفني المتقدم",
      sec3: "دورة متقدمة في التحليل الفني وقراءة الرسوم البيانية",
      sec4: { count: 15, type: "أسبوع" },
    },
    {
      imgurl: "/asset1.jpeg",
      sec2: "التحليل الفني المتقدم",
      sec3: "دورة متقدمة في التحليل الفني وقراءة الرسوم البيانية",
      sec4: { count: 15, type: "أسبوع" },
    },
    {
      imgurl: "/asset1.jpeg",
      sec2: "التحليل الفني المتقدم",
      sec3: "دورة متقدمة في التحليل الفني وقراءة الرسوم البيانية",
      sec4: { count: 15, type: "أسبوع" },
    },
    {
      imgurl: "/asset1.jpeg",
      sec2: "التحليل الفني المتقدم",
      sec3: "دورة متقدمة في التحليل الفني وقراءة الرسوم البيانية",
      sec4: { count: 15, type: "أسبوع" },
    },
  ];
  return (
    <>
      <div className="courses_container">
        {all_courses.map((dataitem) => (
          <Course
            on_submit={""}
            imgurl={"/asset1.jpeg" }
            sec2={dataitem.title}
            sec3={dataitem.description}
            sec4={{
              count: dataitem.duration.count,
              type: dataitem.duration.type,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default Courses;
