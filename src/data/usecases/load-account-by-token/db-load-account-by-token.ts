import { type LoadAccountByToken } from '../../../domain/usecases/load-account-by-token'
import { type AccountModel } from '../../../domain/models/account'
import { type Decrypter } from '../../protocols/cryptography/decrypter'
import { type LoadAccountByTokenRepository } from '../../protocols/db/account/load-account-by-token-repository'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (token: string, role?: string): Promise<AccountModel> {
    const decryptedToken = await this.decrypter.decrypt(token)

    if (!decryptedToken) {
      return null as any
    }

    const account = await this.loadAccountByTokenRepository.loadByToken(token, role)

    return account
  }
}
