import { VERIFY_EMAIL_EXPIRES_IN } from '#/const'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

export default function VerifyEmail({
  name,
  verifyUrl,
}: {
  name: string
  verifyUrl: string
}) {
  return (
    <Html dir="rtl" lang="fa-IR">
      <Tailwind>
        <Head>
          <style>{`
        @import url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css');
      `}</style>
        </Head>

        <Preview>تایید آدرس ایمیل</Preview>

        <Body
          className="bg-gray-100"
          style={{
            direction: 'rtl',
            fontFamily: 'Vazirmatn, Tahoma, sans-serif',
          }}
        >
          <Container className="mx-auto py-10 px-4 max-w-xl">
            <Section className="bg-white rounded-2xl shadow-sm p-8">
              <Heading className="text-2xl font-bold text-gray-900">
                سلام {name} 👋
              </Heading>

              <Text className="text-gray-600 leading-7">
                برای تایید ایمیل کاربری خود ، لطفا روی دکمه ی زیر کلیک کنید.
              </Text>

              <Section className="text-center">
                <Link
                  href={verifyUrl}
                  target="_blank"
                  className="bg-sky-600 text-white px-6 py-3 rounded-lg font-medium inline-block"
                >
                  تایید ایمیل
                </Link>
              </Section>

              <Text className="text-gray-500 text-sm leading-7">
                این لینک فقط تا{' '}
                <span className="font-semibold">
                  {VERIFY_EMAIL_EXPIRES_IN / 60}
                </span>{' '}
                دقیقه ی دیگر معتبر است.
              </Text>

              <Hr className="border-gray-200" />

              <Text className="text-gray-400 text-xs leading-6">
                اگر شما این درخواست را انجام نداده‌ اید ، این ایمیل را نادیده
                بگیرید.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
