import { type AccountModel, type AddAccountModel, type AddAccount, type Encrypter } from './db.-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    const { password } = account
    const encryptedPassword = await this.encrypter.encrypt(password)

    return await new Promise(resolve => {
      resolve({
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email',
        password: encryptedPassword
      })
    })
  }
}
