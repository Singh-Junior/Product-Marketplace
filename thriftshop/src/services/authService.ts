import { User } from "../types/user";
import { getUsers, saveUsers, setCurrentUser, generateToken } from "../utils/auth";

export const signup = (newUser: Omit<User, "id" | "token">): string | null => {
  const users = getUsers();
  if (users.find(u => u.email === newUser.email)) {
    return "User already exists";
  }
  const id = Date.now();
  const user: User = {
    ...newUser,
    id,
    token: generateToken(newUser as User),
    cart: [],
    boughtItems: [],
  };
  users.push(user);
  saveUsers(users);
  setCurrentUser(user);
  return null;
};

export const login = (email: string, password: string): string | null => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return "Invalid credentials";

  user.token = generateToken(user);
  setCurrentUser(user);
  return null;
};
