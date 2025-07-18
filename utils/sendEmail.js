import nodemailer from 'nodemailer';

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
        host: 'smtp.example.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        }
  }); 

  await transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: subject,
        text: text,
    });
  }
  catch (error) {
    console.log(error);
  }
}

export default sendEmail;
