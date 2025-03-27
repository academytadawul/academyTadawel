"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import CustomForm from "../components/form";
import { submit_form } from "../lib/helper/form_submissions";
import { useRouter } from "next/router";
import ContactUs from "../components/contact_us";
import HorizontalGrid from "../components/horizontal_grid";
import Item1 from "../components/Item1";

export const Main = () => {
  const router = useRouter();
  const { affiliate_id } = router.query;
  const getAllCources = async () => {
    const resjson = await fetch("/api/course");
    return await resjson.json();
  };
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
      <HorizontalGrid
        right_element={
          <div className="header_part1_right">
            <div className="part1">
              <span className="_gold_">خصم 50% </span>على جميع دورات التداول
            </div>
            <div className="part2">
              ابدأ رحلتك في عالم التداول مع خبراء السوق. تعلم استراتيجيات
              التداول المتقدمة وحلل الأسواق باحترافية.
            </div>
            <a href="#contact">أبدأ الان</a>
            <div className="part3">عرض محدود - سجل الآن واحصل على الخصم</div>
          </div>
        }
        left_element={
          <div className="header_part1_left">
            <img src="/tadawel.jpg" alt="" />
          </div>
        }
      />
      <div className="header_part_2">
        <Item1
          icon={<i class="bx bx-user-plus"></i>}
          text1={"دعم مستمر"}
          text2={"دعم فني ومتابعة مستمرة من فريق متخصص"}
        />
        <Item1
          icon={<i class="bx bx-trophy"></i>}
          text1={"خبراء محترفون"}
          text2={"تدرب على يد نخبة من خبراء السوق المالي"}
        />
        <Item1
          icon={<i class='bx bx-line-chart' ></i>}
          text1={"تحليل متقدم"}
          text2={"تعلم أحدث تقنيات التحليل الفني والأساسي"}
        />
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
    </>
  );
};
