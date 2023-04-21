const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcryptjs')
var SALT_WORK_FACTOR = 10;

const user = new Schema({
    nombre_usuario: {
        type: String,
        index: {
            unique: true
        }
    },
    rol: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido1: {
        type: String,
        required: true
    },
    apellido2: {
        type: String,
        required: true
    },
    contrasena: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

user.pre('save',function(next){
    var usuario = this;
    // solo aplica una función hash al password si ha sido modificado (o es nuevo)
    if (!usuario.isModified('contrasena')) return next();
    // genera la salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        // aplica una función hash al password usando la nueva salt
        bcrypt.hash(usuario.contrasena, salt, function(err, hash) {
            if (err) return next(err);
            // sobrescribe el password escrito con el “hasheado”
            usuario.contrasena = hash;
            next();
        });
    });
});


module.exports = mongoose.model('User', user);