import { type LoadAccountByToken, type HttpRequest, type HttpResponse, type Middleware } from './auth-middlewares-protocols'
import { AccessDeniedError, UnauthorizedError } from '../errors'
import { forbidden, ok, serverError, badRequest } from '../helpers/http/http-helper'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      const apiKey = httpRequest.headers?.['x-api-key']

      if (!accessToken || (!apiKey && this.role === 'application')) {
        const error = forbidden(new AccessDeniedError())
        return await Promise.resolve(error)
      }

      if (accessToken && !apiKey) {
        const account = await this.loadAccountByToken.load(accessToken, this.role)

        if (!account) {
          const error = forbidden(new AccessDeniedError())
          return await Promise.resolve(error)
        }

        return ok({ accountId: account.id })
      }

      if ((apiKey && this.role === 'application') && !accessToken) {
        const account = await this.loadAccountByToken.load(apiKey, this.role)

        if (!account) {
          const error = forbidden(new AccessDeniedError())
          return await Promise.resolve(error)
        }

        return ok({ accountId: account.id })
      }

      return badRequest(new UnauthorizedError())
    } catch (error) {
      return serverError(error)
    }
  }
}
