import { MissingParamError } from '../../errors'
import { type Validation } from './validation'
import { ValidationComposite } from './validation-composite'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return new MissingParamError('field')
    }
  }

  return new ValidationStub()
}

interface SutTypes {
  sut: ValidationComposite
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new ValidationComposite([validationStub])
  return {
    validationStub,
    sut
  }
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_value' })

    expect(error).toEqual(new MissingParamError('field'))
  })
})
