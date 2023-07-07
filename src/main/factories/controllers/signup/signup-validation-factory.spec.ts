import {
  ValidationComposite,
  CompareFieldsValidation,
  RequiredFieldValidation,
  EmailValidation
} from '../../../../presentation/helpers/validators'
import { makeSignUpValidation } from './signup-validation-factory'
import { type EmailValidator } from '../../../../presentation/protocols/email-validator'
import { type Validation } from '../../../../presentation/protocols/validation'

jest.mock('../../../../presentation/helpers/validators/validation-composite.ts')

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
