import { Exclude, Transform } from 'class-transformer'
import { prop } from '@typegoose/typegoose'
import * as mongoose from 'mongoose'
import { objectIdToString } from '@Common/class-operations/transforms'

export abstract class DBDocument {
  @prop({ type: mongoose.Types.ObjectId })
  @Transform(objectIdToString)
  @Exclude()
  public readonly _id: mongoose.Types.ObjectId

  @Exclude()
  protected __v: number

  protected constructor() {
    this._id = new mongoose.Types.ObjectId()
  }

  get v(): number {
    return this.__v
  }
}

export abstract class TimestampedDBDocument extends DBDocument {
  @prop({ default: () => Date.now() }) @Exclude() protected createdAt!: Date

  @prop({ default: () => Date.now() }) @Exclude() protected updatedAt!: Date

  protected constructor() {
    super()
  }

  public getCreatedAt(): Date {
    return this.createdAt
  }

  public getUpdatedAt(): Date {
    return this.updatedAt
  }
}

export abstract class SoftDeletableDBDocument extends TimestampedDBDocument {
  @prop({ type: Date }) @Exclude() protected _deletedAt?: Date

  protected constructor() {
    super()
  }

  softDelete(): void {
    if (this._deletedAt) return
    this._deletedAt = new Date()
  }

  isSoftDeleted(): boolean {
    return !!this.deletedAt
  }

  get deletedAt(): Date | undefined {
    return this._deletedAt
  }
}

export abstract class TimestampedDBDocumentBlueprint extends TimestampedDBDocument {
  public createdAt!: Date
  public updatedAt!: Date
}

export abstract class SoftDeletableDBDocumentBlueprint extends SoftDeletableDBDocument {
  public _deletedAt!: Date
}
