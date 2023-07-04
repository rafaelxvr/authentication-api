import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { hash } from 'bcrypt'
import { type Collection } from 'mongodb'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? '')
  })

  afterAll(() => {
    void MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'valid_name',
          email: 'valid_mail@mail.com',
          password: 'valid_password',
          passwordConfirmation: 'valid_password'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('valid_password', 12)
      await accountCollection.insertOne({
        name: 'valid_name',
        email: 'valid_mail@mail.com',
        password
      })

      await request(app)
        .post('/api/login')
        .send({
          email: 'valid_mail@mail.com',
          password: 'valid_password'
        })
        .expect(200)
    })

    test('Should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'invalid_mail@mail.com',
          password: 'invalid_password'
        })
        .expect(401)
    })
  })
})
