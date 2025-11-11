import { Resend } from 'resend'

let resendInstance: Resend | null = null

const getResend = () => {
  if (!resendInstance && process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'your-key-here') {
    resendInstance = new Resend(process.env.RESEND_API_KEY)
  }
  return resendInstance
}

const isConfigured = () => {
  return !!process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'your-key-here'
}

/**
 * Send magic link for email authentication
 */
export async function sendVerificationRequest({
  identifier: email,
  url,
}: {
  identifier: string
  url: string
}) {
  if (!isConfigured()) {
    console.warn('Resend not configured, skipping email send')
    return
  }

  try {
    const resend = getResend()
    if (!resend) {
      throw new Error('Resend not configured')
    }

    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'DecalForge <onboarding@resend.dev>',
      to: email,
      subject: 'Sign in to DecalForge',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
              .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
              .button {
                display: inline-block;
                padding: 12px 24px;
                background: #000;
                color: #fff;
                text-decoration: none;
                border-radius: 8px;
                margin: 20px 0;
              }
              .footer { color: #666; font-size: 12px; margin-top: 40px; }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>Sign in to DecalForge</h2>
              <p>Click the button below to sign in to your account:</p>
              <a href="${url}" class="button">Sign In</a>
              <p class="footer">
                This link expires in 24 hours and can only be used once.<br>
                If you didn't request this, you can safely ignore this email.
              </p>
            </div>
          </body>
        </html>
      `,
    })
  } catch (error) {
    console.error('Failed to send verification email:', error)
    throw error
  }
}

/**
 * Send license purchase confirmation with download link
 */
export async function sendLicenseEmail({
  to,
  designTitle,
  downloadKey,
  licenseType,
}: {
  to: string
  designTitle: string
  downloadKey: string
  licenseType: string
}) {
  if (!isConfigured()) {
    console.warn('Resend not configured, skipping email send')
    return
  }

  const downloadUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/download/${downloadKey}`

  try {
    const resend = getResend()
    if (!resend) {
      throw new Error('Resend not configured')
    }

    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'DecalForge <onboarding@resend.dev>',
      to,
      subject: `Your DecalForge Design: ${designTitle}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
              .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
              .button {
                display: inline-block;
                padding: 12px 24px;
                background: #000;
                color: #fff;
                text-decoration: none;
                border-radius: 8px;
                margin: 20px 0;
              }
              .details { background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .footer { color: #666; font-size: 12px; margin-top: 40px; }
              ul { line-height: 1.8; }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>Thank you for your purchase! 🎉</h2>
              <p>Your design "<strong>${designTitle}</strong>" is ready to download.</p>

              <a href="${downloadUrl}" class="button">Download Files</a>

              <div class="details">
                <h3>License Type: ${licenseType}</h3>
                <h4>What's included:</h4>
                <ul>
                  <li>High-resolution PNG (300 DPI)</li>
                  <li>SVG cutline for die-cutting</li>
                  <li>White halo for print perfection</li>
                  <li>${licenseType} commercial license</li>
                </ul>
              </div>

              <p><strong>Your download link:</strong><br>
              <a href="${downloadUrl}">${downloadUrl}</a></p>

              <p class="footer">
                This link will work indefinitely. Save this email for future reference.<br>
                Need help? Reply to this email or visit our documentation.
              </p>
            </div>
          </body>
        </html>
      `,
    })
  } catch (error) {
    console.error('Failed to send license email:', error)
    throw error
  }
}

/**
 * Send welcome email for new users
 */
export async function sendWelcomeEmail({
  to,
  name,
}: {
  to: string
  name?: string
}) {
  if (!isConfigured()) {
    console.warn('Resend not configured, skipping email send')
    return
  }

  try {
    const resend = getResend()
    if (!resend) {
      console.warn('Resend not configured, skipping welcome email')
      return
    }

    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'DecalForge <onboarding@resend.dev>',
      to,
      subject: 'Welcome to DecalForge!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
              .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
              .button {
                display: inline-block;
                padding: 12px 24px;
                background: #000;
                color: #fff;
                text-decoration: none;
                border-radius: 8px;
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>Welcome to DecalForge${name ? `, ${name}` : ''}! 👋</h2>
              <p>We're excited to have you. Start creating stunning AI-powered stickers in seconds.</p>

              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/generator" class="button">Create Your First Design</a>

              <h3>What you can do:</h3>
              <ul>
                <li>Generate unlimited AI sticker designs</li>
                <li>Get print-ready files (PNG + SVG)</li>
                <li>Browse the gallery for inspiration</li>
                <li>Purchase commercial licenses</li>
              </ul>

              <p>Questions? Check out our <a href="${process.env.NEXT_PUBLIC_SITE_URL}/docs">documentation</a> or reply to this email.</p>
            </div>
          </body>
        </html>
      `,
    })
  } catch (error) {
    console.error('Failed to send welcome email:', error)
    // Don't throw - welcome emails are non-critical
  }
}
