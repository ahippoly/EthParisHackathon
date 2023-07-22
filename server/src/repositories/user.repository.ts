import { User } from '@Schemas/user'
import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import { InstantiatingDataWrapper } from '@Common/classes'
import { AbstractSoftDeletableRepository } from '@/repositories/abstract.repository'
import { UserBlueprint } from '@Schemas/user/user.blueprint'

@Injectable()
export class UserRepository extends AbstractSoftDeletableRepository<User, UserBlueprint> {
  public constructor(@InjectModel(User) model: ReturnModelType<typeof User>) {
    super(model, User)
  }

  public findWithHashedPasswordByEmail(email: string): InstantiatingDataWrapper<Promise<User>, User> {
    const data = this.model
      .findOne({ _email: email, ...AbstractSoftDeletableRepository.ACTIVE_FILTER })
      .collation({ locale: 'fr', strength: 2 })
      .lean()
      .exec()

    return InstantiatingDataWrapper.fromData(data, { targetClass: User })
  }
}
