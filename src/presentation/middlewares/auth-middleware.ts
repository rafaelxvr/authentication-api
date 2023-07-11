import { type LoadAccountByToken } from '../../domain/usecases/load-account-by-token'
import { AccessDeniedError } from '../errors'
import { forbidden, ok } from '../helpers/http/http-helper'
import { type Middleware, type HttpRequest, type HttpResponse } from '../protocols'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']

    if (!accessToken) {
      const error = forbidden(new AccessDeniedError())
      return await Promise.resolve(error)
    }

    const account = await this.loadAccountByToken.load(accessToken)

    if (!account) {
      const error = forbidden(new AccessDeniedError())
      return await Promise.resolve(error)
    }

    return ok({ accountId: account.id })
  }
}
