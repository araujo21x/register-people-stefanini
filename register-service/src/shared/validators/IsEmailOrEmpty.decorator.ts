import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsEmailOrEmpty(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isEmailOrEmpty',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (value === '') return true;
          return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        defaultMessage() {
          return 'O campo de e-mail deve ser um e-mail ou campos vazio.';
        },
      },
    });
  };
}
