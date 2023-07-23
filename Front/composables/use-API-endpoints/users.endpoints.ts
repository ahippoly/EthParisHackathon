import { User } from '@/assets/ts/classes/user'
import { AlertModes } from '~~/assets/ts/enums/store'

export type TRegisterUserPayload = Omit<
  IUser,
  '_id' | 'profile' | 'search' | 'xmtpPublicAddress' | 'xmtpCryptedPrivateKey' | 'balance' | 'followers'
> & {
  profileData: IUserProfile
}
export type TUpdateUserPayload = Omit<
  IUser,
  '_id' | 'profile' | 'search' | 'xmtpPublicAddress' | 'xmtpCryptedPrivateKey' | 'balance' | 'followers'
> & {
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
    const sismoResponse: IVerifyResponse | null = useSessionStore().getSismoResponse()
    // register to api
    const { data, error } = await useRequest().post<IUser>(UsersEndpoints.path, {
      body: {
        ...user,
        idMask,
        xmtpPublicAddress,
        xmtpCryptedPrivateKey,
        balance: sismoResponse?.balance || 0,
        followers: sismoResponse?.followers || 0
      },
      alert: { mode: AlertModes.ALL, successMsg: 'You sucessfuly registered' }
    })

    if (!data || error) return { data: null, error }

    // get new User back as pojos
    const registedUser = User.fromIUser(data)
    useSessionStore().logIn(registedUser, idMask)

    return { data: registedUser, error }
  }

  static async logIn(idMask: string): Promise<IRequestResult<User>> {
    if (useSessionStore().getIdMask() === idMask) {
      const currentUser = useSessionStore().getUser()

      if (!currentUser) return UsersEndpoints.getProfile()
      else return { data: currentUser, error: null }
    }

    useSessionStore().setIdMask(idMask)
    return UsersEndpoints.getProfile()
  }

  static async getProfile(): Promise<IRequestResult<User>> {
    const idMask = useSessionStore().getIdMask()
    if (!idMask) return { data: null, error: { status: 400, message: 'No idMask' } }

    const { data, error } = await useRequest().get<IUser>(UsersEndpoints.path + '/by-id-mask?id-mask=' + idMask)

    if (!data || error) return { data: null, error }

    const userInstance = User.fromIUser(data)

    useSessionStore().logIn(userInstance, idMask)

    return { data: userInstance, error: null }
  }

  static async logOut(): Promise<void> {
    useSessionStore().logOut()
  }

  static async getUserById(id: string): Promise<IRequestResult<User>> {
    const { data, error } = await useRequest().get<IUser>(UsersEndpoints.path + '/by-id?id=' + id)

    if (!data || error) return { data: null, error }

    return { data: User.fromIUser(data), error: null }
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

  static async getRelevantProfiles(): Promise<IRequestResult<User[]>> {
    const idMask = useSessionStore().getIdMask()
    if (!idMask) return { data: null, error: { status: 400, message: 'No idMask' } }

    const { data, error } = await useRequest().get<IUser[]>(UsersEndpoints.path + '/relevant-matchs?id-mask=' + idMask)

    if (!data || error) return { data: null, error }

    const userInstances = data.map((user) => User.fromIUser(user))

    return { data: userInstances, error: null }
  }

  static async updateProfile(payload: TUpdateUserPayload): Promise<IRequestResult<User>> {
    const idMask = useSessionStore().getIdMask()
    if (!idMask) return { data: null, error: { status: 400, message: 'No idMask' } }

    const { data, error } = await useRequest().patch<IUser>(UsersEndpoints.path + '/profile?id-mask=' + idMask, {
      body: payload,
      alert: { mode: AlertModes.ALL, successMsg: 'Profile successfuly updated' }
    })

    if (!data || error) return { data: null, error }

    const user = User.fromIUser(data)

    useSessionStore().setUser(user)

    return { data: user, error: null }
  }

  static async updateSearch(payload: IUserSearch): Promise<IRequestResult<User>> {
    const idMask = useSessionStore().getIdMask()
    if (!idMask) return { data: null, error: { status: 400, message: 'No idMask' } }

    const { data, error } = await useRequest().patch<IUser>(UsersEndpoints.path + '/search?id-mask=' + idMask, {
      body: payload,
      alert: { mode: AlertModes.ALL, successMsg: 'Criterias sucessfuly updated' }
    })

    if (!data || error) return { data: null, error }

    const user = User.fromIUser(data)

    useSessionStore().setUser(user)

    return { data: user, error: null }
  }

  static async updateXmtpCryptedPrivateKey(newCryptedKey: string, publicAddress: string): Promise<IRequestResult<boolean>> {
    const idMask = useSessionStore().getIdMask()
    if (!idMask) return { data: null, error: { status: 400, message: 'No idMask' } }

    const { data, error } = await useRequest().patch<boolean>(
      UsersEndpoints.path + `/xmtp-crypted-private-key?id-mask=${idMask}&crypted-key=${newCryptedKey}&public-address=${publicAddress}`,
      {
        alert: { mode: AlertModes.ALL, successMsg: 'Data sucessfuly updated' }
      }
    )

    if (data === null || error) return { data: null, error }

    return { data, error: null }
  }
}
