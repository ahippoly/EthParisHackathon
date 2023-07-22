import { Countries, Interests, Langs, Skills } from '@/common/enums/meta-datas'
import { IsEnum, IsOptional, Min } from 'class-validator'

export class SearchDataRequest {
  @IsOptional()
  @Min(0, { message: 'The minimum balance must be a positive number' })
  minimumBalance?: number

  @IsOptional()
  @IsEnum(Countries, { message: `Invalid country value. (possible values: ${Object.values(Countries).join(' | ')})` })
  country?: Countries

  @IsOptional()
  @IsEnum(Langs, { message: `Invalid lang value. (possible values: ${Object.values(Langs).join(' | ')})`, each: true })
  langs: Langs[] = []

  @IsOptional()
  @IsEnum(Interests, { message: `Invalid interest value. (possible values: ${Object.values(Interests).join(' | ')})`, each: true })
  interests: Interests[] = []

  @IsOptional()
  @IsEnum(Skills, { message: `Invalid skill value. (possible values: ${Object.values(Skills).join(' | ')})`, each: true })
  skills: Skills[] = []
}
