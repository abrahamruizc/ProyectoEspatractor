const { Router } = require('express');
const router = Router();
const SECRET_KEY = "sjsg26425hfj246245htm";
var bcrypt = require('bcryptjs');
const User = require('../models/User');

const jwt = require('jsonwebtoken');

router.put('/modificarUsuario/:nombre_usuario', verifyToken, async (req, res) => {
  try {
    const nombreUsuarioOriginal = req.params.nombre_usuario;
    const { nuevo_nombre_usuario, nombre, apellido1, apellido2, nueva_contrasena, dni } = req.body;

    const user = await User.findOne({ nombre_usuario: nombreUsuarioOriginal });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (nuevo_nombre_usuario) {
      const usuarioExistente = await User.findOne({ nombre_usuario: nuevo_nombre_usuario });

      if (usuarioExistente) {
        return res.status(401).json({ message: 'El nuevo nombre de usuario ya está en uso' });
      }

      user.nombre_usuario = nuevo_nombre_usuario;
    }

    if (nueva_contrasena) user.contrasena = nueva_contrasena;
    if (nombre) user.nombre = nombre;
    if (apellido1) user.apellido1 = apellido1;
    if (apellido2) user.apellido2 = apellido2;
    if (dni) user.DNI = dni;

    await user.save();

    return res.status(200).json({ message: 'Usuario modificado correctamente', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al modificar usuario' });
  }


});

router.post('/crearAdministrativo', verifyToken, async (req, res) => {

  try {

    const { nombre_usuario, rol, nombre, apellido1, apellido2, contrasena } = req.body;
    const newUser = new User({ nombre_usuario, rol, nombre, apellido1, apellido2, contrasena });
    console.log(newUser);
    const user = await User.findOne({ nombre_usuario });
    if (user) return res.status(401).send('El nombre de usuario Ya esta Cogido');
    if (newUser.nombre_usuario.trim().length === 0 ||
      newUser.nombre.trim().length === 0 ||
      newUser.apellido1.trim().length === 0 ||
      newUser.contrasena.trim().length === 0) return res.status(401).send('no puedes dejar campos vacios');
    await newUser.save();

    const token = jwt.sign({ _id: newUser._id }, SECRET_KEY);
    res.status(200).json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear administrativo' });
  }

});

router.post('/crearMecanico', verifyToken, async (req, res) => {

  try {

    const { nombre_usuario, rol, nombre, apellido1, apellido2, contrasena, DNI } = req.body;
    const newUser = new User({ nombre_usuario, rol, nombre, apellido1, apellido2, contrasena, DNI });
    console.log(newUser);
    const user = await User.findOne({ nombre_usuario });
    if (user) return res.status(401).send('El nombre de usuario Ya esta Cogido');
    if (newUser.nombre_usuario.trim().length === 0 ||
      newUser.nombre.trim().length === 0 ||
      newUser.apellido1.trim().length === 0 ||
      newUser.contrasena.trim().length === 0 ||
      newUser.DNI.trim().length === 0) return res.status(401).send('no puedes dejar campos vacios');
    await newUser.save();

    const token = jwt.sign({ _id: newUser._id }, SECRET_KEY);
    res.status(200).json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear mecanico' });
  }

});


router.post('/login', async (req, res) => {
  try {

    const { nombre_usuario, contrasena } = req.body;
    const user = await User.findOne({ nombre_usuario });

    if (!user) return res.status(401).send('El usuario no existe');
    let compare = bcrypt.compareSync(contrasena, user.contrasena);
    if (!compare) return res.status(401).send('la contraseña no coincide');

    console.log(contrasena); //real
    console.log(user.contrasena); //codificada de la bd

    const token = jwt.sign({ _id: user._id }, SECRET_KEY);

    return res.status(200).json({ token, rol: user.rol });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al hacer login' });
  }

});


router.get("/rol/:rol", verifyToken, async (req, res) => {
  try {

    const user = await User.find({ rol: req.params.rol });
    return res.status(200).json(user);
  } catch (error) {

    console.error(error);
    res.status(500).json({ message: 'Error al buscar un rol' });
  }

});

router.delete("/delete/:nombre_usuario", verifyToken, async (req, res) => {
  try {

    const nombre_usuario = req.params.nombre_usuario;
    const user = await User.findOneAndDelete({ nombre_usuario });
    if (user) return res.status(200).json('Se ha borrado el usuario correctamente');
    if (!user) res.status(404).json('No se ha encontrado el usuario a borrar');

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar un usuario' });
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