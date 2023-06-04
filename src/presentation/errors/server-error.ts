export class ServerError extends Error {
  constructor () {
    super('Ocorreu um erro inesperado, tente novamente mais tarde.')
    this.name = 'ServeError'
  }
}
