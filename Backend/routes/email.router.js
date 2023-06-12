const emailService = require('../services/email.service.js');
const { Router } = require('express');


const router = Router();

router.post('/enviar-correo', (req, res) => {
    const { correo, asunto, contenido } = req.body;
  
    if (
        correo.trim().length === 0 ||
        asunto.trim().length === 0 ||
        contenido.trim().length === 0
      ) {
        return res.status(401).send('No puedes dejar campos vacíos');
      }

    
    emailService.enviarCorreo( correo, asunto, contenido);
  
    res.status(200).json({ message: 'correo enviado correctamente' });
});


module.exports = router;