import { loggedUser } from "@/assets/constants/mock/users.mock";
import { User } from "@/types/user/user";

export class UsersEndpoints {
  static async getProfile(): Promise<User> {
    return User.of(loggedUser)
  }
}
