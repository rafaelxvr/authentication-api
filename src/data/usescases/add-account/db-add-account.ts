import { type AccountModel, type AddAccountModel, type AddAccount, type Encrypter, type AddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository
  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const { password } = accountData
    const hashedPassword = await this.encrypter.encrypt(password)
    const account = await this.addAccountRepository.add(Object.assign({}, accountData, {
      password: hashedPassword
    }))

    return account
  }
}