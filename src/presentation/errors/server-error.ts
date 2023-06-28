export class ServerError extends Error {
  constructor (error: any) {
    super('Ocorreu um erro inesperado, tente novamente mais tarde.')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}
