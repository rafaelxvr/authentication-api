import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers/http/http-helper'
import { type Middleware, type HttpRequest, type HttpResponse } from '../protocols'

export class AuthMiddleware implements Middleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = forbidden(new AccessDeniedError())

    return await Promise.resolve(error)
  }
}
