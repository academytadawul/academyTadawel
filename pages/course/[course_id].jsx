import { useRouter } from "next/router";
import CustomForm from "../../components/form";
import { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";

const CoursePage = () => {
  const router = useRouter();
  const { course_id, affiliate_id, course_title } = router.query;
  useEffect(() => {
    console.log({ course_title });
  }, [course_title]);
  const [formData, setFormData] = useState({
    course_name: course_title ? course_title : 0,
    name: "",
    email: "",
    phonenumber: "",
  });
  useEffect(() => {
    setFormData((prevdata) => {
      const newdata = { ...prevdata };
      newdata.course_name = course_title;
      return newdata;
    });
  }, [course_id]);

  const update_creator_affiliateList = async (affiliate_id, user_id) => {
    const jsondata = await fetch(`/api/creator?id=${affiliate_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer_id: user_id,
      }),
    });
    return await jsondata.json();
  };

  const get_creator = async (affiliate_id) => {
    const creatorjson = await fetch(`/api/creator?id=${affiliate_id}`);
    return await creatorjson.json();
  };

  const get_customer = async (email) => {
    const userjson = await fetch(`/api/customer?email=${email}`);
    return await userjson.json();
  };

  const add_new_customer = async (name, email, phonenumber) => {
    const userjson = await fetch(`/api/customer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phonenumber: phonenumber,
      }),
    });
    return await userjson.json();
  };

  const add_new_request = async (customer_id, course_id, creator_id) => {
    const resjson = await fetch("/api/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: customer_id,
        course_id: course_id,
        affiliate_id: creator_id,
      }),
    });
    return await resjson.json();
  };
  return (
    <>
      <ToastContainer />
      <CustomForm
        onSubmit={async (form_event) => {
          form_event.preventDefault();
          console.log(`course id is ${course_id}\n`);
          console.log({ target: form_event.target });

          let user = await get_customer(formData.email);
          if (user.error) {
            console.log("adding new user");
            user = await add_new_customer(
              formData.name,
              formData.email,
              formData.phonenumber
            );
          } else console.log(user);

          if (affiliate_id) {
            // 2. check affiliate_id in db
            const creator = await get_creator(affiliate_id);
            if (!creator.error) {
              console.log("creator found");
              const addingcustomer = await update_creator_affiliateList(
                affiliate_id,
                user._id
              );
              console.log({ addingcustomer });
            }
            // if found
            console.log(`affiliate found with id ${affiliate_id}`);
          } else console.log(`no affiliate`);
          // add form request
          console.log({
            "user_id": user._id,
            course_id,
            affiliate_id,
          });
          const e = await add_new_request(user._id, course_id, affiliate_id);
          if (e.error) {
            toast.error(e.error, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          } else {
            toast.success("Request Created Successfully", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          }
        }}
        courseName={course_id}
        formData={formData}
        setFormData={setFormData}
      />
    </>
  );
};

export default CoursePage;
