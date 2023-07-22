import { User } from '@/assets/ts/classes/user'

export type TRegisterUserPayload = Omit<IUser, '_id' | 'profil' | 'search' | 'xmtpPublicAddress' | 'xmtpCryptedPrivateKey'> & {
  profileData: IUserProfile
}
export type TUpdateUserPayload = Omit<IUser, '_id' | 'profil' | 'search' | 'xmtpPublicAddress' | 'xmtpCryptedPrivateKey'> & {
  profileData: IUserProfile
}

export class UsersEndpoints {
  static readonly path = '/users'

  static async register(
    idMask: string,
    xmtpPublicAddress: string,
    xmtpCryptedPrivateKey: string,
    user: TRegisterUserPayload
  ): Promise<IRequestResult<User>> {
    // register to api
    const { data, error } = await useRequest().post<IUser>(UsersEndpoints.path, {
      body: {
        ...user,
        idMask,
        xmtpPublicAddress,
        xmtpCryptedPrivateKey
      }
    })

    if (!data || error) return { data: null, error }

    console.log({ data })

    // get new User back as pojos
    const registedUser = User.fromIUser(data)
    useSessionStore().logIn(registedUser)

    return { data: registedUser, error }
  }

  static async logIn(idMask: string): Promise<IRequestResult<User>> {
    return UsersEndpoints.getProfile(idMask)
  }

  static async getProfile(idMask: string): Promise<IRequestResult<User>> {
    const { data, error } = await useRequest().get<IUser>(UsersEndpoints.path + '/by-id-mask?id-mask=' + idMask)

    if (!data || error) return { data: null, error }

    const userInstance = User.fromIUser(data)

    useSessionStore().logIn(userInstance)

    return { data: userInstance, error: null }
  }

  static async logOut(): Promise<void> {
    useSessionStore().logOut()
  }

  static async getUserByXmtpAddress(address: string): Promise<IRequestResult<User>> {
    const { data, error } = await useRequest().get<IUser>(UsersEndpoints.path + '/by-address?address=' + address)

    if (!data || error) return { data: null, error }

    return { data: User.fromIUser(data), error: null }
  }

  static async getAllUsersByXmtpAddress(addresses: string[]): Promise<IRequestResult<User[]>> {
    const { data, error } = await useRequest().post<IUser[]>(UsersEndpoints.path + '/all/by-address', { body: { addresses } })

    if (!data || error) return { data: null, error }

    return { data: data.map((user) => User.fromIUser(user)), error: null }
  }

  static async getRelevantProfiles(idMask: string): Promise<IRequestResult<User[]>> {
    const { data, error } = await useRequest().get<IUser[]>(UsersEndpoints.path + '/relevant-matchs?id-mask=' + idMask)

    if (!data || error) return { data: null, error }

    const userInstances = data.map((user) => User.fromIUser(user))

    return { data: userInstances, error: null }
  }

  static async updateProfile(idMask: string, payload: TUpdateUserPayload): Promise<IRequestResult<User>> {
    const { data, error } = await useRequest().patch<IUser>(UsersEndpoints.path + '/profile?id-mask=' + idMask, { body: payload })

    if (!data || error) return { data: null, error }

    return { data: User.fromIUser(data), error: null }
  }

  static async updateSearch(idMask: string, payload: IUserSearch): Promise<IRequestResult<User>> {
    const { data, error } = await useRequest().patch<IUser>(UsersEndpoints.path + '/search?id-mask=' + idMask, { body: payload })

    if (!data || error) return { data: null, error }

    return { data: User.fromIUser(data), error: null }
  }

  static async updateXmtpCryptedPrivateKey(idMask: string, newCryptedKey: string): Promise<IRequestResult<boolean>> {
    const { data, error } = await useRequest().patch<boolean>(
      UsersEndpoints.path + `/xmtp-crypted-private-key?id-mask=${idMask}&crypted-key=${newCryptedKey}`
    )

    if (data === null || error) return { data: null, error }

    return { data, error: null }
  }
}
