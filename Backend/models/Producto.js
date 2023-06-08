const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const producto = new Schema({
    nombre: {
        type: String,
        index: {
            unique: true
        }
    },
    descripcion: {
        type: String,
        required: true
    },
    rutaimg: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Producto', producto);