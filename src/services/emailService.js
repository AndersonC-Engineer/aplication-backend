// src/services/emailService.js
// Servicio para el envío de correos con Nodemailer.
const nodemailer = require('nodemailer');
require('dotenv').config();

const {
  EMAIL_USER,
  EMAIL_PASS,
  EMAIL_FROM,
  APP_NAME,
  BASE_URL,
} = process.env;

const createTransporter = () => {
  if (!EMAIL_USER || !EMAIL_PASS) {
    throw new Error('EMAIL_USER y EMAIL_PASS deben estar configurados en .env');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
};

const buildPasswordResetHtml = ({ fullName, temporaryPassword, loginLink }) => {
  const appName = APP_NAME || 'Gestor de Canchas';
  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
      <h2 style="color: #2f5d8a;">Recuperación de contraseña - ${appName}</h2>
      <p>Hola ${fullName || 'usuario'},</p>
      <p>Hemos generado una contraseña temporal para tu cuenta. Por favor, usa esta contraseña para iniciar sesión y cámbiala de inmediato desde tu perfil.</p>
      <div style="background: #f5f7fb; padding: 16px; border-radius: 8px; margin: 16px 0;">
        <p style="margin: 0 0 8px; font-weight: bold;">Contraseña temporal:</p>
        <p style="margin: 0; font-size: 1.1rem; letter-spacing: 0.05em;">${temporaryPassword}</p>
      </div>
      <p>Después de iniciar sesión, te recomendamos cambiar esta contraseña temporal por una más personal y segura.</p>
      <p>
        <a href="${loginLink}" style="display: inline-block; padding: 12px 20px; background: #2f5d8a; color: #fff; text-decoration: none; border-radius: 6px;">Ir al login</a>
      </p>
      <p>Si no solicitaste este cambio, ignora este mensaje o contacta con el administrador.</p>
      <p>Saludos,<br/>El equipo de ${appName}</p>
    </div>
  `;
};

const sendPasswordResetEmail = async ({ to, fullName, temporaryPassword }) => {
  const transporter = createTransporter();
  const appName = APP_NAME || 'Gestor de Canchas';
  const loginLink = BASE_URL ? `${BASE_URL.replace(/\/$/, '')}/login` : 'http://localhost:3000/login';

  const mailOptions = {
    from: EMAIL_FROM || EMAIL_USER,
    to,
    subject: `Recuperación de contraseña - ${appName}`,
    html: buildPasswordResetHtml({ fullName, temporaryPassword, loginLink }),
    text: `Hola ${fullName || 'usuario'},\n\nHemos generado una contraseña temporal para tu cuenta. Usa esta contraseña para iniciar sesión: ${temporaryPassword}\n\nCambia esta contraseña después de iniciar sesión en ${loginLink}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info && info.messageId ? info.messageId : info);
  } catch (err) {
    console.error('Error sending password reset email:', err);
    throw err;
  }
};

module.exports = {
  sendPasswordResetEmail,
};
