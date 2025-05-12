# EmailJS Setup for Contact Form

This document explains how to set up EmailJS for the Contact form in the FutureLift Job Portal.

## 1. Create an EmailJS Account

1. Go to [emailjs.com](https://www.emailjs.com/) and sign up for a free account.
2. After signing up, log in to your EmailJS dashboard.

## 2. Connect an Email Service

1. In your EmailJS dashboard, go to the "Email Services" section.
2. Click "Add New Service" and select your email provider (Gmail, Outlook, etc.).
3. Follow the instructions to connect your email service.
4. Once connected, note down the **Service ID** (it will look like `service_xxxxxxx`).

## 3. Create an Email Template

1. Go to the "Email Templates" section in your EmailJS dashboard.
2. Click "Create New Template".
3. Design your email template with the following template variables:
   - `{{from_name}}` - Sender's full name
   - `{{user_email}}` - Sender's email address
   - `{{phone_number}}` - Sender's phone number
   - `{{user_type}}` - Type of user (Job Seeker, Employer, etc.)
   - `{{message}}` - The message content
4. Save your template and note down the **Template ID** (it will look like `template_xxxxxxx`).

## 4. Get Your Public Key

1. Go to "Account" > "API Keys" in your EmailJS dashboard.
2. Copy your **Public Key**.

## 5. Update the ContactPage.js File

1. Open `frontend/src/pages/ContactPage.js`
2. Find these lines in the code:

```javascript
const serviceId = 'service_xxxxxxx'; // Replace with your actual service ID
const templateId = 'template_xxxxxxx'; // Replace with your actual template ID
const publicKey = 'XXXXXXXXXXXXXXXXXXXX'; // Replace with your actual public key
```

3. Replace them with your actual values:

```javascript
const serviceId = 'your_service_id'; // e.g., service_abc123
const templateId = 'your_template_id'; // e.g., template_xyz789
const publicKey = 'your_public_key'; // e.g., a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6
```

## 6. Test Your Form

1. Run your application and navigate to the Contact page.
2. Fill out the form and submit it.
3. Check that you receive the email at your connected email address.

## Troubleshooting

- If emails are not being sent, check your EmailJS dashboard for any error messages.
- Verify that your service is connected properly.
- Make sure your template variables match the field names in the form.
- Check if you've reached the free plan limits (200 emails per month).

## Additional Resources

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [React Integration Guide](https://www.emailjs.com/docs/examples/reactjs/) 