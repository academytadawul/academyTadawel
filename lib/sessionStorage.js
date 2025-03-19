const isUser = () => {
  const user = sessionStorage.getItem("user");
  if (user == null) return false;
  return JSON.parse(user);
};

const addUser = (email, password) => {
  sessionStorage.setItem("user", JSON.stringify({ email, password }));
};

export { isUser, addUser };
