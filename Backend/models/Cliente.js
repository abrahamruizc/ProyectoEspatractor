const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cliente = new Schema({
    nombre: {
        type: String,
        required: true
    },
    telefono: {
        type: Number,
        required: true,
        unique: true
    },
    correo_electronico: {
        type: String,
        unique: true
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Cliente', cliente);