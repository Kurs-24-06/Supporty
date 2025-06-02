import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.strato.de',
    port: 587, //maybe 465 and TSL
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Kontaktformular" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: 'Neue Nachricht vom Kontaktformular',
      text: `Name: ${name}\nEmail: ${email}\n\nNachricht:\n${message}`,
    });

    res.status(200).json({ message: 'E-Mail erfolgreich gesendet' });
  } catch (error) {
    console.error('SendMail error:', error);
    res.status(500).json({ error: 'Fehler beim Senden der E-Mail' });
  }
}
