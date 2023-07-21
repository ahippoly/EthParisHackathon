import { loggedUser } from "@/assets/constants/mock/users.mock";

export class UsersEndpoints {
  static async getProfile(): Promise<IUser> {
    return loggedUser
  }
}
