import { type AccountModel, type AddAccountModel, type AddAccount, type Hasher, type AddAccountRepository, type LoadAccountByEmailRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const { email, password } = accountData

    await this.loadAccountByEmailRepository.loadByEmail(email)

    const hashedPassword = await this.hasher.hash(password)
    const account = await this.addAccountRepository.add(Object.assign({}, accountData, {
      password: hashedPassword
    }))

    return account
  }
}
