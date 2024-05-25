import 'dotenv/config'

const PORT = process.env.PORT || 8001
const SECRET_KEY = process.env.SECRET_KEY || ''
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'
const NODEMAILER_USER = process.env.NODEMAILER_USER || ''
const NODEMAILER_PASSWORD = process.env.NODEMAILER_PASSWORD || ''

export { PORT, SECRET_KEY, BASE_URL, NODEMAILER_PASSWORD, NODEMAILER_USER }
