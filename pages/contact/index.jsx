import React, { useState } from "react";
import Item1 from "../../components/Item1";
import ContactUs from "../../components/contact_us";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="contact_container">
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
          icon={<i class="bx bx-line-chart"></i>}
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
    </div>
  );
};

export default Contact;
