import { SignUpController } from '../../../../presentation/controllers/signup/signup-controller'
import { type Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbAddAccount } from '../../usecases/account/add-account/db-add-account-factory'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const validationComposite = makeSignUpValidation()
  const dbAuthentication = makeDbAuthentication()
  const dbAddAccount = makeDbAddAccount()
  const signUpController = new SignUpController(dbAddAccount, validationComposite, dbAuthentication)
  return makeLogControllerDecorator(signUpController)
}
