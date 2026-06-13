export const genericErrorMessage = 'خطایی رخ داده است. دوباره تلاش کنید.'

export const betterAuthErrorMessageMapping: Record<string, string> = {
  INVALID_EMAIL_OR_PASSWORD: 'ایمیل کاربری یا رمز عبور اشتباه است.',
  EMAIL_NOT_VERIFIED: 'ایمیل کاربری شما هنوز تایید نشده است.',
  INVALID_TOKEN:
    'لینک معتبر نبوده یا منقضی شده است. مجددا درخواست لینک نمایید.',
  USERNAME_IS_ALREADY_TAKEN: 'نام کاربری مورد نظر قبلا استفاده شده است.',
}

export const rateLimitErrorMessage = (seconds: number) =>
  `تعداد دفعات تلاش بیش از حد مجاز است. لطفا پس از ${seconds} ثانیه مجددا تلاش کنید.`
