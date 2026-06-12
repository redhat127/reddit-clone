import { render } from '@react-email/components'
import nodemailer from 'nodemailer'
import { serverEnv } from '../env.server'
import EmailVerified from './email/email-verified'
import VerifyEmail from './email/verify-email'

const transport = nodemailer.createTransport({
  host: serverEnv.SMTP_HOST,
  port: serverEnv.SMTP_PORT,
  secure: serverEnv.SMTP_PORT === 465,
  ...(serverEnv.SMTP_USER &&
    serverEnv.SMTP_PASS && {
      auth: {
        user: serverEnv.SMTP_USER,
        pass: serverEnv.SMTP_PASS,
      },
    }),
})

export const sendVerifyEmail = async ({
  to,
  name,
  verifyUrl,
}: {
  to: string
  name: string
  verifyUrl: string
}) => {
  const from = `${serverEnv.APP_NAME} <noreply@${new URL(serverEnv.APP_URL).hostname}>`
  const html = await render(<VerifyEmail name={name} verifyUrl={verifyUrl} />)
  return transport.sendMail({ to, subject: 'تایید آدرس ایمیل', from, html })
}

export const sendEmailVerified = async ({
  to,
  name,
}: {
  to: string
  name: string
}) => {
  const from = `${serverEnv.APP_NAME} <noreply@${new URL(serverEnv.APP_URL).hostname}>`
  const html = await render(<EmailVerified name={name} />)
  return transport.sendMail({ to, subject: 'ایمیل شما تایید شد', from, html })
}
