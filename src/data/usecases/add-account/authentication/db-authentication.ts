import {
  type Authentication,
  type AuthenticationModel,
  type LoadAccountByEmailRepository,
  type HashComparer,
  type TokenGenerator,
  type UpdateAccessTokenRepository
} from './db-authentication-protocols'

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
