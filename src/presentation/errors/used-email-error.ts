export class UsedEmailError extends Error {
  constructor () {
    super('The informed email is already in use')
    this.name = 'UsedEmailError'
  }
}
