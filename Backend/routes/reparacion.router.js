const { Router } = require('express');
const router = Router();
const Maquina = require('../models/Maquina');
const Reparacion = require('../models/Reparacion');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "sjsg26425hfj246245htm";


router.get('/reparaciones', verifyToken, async (req, res) => {
    try {
        const reparaciones = await Reparacion.find()
            .populate('id_maquina')
            .populate({ path: 'id_maquina', populate: { path: 'id_cliente' } });
        res.json(reparaciones);
    } catch (error) {
        console.error('Error al obtener las reparaciones', error);
        res.status(500).json({ message: 'Error al obtener las reparaciones' });
    }
});

router.post('/crearReparacion', verifyToken, async (req, res) => {
    try {
        const { id_maquina, h_mano_de_obra, fecha_reparacion, precio_piezas, descripcion_reparacion, total } = req.body;

        // Obtener el id del usuario desde la respuesta de otra petición
        const id_usuario = req.userId;

        // Verificar si la máquina existe
        const maquina = await Maquina.findById(id_maquina);
        if (!maquina) {
            return res.status(404).json({ message: 'La máquina no existe' });
        }

        // Crear la nueva reparación
        const reparacion = new Reparacion({
            id_usuario,
            id_maquina,
            h_mano_de_obra,
            fecha_reparacion,
            precio_piezas,
            descripcion_reparacion,
            total
        });

        await reparacion.save();

        res.status(200).json({ reparacion });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la reparación' });
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