import { ServerError } from '../errors'
import { type HttpResponse } from '../protocols/http'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (error: any): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error)
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})
