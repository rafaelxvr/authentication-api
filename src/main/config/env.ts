export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://mongo:27017/auth-api',
  mongoDbName: process.env.MONGO_DB_NAME ?? 'auth-api',
  port: process.env.PORT ?? 6060,
  jwtSecret: process.env.JWT_SECRET ?? '4UT#4P1'
}
