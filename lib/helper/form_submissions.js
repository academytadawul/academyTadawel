import {
  get_creator,
  add_new_customer,
  add_new_request,
  get_customer,
  update_creator_affiliateList,
} from "./db";
import { toast, Bounce } from "react-toastify";

const submit_form = async (formData, form_event, course_id, affiliate_id) => {
  form_event.preventDefault();
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
      const addingcustomer = await update_creator_affiliateList(
        affiliate_id,
        user._id
      );
    }
  } else console.log(`no affiliate`);
  // add form request
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
};
export { submit_form };
