import emailjs from '@emailjs/browser'

const emailConfiguration = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}

export const isEmailConfigured = Object.values(emailConfiguration).every(Boolean)

export async function sendConfirmationEmail({ toName, toEmail, subject, heading, message }) {
  if (!isEmailConfigured) {
    const error = new Error('EmailJS configuration is incomplete.')
    error.code = 'email/not-configured'
    throw error
  }

  return emailjs.send(
    emailConfiguration.serviceId,
    emailConfiguration.templateId,
    {
      to_name: toName,
      to_email: toEmail,
      subject,
      heading,
      message,
      app_name: 'GreenLink Melbourne',
    },
    { publicKey: emailConfiguration.publicKey },
  )
}
