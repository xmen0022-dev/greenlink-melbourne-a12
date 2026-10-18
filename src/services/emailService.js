import emailjs from '@emailjs/browser'

// EmailJS client identifiers are supplied by Vite environment variables so the
// same build can use different email services in development and production.
const emailConfiguration = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}

export const isEmailConfigured = Object.values(emailConfiguration).every(Boolean)

export async function sendConfirmationEmail({ toName, toEmail, subject, heading, message }) {
  // Report missing setup explicitly before attempting a network request.
  if (!isEmailConfigured) {
    const error = new Error('EmailJS configuration is incomplete.')
    error.code = 'email/not-configured'
    throw error
  }

  return emailjs.send(
    emailConfiguration.serviceId,
    emailConfiguration.templateId,
    {
      // These names must match the variables configured in the EmailJS template.
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
