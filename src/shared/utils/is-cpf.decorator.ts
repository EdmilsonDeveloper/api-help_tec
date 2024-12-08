import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsCpfConstraint implements ValidatorConstraintInterface {
  validate(cpf: string): boolean {
    if (!cpf) return false;

    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]+/g, '');

    // Regras básicas do CPF
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    // Validação dos dígitos verificadores
    const validateDigit = (cpf: string, factor: number): boolean => {
      let sum = 0;
      for (let i = 0; i < factor - 1; i++) {
        sum += parseInt(cpf[i]) * (factor - i);
      }
      const remainder = (sum * 10) % 11;
      return remainder === parseInt(cpf[factor - 1]) || (remainder === 10 && parseInt(cpf[factor - 1]) === 0);
    };

    return validateDigit(cpf, 10) && validateDigit(cpf, 11);
  }

  defaultMessage(): string {
    return 'CPF inválido';
  }
}

// Decorator para usar em DTOs
export function IsCpf(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCpfConstraint,
    });
  };
}