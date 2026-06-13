import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

export default function PasswordChanged({
  name,
  contactUsUrl,
}: {
  name: string
  contactUsUrl: string
}) {
  return (
    <Html dir="rtl" lang="fa-IR">
      <Tailwind>
        <Head>
          <style>{`
        @import url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css');
      `}</style>
        </Head>

        <Preview>رمز عبور شما تغییر یافت</Preview>

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
                ✅ رمز عبور شما با موفقیت تغییر یافت.
              </Text>

              <Text className="text-gray-600 leading-7">
                اگر شما این تغییر را انجام نداده اید ، فورا با{' '}
                <Link
                  href={contactUsUrl}
                  target="_blank"
                  className="text-sky-600 underline underline-offset-6"
                >
                  پشتیبانی
                </Link>{' '}
                تماس حاصل نمایید.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
