import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

export default function EmailVerified({ name }: { name: string }) {
  return (
    <Html dir="rtl" lang="fa-IR">
      <Tailwind>
        <Head>
          <style>{`
        @import url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css');
      `}</style>
        </Head>

        <Preview>ایمیل شما تایید شد</Preview>

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
                ✅ آدرس ایمیل شما تایید شد.
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
