import { DatesUtils } from '@/common/utils'
import { BadRequestException } from '@nestjs/common'
import { registerDecorator, ValidationOptions } from 'class-validator'

export function ParseStringDate(format = 'dd/MM/yyyy HH:mm', validationOptions?: ValidationOptions): (object: object, propertyName: string) => void {
  return function (object: object, propertyName: string) {
    let date: Date | null

    // set up data update
    const getter = (): Date => date as Date
    const setter = (newValue: string | Date | unknown): void => {
      let badValueType = false

      if (typeof newValue === 'string') date = DatesUtils.getUTCDateFromStr(newValue, format)
      else if (newValue instanceof Date) date = newValue
      else badValueType = true

      if (badValueType || !date) throw new BadRequestException(validationOptions?.message || 'Date invalide')
    }

    Object.defineProperty(object, propertyName, {
      get: getter,
      set: setter,
    })

    // register validator decorator to class-validator
    registerDecorator({
      name: 'ParseStringDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          setter(value)

          return !!date
        },
      },
    })
  }
}
