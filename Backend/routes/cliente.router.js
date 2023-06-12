const { Router } = require('express');
const router = Router();
const Cliente = require('../models/Cliente');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "sjsg26425hfj246245htm";

router.post('/crearCliente', verifyToken, async (req, res) => {
  try {
    const { nombre, telefono, correo_electronico } = req.body;

    let clienteExistente = await Cliente.findOne({ telefono });

    if (clienteExistente) {
      clienteExistente.nombre = nombre;
      clienteExistente.correo_electronico = correo_electronico;
      await clienteExistente.save();

      const token = jwt.sign({ _id: clienteExistente._id }, SECRET_KEY);
      return res.status(200).json({ token, cliente: clienteExistente });
    }

    clienteExistente = await Cliente.findOne({ correo_electronico });

    if (clienteExistente) {
      clienteExistente.nombre = nombre;
      clienteExistente.telefono = telefono;
      await clienteExistente.save();

      const token = jwt.sign({ _id: clienteExistente._id }, SECRET_KEY);
      return res.status(200).json({ token, cliente: clienteExistente });
    }

    const nuevoCliente = new Cliente({ nombre, telefono, correo_electronico });
    await nuevoCliente.save();

    const token = jwt.sign({ _id: nuevoCliente._id }, SECRET_KEY);
    res.status(200).json({ token, cliente: nuevoCliente });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear/modificar el cliente' });
  }
});

// router.get('/buscarCliente/:telefono', verifyToken, async (req, res) => {
//   try {
//     const telefono = req.params.telefono;

//     const cliente = await Cliente.findOne({ telefono });
//     if (!cliente) {
//       return res.status(404).json({ message: 'No se encontró ningún cliente con ese número de teléfono' });
//     }

//     res.status(200).json({ clienteId: cliente._id });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error al buscar el cliente' });
//   }
// });

async function verifyToken(req, res, next) {
    try {
        if (!req.headers.authorization) {
            return res.status(401).send('Unauhtorized Request');
        }
        let token = req.headers.authorization.split(' ')[1];
        console.log(token);
        if (token === 'null') {
            return res.status(401).send('Unauhtorized Request');
        }

        const payload = await jwt.verify(token, SECRET_KEY);
        if (!payload) {
            return res.status(401).send('Unauhtorized Request');
        }
        req.userId = payload._id;
        console.log(payload);
        next();
    } catch (e) {
        return res.status(401).send('Unauhtorized Request');
    }
}

module.exports = router;

