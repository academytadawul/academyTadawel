const isUser = (type) => {
  const user = sessionStorage.getItem(type);
  if (user == null) return false;
  return JSON.parse(user);
};

const addUser = (id, email, password, type) => {
  sessionStorage.setItem(type, JSON.stringify({id, email, password }));
};

export { isUser, addUser };
