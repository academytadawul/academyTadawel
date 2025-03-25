import React, { useState } from "react";
import HorizontalGrid from "../../components/horizontal_grid";
import Item1 from "../../components/Item1";
import ContactUs from "../../components/contact_us";

const About = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="about_container">
        <HorizontalGrid
          right_element={
            <div className="header_part1_right">
              <div className="part1">عن أكاديمية التداول </div>
              <div className="part2">
                نحن أكاديمية متخصصة في تعليم التداول في الأسواق المالية. نهدف
                إلى تمكين المتداولين من تحقيق أهدافهم المالية من خلال التعليم
                العالي الجودة والدعم المستمر.
              </div>
              <div className="header_part_2">
                <Item1
                  icon={<i class="bx bx-book-open"></i>}
                  text1={"20+ دورة"}
                  text2={""}
                />
                <Item1
                  icon={<i class="bx bx-user-plus"></i>}
                  text1={"1000+ متداول"}
                  text2={""}
                />
                <Item1
                  icon={<i class="bx bx-trophy"></i>}
                  text1={"10+ سنوات خبرة"}
                  text2={""}
                />
              </div>
            </div>
          }
          left_element={
            <div className="about_part1_left">
              <img src="/tadawel.jpg" alt="" />
            </div>
          }
        />
        <div className="section2">
          <h1>فريقنا</h1>
          <div className="header_part_2">
            <Item1
              icon={<img src="tadawel.jpg" alt="" />}
              text1={"خالد عمر"}
              text2={"محلل فني"}
            />
            <Item1
              icon={<img src="tadawel.jpg" alt="" />}
              text1={"سارة عبدالله"}
              text2={"مدير التدريب"}
            />
            <Item1
              icon={<img src="tadawel.jpg" alt="" />}
              text1={"أحمد محمد"}
              text2={"مؤسس الأكاديمية"}
            />
          </div>
        </div>
        <ContactUs
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
        handleChange={handleChange}
        onSubmit={(form_event) => {
          submit_form(formData, form_event, undefined, affiliate_id);
        }}
        formData={formData}
        setFormData={setFormData}
      />
      </div>
    </>
  );
};

export default About;
