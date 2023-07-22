import { ArrayMinSize, IsNotEmpty, Length, ValidateNested } from 'class-validator'
import { ProfileDataRequest } from './pojos/profile-data.request'
import { Type } from 'class-transformer'

export class RegisterUserRequest {
  @IsNotEmpty({ message: 'You must provide an id mask' })
  @Length(2, 100, { message: 'The id mask must be between 2 and 100 characters' })
  idMask: string

  @IsNotEmpty({ message: 'You must provide an xtmp address' })
  @Length(2, 100, { message: 'The xmtp address must be between 2 and 100 characters' })
  xmtpPublicAddress: string

  @IsNotEmpty({ message: 'You must provide a name' })
  @Length(2, 100, { message: 'The name must be between 2 and 100 characters' })
  name: string

  @IsNotEmpty({ message: 'You must provide a description' })
  @Length(50, 1000, { message: 'The description must be between 50 and 1000 characters' })
  description: string

  @IsNotEmpty({ message: 'You must provide at least 1 goal' })
  @Length(2, 100, { message: 'The goals must be between 2 and 100 characters', each: true })
  @ArrayMinSize(1, { message: 'You must provide at least 1 goal' })
  goals: string[]

  @IsNotEmpty({ message: 'You must provide profile data' })
  @Type(() => ProfileDataRequest)
  @ValidateNested()
  profileData: ProfileDataRequest
}
