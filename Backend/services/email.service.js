const nodemailer = require('nodemailer');
require('dotenv').config();
// Configura el transporter para enviar correos electrónicos
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Elige el proveedor de correo que deseas utilizar
  auth: {
    user:  process.env.CORREO, // Tu dirección de correo electrónico
    pass: process.env.CONTRASENA // Tu contraseña de correo electrónico
  }
});

// Función para enviar un correo electrónico
function enviarCorreo( correo, asunto, contenido) {
  const mailOptions = {
    to: process.env.PARA, // La dirección de correo del destinatario
    subject: asunto, // El asunto del correo
    text: correo + " | " + contenido // El contenido del correo en formato de texto plano
  };

  // Envía el correo electrónico utilizando el transporter
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Correo enviado: ' + info.response);
    }
  });
}

module.exports = {
  enviarCorreo
};