export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://127.0.0.1:27017/auth-api',
  port: process.env.PORT ?? 6060
}
