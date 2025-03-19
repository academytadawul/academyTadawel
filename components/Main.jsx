"use client";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/contexts/globalContext";
import Link from "next/link";
export const Main = () => {
  const { filtered_tours, set_filtered_tours, set_tours, tours } =
    useGlobalContext();
  const [all_courses, set_all_courses] = useState([]);

  const getAllCources = async () => {
    const resjson = await fetch("/api/course");
    return await resjson.json();
  };
  const getAllCreators = async () => {
    const resjson = await fetch("/api/creator");
    return await resjson.json();
  };
  useEffect(() => {
    set_filtered_tours();
    // set_tours(props.tours);
    console.log({ filtered_tours });
    window.scrollTo(0, 0);
    // get all courses
    (async () => {
      const courses = await getAllCources();
      console.log("res");
      if (!courses.error) {
        set_all_courses(courses);
      }
      console.log({ courses });
    })();
    (async () => {
      const creators = await getAllCreators();
      console.log("res");
      console.log({ creators });
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
              query: {course_title: course_val.title}
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
    </>
  );
};
