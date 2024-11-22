import nodemailer from 'nodemailer';

// Function to send email using Nodemailer
export async function sendEmail(to, subject, emailContent) {
  let sender = '1atultiwari062@gmail.com'

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: sender,
      pass: 'xtqd ggxa dybt fxhz' 
    }
  });

  try {
    await transporter.sendMail({
      from: sender,
      to: to,
      subject: subject,
      html: emailContent,
    });
    console.log(`Email sent to: ${to}`);
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
  }
};

