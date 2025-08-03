import DateHandler from '@shared/helpers/DateHandler';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsValidDateRangeConstraint implements ValidatorConstraintInterface {
  validate(value: string) {
    if (!value || typeof value !== 'string') return false;

    const parts = value.split(',');
    if (parts.length < 2) return false;
    const [startDate, endDate] = parts.map((date) => date.trim());

    return DateHandler.isValid(startDate) && DateHandler.isValid(endDate);
  }

  defaultMessage() {
    return 'Range de data invalido';
  }
}

export function IsValidDateRange(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsValidDateRange',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidDateRangeConstraint,
    });
  };
}
