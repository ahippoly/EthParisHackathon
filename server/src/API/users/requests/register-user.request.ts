import { IsNotEmpty, Length } from 'class-validator'
import { UpdateUserRequest } from './update-user-data.request'

export class RegisterUserRequest extends UpdateUserRequest {
  @IsNotEmpty({ message: 'You must provide an id mask' })
  @Length(2, 100, { message: 'The id mask must be between 2 and 100 characters' })
  idMask: string

  @IsNotEmpty({ message: 'You must provide an xtmp address' })
  @Length(2, 100, { message: 'The xmtp address must be between 2 and 100 characters' })
  xmtpPublicAddress: string

  @IsNotEmpty({ message: 'You must provide an xmtp crypted private key' })
  @Length(2, 100, { message: 'The xmtp crypted private key must be between 2 and 100 characters' })
  xmtpCryptedPrivateKey: string
}
