// ─────────────────────────────────────────────────────────────────────────────
// EmailJS Configuration
// 1. Sign up at https://www.emailjs.com (free tier allows 200 emails/month)
// 2. Add an Email Service → connect your Outlook account → copy the Service ID
// 3. Create an Email Template with these variables:
//      {{from_name}}, {{from_email}}, {{subject}}, {{message}}
//    Set the "To Email" field to f.morgan221@outlook.com → copy the Template ID
// 4. Go to Account → API Keys → copy your Public Key
// 5. Replace the placeholder strings below with your real values
// ─────────────────────────────────────────────────────────────────────────────

export const EMAILJS_CONFIG = {
  serviceId:  'YOUR_SERVICE_ID',   // e.g. 'service_abc123'
  templateId: 'YOUR_TEMPLATE_ID',  // e.g. 'template_xyz456'
  publicKey:  'YOUR_PUBLIC_KEY',   // e.g. 'AbCdEfGhIjKlMnOp'
};
