import { SismoEndpoints } from './use-API-endpoints/sismo.endpoints'
import { UsersEndpoints } from './use-API-endpoints/users.endpoints'

export const useAPI = () => ({
  users: UsersEndpoints,
  sismo: SismoEndpoints
})
