export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  try {
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

export const isAdmin = () => {
  const user = getUser();
  return user && user.role === "admin";
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
