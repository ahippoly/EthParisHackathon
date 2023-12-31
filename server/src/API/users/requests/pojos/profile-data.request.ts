import { Countries, Interests, Langs, Skills } from '@/common/enums/meta-datas'
import { ArrayMinSize, IsEnum, IsNotEmpty } from 'class-validator'

export class ProfileDataRequest {
  @IsNotEmpty({ message: 'You must provide a country' })
  @IsEnum(Countries, { message: `Invalid country value. (possible values: ${Object.values(Countries).join(' | ')})` })
  country: Countries

  @IsNotEmpty({ message: 'You must provide at least 1 spoken language' })
  @ArrayMinSize(1, { message: 'You must provide at least 1 spoken language' })
  @IsEnum(Langs, { message: `Invalid lang value. (possible values: ${Object.values(Langs).join(' | ')})`, each: true })
  langs: Langs[]

  @IsNotEmpty({ message: 'You must provide  at least 1 interest' })
  @ArrayMinSize(1, { message: 'You must provide  at least 1 interest' })
  @IsEnum(Interests, { message: `Invalid interest value. (possible values: ${Object.values(Interests).join(' | ')})`, each: true })
  interests: Interests[]

  @IsNotEmpty({ message: 'You must provide  at least 1 skill' })
  @ArrayMinSize(1, { message: 'You must provide  at least 1 skill' })
  @IsEnum(Skills, { message: `Invalid skill value. (possible values: ${Object.values(Skills).join(' | ')})`, each: true })
  skills: Skills[]
}
