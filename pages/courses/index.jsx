import React from "react";
import Course from "../../components/Course";

const Courses = () => {
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
        {data.map((dataitem) => (
          <Course
            imgurl={dataitem.imgurl}
            sec2={dataitem.sec2}
            sec3={dataitem.sec3}
            sec4={{ count: dataitem.sec4.count, type: dataitem.sec4.type }}
          />
        ))}
      </div>
    </>
  );
};

export default Courses;
