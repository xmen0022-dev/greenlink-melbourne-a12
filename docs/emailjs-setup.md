# EmailJS setup

GreenLink sends confirmation emails after an authenticated user registers for an
event or submits a volunteer interest. Firestore remains the source of truth: a
temporary email delivery failure does not discard a successful registration.

## EmailJS configuration

1. Create an EmailJS account and connect an email service.
2. Create one email template with these fields:
   - To Email: `{{to_email}}`
   - Subject: `{{subject}}`
   - Reply To: leave blank or use a monitored GreenLink address
3. Use this plain-text template body:

   ```text
   Hello {{to_name}},

   {{heading}}

   {{message}}

   Regards,
   {{app_name}}
   ```

4. Copy the Service ID, Template ID, and Public Key into `.env.local`:

   ```text
   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
   ```

5. In EmailJS security settings, restrict requests to the local development URL
   and the final Firebase Hosting domain.
6. Restart the Vite development server after changing environment variables.

Template variables use escaped double braces. Do not change the message field to
triple braces because user-submitted content must not be interpreted as HTML.
