import { AuthMiddleware } from '../../../presentation/middlewares/auth-middleware'
import { type Middleware } from '../../../presentation/protocols'
import { makeDbLoadAccountByToken } from './../usecases/account/load-account-by-token.ts/db-load-account-by-token-factory'

export const makeAuthMiddleware = (role?: string): Middleware => {
  const dbLoadAccountByToken = makeDbLoadAccountByToken()
  return new AuthMiddleware(dbLoadAccountByToken, role)
}
