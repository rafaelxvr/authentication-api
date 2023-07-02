import jwt from 'jsonwebtoken'
import { type Encrypter } from '../../../data/protocols/cryptography/encrypter'

export class JwtAdapter implements Encrypter {
  private readonly secret: string

  constructor (secret: string) {
    this.secret = secret
  }

  async encrypt (value: string): Promise<string> {
    jwt.sign({ id: value }, this.secret)

    return null as any
  }
}
