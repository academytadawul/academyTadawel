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


const addNewCreator = async (username, email, password, startDate, endDate) => {
  const resjson = await fetch("/api/creator", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      email,
      password,
      startDate,
      endDate,
    }),
  });
  return await resjson.json();
};

const getTotalCreators = async () => {
  const resjson = await fetch("/api/creator");
  return await resjson.json();
};

const getTotalRequests = async () => {
  const resjson = await fetch("/api/request");
  return await resjson.json();
};

const getCreatorCount = async () => {
  const resjson = await fetch("/api/creator");
  const res = await resjson.json();
  if (!res.error) return res.length;
  else return -1;
};
const getRequestsCount = async () => {
  const resjson = await fetch("/api/request");
  const res = await resjson.json();
  if (!res.error) return res.length;
  else return -1;
};

const getRequestsCountForUser = async (creator_id) => {
  const totalRequests = await getTotalRequests() 
  return totalRequests.filter(request => request.affiliate_id === creator_id)
}
export {
  update_creator_affiliateList,
  get_customer,
  add_new_customer,
  add_new_request,
  getTotalRequests,
  getRequestsCount,
  addNewCreator,
  getTotalCreators,
  getCreatorCount,
  get_creator,
  getRequestsCountForUser
};
