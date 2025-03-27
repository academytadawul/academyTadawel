import Link from "next/link";
import React from "react";

const Course = ({ imgurl, title, sec3, sec4, course_id }) => {
  return (
    <>
      <div className="course_main_container">
        <div className="section1">
          <img src={imgurl} alt="" />
        </div>
        <div className="container">
          <div className="section2">{title}</div>
          <div className="section3">{sec3}</div>
          <div className="section4">
            <div className="time">
              <span>{sec4.type}</span>
              <span>{sec4.count}</span>
            </div>
            <i class="bx bx-time"></i>
          </div>
          <div className="section4">
            <Link href={`https://academytadawul.com/course/${course_id}?course_title=${title}`}>سجل الان</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Course;
