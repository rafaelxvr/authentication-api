import { forbidden } from '../helpers/http/http-helper'
import { AccessDeniedError } from '../errors'
import { AuthMiddleware } from './auth-middleware'
import { type LoadAccountByToken } from '../../domain/usecases/load-account-by-token'
import { type AccountModel } from '../../domain/models/account'
import { type Middleware } from '../protocols'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
})

class LoadAccountByTokenStub implements LoadAccountByToken {
  async load (accessToken: string, role?: string): Promise<AccountModel> {
    return await Promise.resolve(makeFakeAccount())
  }
}

interface SutTypes {
  sut: Middleware
  loadAccountByTokenStub: LoadAccountByToken
}

const makeSut = (): SutTypes => {
  const loadAccountByTokenStub = new LoadAccountByTokenStub()
  const sut = new AuthMiddleware(loadAccountByTokenStub)
  return {
    sut,
    loadAccountByTokenStub
  }
}

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    const httpRequest = {
      headers: {
        'x-access-token': 'any_token'
      }
    }

    await sut.handle(httpRequest)

    expect(loadSpy).toHaveBeenCalledWith(httpRequest.headers?.['x-access-token'])
  })
})
