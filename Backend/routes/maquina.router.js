const { Router } = require('express');
const router = Router();
const Maquina = require('../models/Maquina');
const Cliente = require('../models/Cliente');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "sjsg26425hfj246245htm";


router.post('/crearMaquina', verifyToken, async (req, res) => {
  try {
    const { referencia, horas_trabajo, kilometros, marca, modelo, ano_matriculacion, tipo, clienteId } = req.body;

    let maquina = await Maquina.findOne({ referencia });

    if (maquina) {
      if (horas_trabajo) maquina.horas_trabajo = horas_trabajo;
      if (kilometros) maquina.kilometros = kilometros;
      if (marca) maquina.marca = marca;
      if (modelo) maquina.modelo = modelo;
      if (ano_matriculacion) maquina.ano_matriculacion = ano_matriculacion;
      if (tipo) maquina.tipo = tipo;
      if (clienteId) maquina.id_cliente = clienteId;
    } else {
      const cliente = await Cliente.findById(clienteId);
      if (!cliente) {
        return res.status(404).json({ message: 'No se encontró ningún cliente con ese ID' });
      }
      maquina = new Maquina({ referencia, horas_trabajo, kilometros, marca, modelo, ano_matriculacion, tipo, id_cliente: cliente._id });
    }

    await maquina.save();

    const token = jwt.sign({ _id: maquina._id }, SECRET_KEY);
    res.status(200).json({ token, maquina });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear o modificar la máquina' });
  }
});


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

