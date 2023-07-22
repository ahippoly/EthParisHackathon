import { loggedUser, relevantUsers } from '@/assets/constants/mock/users.mock'
import { User } from '@/assets/ts/classes/user'

export class UsersEndpoints {
  static async register(idMask: string): Promise<User> {
    // register to api

    // get new User back as pojos
    const user = User.fromIUser(loggedUser)
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

  static async getRelevantProfiles(): Promise<User[]> {
    return relevantUsers.map((user) => User.fromIUser(user))
  }
}
