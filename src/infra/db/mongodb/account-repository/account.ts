import { type AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { type AddAccountModel } from '../../../../domain/usecases/add-account'
import { type AccountModel } from '../../../../domain/models/account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const accountId = result.insertedId.id[0]

    return await new Promise(resolve => {
      resolve({
        id: accountId.toString(),
        name: accountData.name,
        email: accountData.email,
        password: accountData.password
      })
    })
  }
}
