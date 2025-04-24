// import { jwtDecode } from "jwt-decode";
import { User } from "../types/user";

export const getUsers = (): User[] => {
  return JSON.parse(localStorage.getItem("users") || "[]");
};

export const saveUsers = (users: User[]) => {
  localStorage.setItem("users", JSON.stringify(users));
};

export const setCurrentUser = (user: User) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem("currentUser");
  if (!user) return null;

  const parsedUser: User = JSON.parse(user);
  if (!parsedUser.cart) parsedUser.cart = [];
  if (!parsedUser.boughtItems) parsedUser.boughtItems = [];

  return parsedUser;
};

export const logout = () => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const users = getUsers();
    const updatedUsers = users.map((u) =>
      u.id === currentUser.id ? currentUser : u
    );
    saveUsers(updatedUsers);
  }
  localStorage.removeItem("currentUser");
};

export const decodeToken = (token: string) => {
  try {
    return JSON.parse(atob(token));
  } catch {
    return null;
  }
};

export const generateToken = (user: User): string => {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
  };
  return btoa(JSON.stringify(payload));
};

export const signupUser = (newUser: User) => {
  const users = getUsers();

  const exists = users.some(
    (u) => u.email === newUser.email || u.username === newUser.username
  );
  if (exists) throw new Error("User already exists");

  users.push(newUser);
  saveUsers(users);
};
