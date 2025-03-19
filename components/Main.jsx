"use client";
import { useEffect } from "react";
import { useGlobalContext } from "@/contexts/globalContext";
import Link from "next/link";
export const Main = () => {
  const { filtered_tours, set_filtered_tours, set_tours, tours } =
    useGlobalContext();
  useEffect(() => {
    set_filtered_tours();
    // set_tours(props.tours);
    console.log({ filtered_tours });
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="header_part_1_flag"></div>
      <div className="header_part_2">
        <img src="/tadawel.jpg" alt="" />
      </div>
      <div className="courses_container">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <Link className="sigle_course" href={`/course/${index + 1}`}>
              {index + 1}
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
