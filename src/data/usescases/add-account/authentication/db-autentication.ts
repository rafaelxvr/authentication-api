import { type Authentication, type AuthenticationModel } from '../../../../domain/usecases/authentication'
import { type HashComparer } from '../../../protocols/cryptography/hash-comparer'
import { type TokenGenerator } from '../../../protocols/cryptography/token-generator'
import { type LoadAccountByEmailRepository } from '../../../protocols/db/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly hashComparer: HashComparer
  private readonly tokenGenerator: TokenGenerator

  constructor (
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    hashComparer: HashComparer,
    tokenGenerator: TokenGenerator
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashComparer
    this.tokenGenerator = tokenGenerator
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const { email, password } = authentication

    const account = await this.loadAccountByEmailRepository.load(email)
    if (account) {
      await this.hashComparer.compare(password, account.password)
      await this.tokenGenerator.generate(account.id)
    }

    return null as any
  }
}
