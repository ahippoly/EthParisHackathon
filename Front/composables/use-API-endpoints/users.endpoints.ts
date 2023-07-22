import { loggedUser } from "@/assets/constants/mock/users.mock";
import { User } from "@/assets/ts/classes/user";

export class UsersEndpoints {
  static async register(id: string): Promise<User> {
    const user =  new User(id)
    useSessionStore().logIn(user)

    return user
  }

  static async logIn(): Promise<User> {
    const user = User.fromIUser(loggedUser)
    useSessionStore().logIn(user)

    return user
  }

  static async getProfile(): Promise<User> {
    const user = User.fromIUser(loggedUser)
    useSessionStore().logIn(user)

    return user
  }

  static async logOut(): Promise<void> {
    useSessionStore().logOut()
  }
}
