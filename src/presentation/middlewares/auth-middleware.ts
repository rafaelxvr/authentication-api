import { type LoadAccountByToken, type HttpRequest, type HttpResponse, type Middleware } from './auth-middlewares-protocols'
import { AccessDeniedError } from '../errors'
import { forbidden, ok, serverError } from '../helpers/http/http-helper'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      const apiKey = httpRequest.headers?.['x-api-key']

      if (this.role === 'application' && !apiKey) {
        const error = forbidden(new AccessDeniedError())
        return await Promise.resolve(error)
      }

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
