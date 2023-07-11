import { type LoadAccountByToken } from '../../domain/usecases/load-account-by-token'
import { AccessDeniedError } from '../errors'
import { forbidden, ok, serverError } from '../helpers/http/http-helper'
import { type Middleware, type HttpRequest, type HttpResponse } from '../protocols'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']

      if (!accessToken) {
        const error = forbidden(new AccessDeniedError())
        return await Promise.resolve(error)
      }

      const account = await this.loadAccountByToken.load(accessToken, this.role)

      if (!account) {
        const error = forbidden(new AccessDeniedError())
        return await Promise.resolve(error)
      }

      return ok({ accountId: account.id })
    } catch (error) {
      return serverError(error)
    }
  }
}
