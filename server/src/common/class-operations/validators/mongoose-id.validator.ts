import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import * as mongoose from 'mongoose'

@ValidatorConstraint({ async: false })
export class IsMongooseIdConstraint implements ValidatorConstraintInterface {
  validate(id: string): boolean {
    return mongoose.Types.ObjectId.isValid(id)
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} est/contient une valeur invalide pour un id`
  }
}

export function IsMongooseId(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsMongooseIdConstraint,
    })
  }
}
