import React from "react";

const Course = ({imgurl, sec2, sec3, sec4, on_submit}) => {
  return (
    <>
      <div className="course_main_container">
        <div className="section1">
          <img src={imgurl} alt="" />
        </div>
        <div className="container">
          <div className="section2">{sec2}</div>
          <div className="section3">
            {sec3}
          </div>
          <div className="section4">
            <div className="time">
              <span>{sec4.type}</span>
              <span>{sec4.count}</span>
            </div>
            <i class="bx bx-time"></i>
          </div>
          <div className="section4">
            <button onClick={
                () => {
                    
                }
            }>سجل الان</button>
          </div>
        </div>
      </div>
      {/* <div className="courses_container">
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
      </div> */}
    </>
  );
};

export default Course;
