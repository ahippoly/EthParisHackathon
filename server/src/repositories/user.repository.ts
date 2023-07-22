import { User } from '@Schemas/user'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import { AbstractBaseRepository } from '@/repositories/abstract.repository'
import { UserBlueprint } from '@Schemas/user/user.blueprint'
import { InstantiatingDataWrapper } from '@/common/classes'

@Injectable()
export class UserRepository extends AbstractBaseRepository<User, UserBlueprint> {
  public constructor(@InjectModel(User) model: ReturnModelType<typeof User>) {
    super(model, { targetClass: User, propertiesToOmit: ['_idMask', '_xmtpCryptedPrivateKey'] })
  }

  public async findByIdMask(idMask: string): Promise<User> {
    const data = this.model.findOne({ _idMask: idMask }).lean().exec() as Promise<User>

    return await InstantiatingDataWrapper.fromData<Promise<User>, User, TClassConstructor<User>, UserBlueprint>(data, {
      targetClass: User,
      propertiesToOmit: ['_idMask'],
    }).getOrThrow(new NotFoundException('User not found'))
  }

  public async findByXmtpAddress(address: string): Promise<User> {
    return await this.findBy({ _xmtpPublicAddress: address }).getOrThrow(new NotFoundException('User not found'))
  }

  public async findManyByXmtpAddress(addresses: string[]): Promise<User[]> {
    return await this.findMany({ _xmtpPublicAddress: { $in: addresses } }).getOrThrow(new NotFoundException('User not found'))
  }
}
