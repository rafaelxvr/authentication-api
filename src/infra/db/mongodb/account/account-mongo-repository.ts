import { type AccountModel, type AddAccountModel, type AddAccountRepository } from '../../../../data/usecases/add-account/db-add-account-protocols'
import { MongoHelper } from '../helpers/mongo-helper'
import { type LoadAccountByEmailRepository } from '../../../../data/protocols/db/account/load-account-by-email-repository'
import { type UpdateAccessTokenRepository } from '../../../../data/protocols/db/account/update-access-token-repository'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.insertOne(accountData)

    return await MongoHelper.map<AccountModel>(accountData)
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const accountData = await accountCollection.findOne({ email })

    if (!accountData) {
      return null as any
    }

    const account = await MongoHelper.map<AccountModel>(accountData)

    return account
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      _id: MongoHelper.convertId(id)
    }, {
      $set: {
        accessToken: token
      }
    })
  }
}
