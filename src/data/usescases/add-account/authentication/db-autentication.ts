import { type Authentication, type AuthenticationModel } from '../../../../domain/usecases/authentication'
import { type HashComparer } from '../../../protocols/cryptography/hash-comparer'
import { type TokenGenerator } from '../../../protocols/cryptography/token-generator'
import { type LoadAccountByEmailRepository } from '../../../protocols/db/load-account-by-email-repository'
import { type UpdateAccessTokenRepository } from '../../../protocols/db/update-access-token-repository'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly hashComparer: HashComparer
  private readonly tokenGenerator: TokenGenerator
  private readonly updateAccessTokenRepository: UpdateAccessTokenRepository

  constructor (
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    hashComparer: HashComparer,
    tokenGenerator: TokenGenerator,
    updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashComparer
    this.tokenGenerator = tokenGenerator
    this.updateAccessTokenRepository = updateAccessTokenRepository
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const { email, password } = authentication

    const account = await this.loadAccountByEmailRepository.load(email)

    if (account) {
      const { id } = account
      const isValidPassword = await this.hashComparer.compare(password, account.password)

      if (isValidPassword) {
        const accessToken = await this.tokenGenerator.generate(id)
        await this.updateAccessTokenRepository.update(id, accessToken)
        return accessToken
      }
    }

    return null as any
  }
}
