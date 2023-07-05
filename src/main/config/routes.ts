import { type Express, Router } from 'express'
import { readdirSync } from 'fs'
import * as path from 'path'

const routesPath = path.join(__dirname, '..', 'routes')

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)

  readdirSync(routesPath).map(async file => {
    if (!file.includes('.test.') && !file.includes('.map')) {
      (await import(`${routesPath}/${file}`)).default(router)
    }
  })
}
