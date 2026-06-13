import { render } from '@react-email/components'
import nodemailer from 'nodemailer'
import { serverEnv } from '../env.server'
import EmailVerified from './email/email-verified'
import PasswordChanged from './email/password-changed'
import ResetPassword from './email/reset-password'
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

export const sendResetPassword = async ({
  to,
  name,
  resetPasswordUrl,
}: {
  to: string
  name: string
  resetPasswordUrl: string
}) => {
  const from = `${serverEnv.APP_NAME} <noreply@${new URL(serverEnv.APP_URL).hostname}>`
  const html = await render(
    <ResetPassword name={name} resetPasswordUrl={resetPasswordUrl} />,
  )
  return transport.sendMail({ to, subject: 'بازنشانی رمز عبور', from, html })
}

export const sendPasswordChanged = async ({
  to,
  name,
}: {
  to: string
  name: string
}) => {
  const from = `${serverEnv.APP_NAME} <noreply@${new URL(serverEnv.APP_URL).hostname}>`
  const contactUsUrl = new URL('/contact-us', serverEnv.APP_URL).toString()
  const html = await render(
    <PasswordChanged name={name} contactUsUrl={contactUsUrl} />,
  )
  return transport.sendMail({
    to,
    subject: 'رمز عبور شما تغییر یافت',
    from,
    html,
  })
}
