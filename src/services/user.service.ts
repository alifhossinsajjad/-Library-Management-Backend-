import { User, IUser } from "../models/user.model";

export const createUser = async (userData: Partial<IUser>) => {
  const user = await User.create(userData);
  return user;
};

export const getAllUsers = async () => {
  const users = await User.find().select("-password"); // Exclude password from the results
  return users;
};
