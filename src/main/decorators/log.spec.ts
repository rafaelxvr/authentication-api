import { type HttpRequest, type Controller, type HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: {
          id: 'valid_id',
          name: 'any_mail@mail.com',
          email: 'any_name',
          password: 'any_password',
          passwordConfirmation: 'any_password'
        }
      }
      return await new Promise(resolve => {
        resolve(httpResponse)
      })
    }
  }

  return new ControllerStub()
}

interface sutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
}

const makeSut = (): sutTypes => {
  const controllerStub = makeController()
  const sut = new LogControllerDecorator(controllerStub)
  return {
    sut,
    controllerStub
  }
}

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const httpRequest: HttpRequest = {
      body: {
        name: 'any_mail@mail.com',
        email: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        name: 'any_mail@mail.com',
        email: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse: HttpResponse = {
      statusCode: 200,
      body: {
        id: 'valid_id',
        name: 'any_mail@mail.com',
        email: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(httpResponse)
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        name: 'any_mail@mail.com',
        email: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)
  })
})
