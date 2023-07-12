import { MongoHelper as sut } from './mongo-helper'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    const mongoDbName = process.env.MONGO_DB_NAME ?? ''
    const mongoUri = process.env.MONGO_URL ?? ''
    await sut.connect(mongoDbName, mongoUri)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb is down', async () => {
    let accountCollection = sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
    await sut.disconnect()
    accountCollection = sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
})
