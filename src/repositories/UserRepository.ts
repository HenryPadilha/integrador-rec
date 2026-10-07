import { AppDataSource } from "../config/database";
import { User } from "../entities/user";

export const UserRepository = AppDataSource.getRepository(User);