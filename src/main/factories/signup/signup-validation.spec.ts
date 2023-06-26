import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'
import { makeSignUpValidation } from './signup-validation'
import { CompareFieldsValidation } from '../../../presentation/helpers/validators/compare-field-validation'
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation'
import { type EmailValidator } from '../../../presentation/protocols/email-validator'
import { EmailValidation } from '../../../presentation/helpers/validators/email-validation'
import { type Validation } from '../../../presentation/helpers/validators/validation'

jest.mock('../../../presentation/helpers/validators/validation-composite.ts')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []

    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    const emailValidatorStub = makeEmailValidator()
    validations.push(new EmailValidation('email', emailValidatorStub))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
