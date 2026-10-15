import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import nodemailer from 'nodemailer'

const app = express()
const port = Number(process.env.PORT || 3001)
const allowedOrigins = (process.env.FRONTEND_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

const requiredConfig = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASSWORD', 'MAIL_TO', 'MAIL_FROM']
const missingConfig = requiredConfig.filter((key) => !process.env[key])
if (missingConfig.length > 0) {
  console.warn(`SMTP is not configured. Missing: ${missingConfig.join(', ')}`)
}

app.disable('x-powered-by')
app.use(helmet())
app.use(cors({ origin: allowedOrigins }))
app.use(express.json({ limit: '20kb' }))

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'Too many enquiries. Please try again later.' },
})

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE).toLowerCase() === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

const clean = (value, maxLength) => String(value || '').trim().slice(0, maxLength)
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

app.get('/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.post('/api/contact', contactLimiter, async (request, response) => {
  const { name, email, company, message, website } = request.body || {}

  if (website) {
    return response.status(200).json({ message: 'Enquiry received.' })
  }

  const contact = {
    name: clean(name, 100),
    email: clean(email, 160),
    company: clean(company, 120),
    message: clean(message, 4000),
  }

  if (!contact.name || !emailPattern.test(contact.email) || !contact.message) {
    return response.status(400).json({ error: 'Please provide a name, valid email, and project details.' })
  }

  if (missingConfig.length > 0) {
    return response.status(503).json({ error: 'The contact service is not configured yet.' })
  }

  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      replyTo: contact.email,
      subject: `New Baltic Tech enquiry from ${contact.name}`,
      text: [
        `Name: ${contact.name}`,
        `Email: ${contact.email}`,
        `Company: ${contact.company || 'Not provided'}`,
        '',
        'Project details:',
        contact.message,
      ].join('\n'),
    })

    return response.status(202).json({ message: 'Enquiry received.' })
  } catch (error) {
    console.error('Contact email failed:', error)
    return response.status(502).json({ error: 'Unable to send your enquiry right now.' })
  }
})

app.listen(port, () => {
  console.log(`Baltic Tech mail API listening on http://localhost:${port}`)
})
