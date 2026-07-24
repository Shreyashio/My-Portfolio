import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['rshreyash784@gmail.com'],
      replyTo: email,
      subject: `Portfolio Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f5f0e8; padding: 32px; border: 3px solid #111;">
          <h2 style="font-family: Arial Black, sans-serif; text-transform: uppercase; margin: 0 0 24px; font-size: 28px; color: #111; letter-spacing: 2px;">
            New Portfolio Message
          </h2>
          <div style="border-left: 4px solid #A90E02; padding-left: 16px; margin-bottom: 24px;">
            <p style="margin: 0 0 6px; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #888; font-weight: 700;">From</p>
            <p style="margin: 0; font-size: 16px; font-weight: 700; color: #111;">${name}</p>
            <p style="margin: 4px 0 0; color: #A90E02; font-weight: 600;">${email}</p>
          </div>
          <div style="border-left: 4px solid #111; padding-left: 16px;">
            <p style="margin: 0 0 6px; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #888; font-weight: 700;">Message</p>
            <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #222; white-space: pre-wrap;">${message}</p>
          </div>
          <hr style="margin: 32px 0; border: none; border-top: 2px solid #111;" />
          <p style="margin: 0; font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 2px;">Sent via shreyash portfolio · reply directly to this email</p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
