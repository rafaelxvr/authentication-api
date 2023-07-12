import { type Decrypter } from '../../protocols/cryptography/decrypter'
import { DbLoadAccountByToken } from './db-load-account-by-token.'

describe('DbLoadAccountByToken Usecase', () => {
  test('Should call Decrypter with correct values', async () => {
    class DecrypterStub implements Decrypter {
      async decrypt (id: string): Promise<string> {
        return await Promise.resolve('any_value')
      }
    }

    const decrypterStub = new DecrypterStub()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    const sut = new DbLoadAccountByToken(decrypterStub)
    await sut.load('any_token')

    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })
})
