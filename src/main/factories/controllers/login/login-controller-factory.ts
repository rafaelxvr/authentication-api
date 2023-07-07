import { LoginController } from '../../../../presentation/controllers/login/login-controller'
import { type Controller } from '../../../../presentation/protocols'
import { makeLoginValidation } from './login-validation-factory'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'

export const makeLoginController = (): Controller => {
  const dbAuthentication = makeDbAuthentication()
  const loginValidation = makeLoginValidation()
  const loginController = new LoginController(dbAuthentication, loginValidation)
  return makeLogControllerDecorator(loginController)
}
