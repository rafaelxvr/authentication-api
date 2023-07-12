import {
  type Authentication,
  type AuthenticationModel,
  type LoadAccountByEmailRepository,
  type HashComparer,
  type Encrypter,
  type UpdateAccessTokenRepository
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) { }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const { email, password } = authentication

    const account = await this.loadAccountByEmailRepository.loadByEmail(email)

    if (account) {
      const { id } = account
      const isValidPassword = await this.hashComparer.compare(password, account.password)

      if (isValidPassword) {
        const accessToken = await this.encrypter.encrypt(id)
        await this.updateAccessTokenRepository.updateAccessToken(id, accessToken)
        return accessToken
      }
    }

    return null as any
  }
}
