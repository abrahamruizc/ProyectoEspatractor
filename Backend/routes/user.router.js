const { Router } = require('express');
const router = Router();
const SECRET_KEY = "sjsg26425hfj246245htm";
var bcrypt = require('bcryptjs');
const User = require('../models/User');

const jwt = require('jsonwebtoken');


router.post('/crearAdministrativo', async (req, res) => {
    const { nombre_usuario, rol, nombre, apellido1, apellido2, contrasena} = req.body;
    const newUser = new User({nombre_usuario, rol, nombre, apellido1, apellido2, contrasena});
    console.log(newUser);
    const user = await User.findOne({nombre_usuario});
    if(user) return res.status(401).send('El nombre de usuario Ya esta Cogido');
    if(newUser.nombre_usuario.trim().length === 0 || 
        newUser.nombre.trim().length === 0 || 
        newUser.apellido1.trim().length === 0 || 
        newUser.contrasena.trim().length === 0) return res.status(401).send('no puedes dejar campos vacios');
    await newUser.save();

    const token = jwt.sign({_id: newUser._id }, SECRET_KEY);
    res.status(200).json({token});
});

router.post('/crearMecanico', async (req, res) => {
    const { nombre_usuario, rol, nombre, apellido1, apellido2, contrasena, DNI} = req.body;
    const newUser = new User({nombre_usuario, rol, nombre, apellido1, apellido2, contrasena, DNI});
    console.log(newUser);
    const user = await User.findOne({nombre_usuario});
    if(user) return res.status(401).send('El nombre de usuario Ya esta Cogido');
    if(newUser.nombre_usuario.trim().length === 0 || 
        newUser.nombre.trim().length === 0 || 
        newUser.apellido1.trim().length === 0 || 
        newUser.contrasena.trim().length === 0 ||
        newUser.DNI.trim().length === 0 ) return res.status(401).send('no puedes dejar campos vacios');
    await newUser.save();

    const token = jwt.sign({_id: newUser._id }, SECRET_KEY);
    res.status(200).json({token});
});


router.post('/login', async (req, res) => {

    const { nombre_usuario, contrasena } = req.body;
    const user = await User.findOne({nombre_usuario});
    
    if (!user) return res.status(401).send('El usuario no existe');
    let compare = bcrypt.compareSync(contrasena, user.contrasena);
    if(!compare) return res.status(401).send('la contraseña no coincide');
    
    console.log(contrasena); //real
    console.log(user.contrasena); //codificada de la bd

	const token = jwt.sign({_id: user._id}, SECRET_KEY);

    return res.status(200).json({token});
});

router.get('/tasks', (req, res) => {
    res.json([
        {
            _id: '1',
            name: "task one",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
        {
            _id: '2',
            name: "task two",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
        {
            _id: '3',
            name: "task three",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
    ])
});

router.get('/private-tasks', verifyToken, (req, res) => {
    res.json([
        {
            _id: '1',
            name: "task one",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
        {
            _id: '2',
            name: "task two",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
        {
            _id: '3',
            name: "task three",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
    ])
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
	} catch(e) {
		return res.status(401).send('Unauhtorized Request');
	}
}

module.exports = router;