import { ArrayMinSize, IsNotEmpty } from 'class-validator'

export class XmtpAddressesRequest {
  @IsNotEmpty({ message: 'You must provide at least 1 xmtp address' })
  @ArrayMinSize(1, { message: 'You must provide at least 1 xmtp address' })
  addresses: string[]
}
