import { type AccountModel, type AddAccountModel, type AddAccount, type Hasher, type AddAccountRepository, type LoadAccountByEmailRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const { email, password } = accountData

    const account = await this.loadAccountByEmailRepository.loadByEmail(email)

    if (account) {
      return null as any
    }

    const hashedPassword = await this.hasher.hash(password)
    const newAccount = await this.addAccountRepository.add(Object.assign({}, accountData, {
      password: hashedPassword
    }))

    return newAccount
  }
}
