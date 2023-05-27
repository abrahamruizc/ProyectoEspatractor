const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const maquina = new Schema({
    referencia: {
        type: String,
        index: {
            unique: true
        }
    },
    horas_trabajo: {
        type: Number
    },
    kilometros: {
        type: Number
    },
    marca: {
        type: String
    },
    modelo: {
        type: String,
        required: true
    },
    ano_matriculacion: {
        type: Date
    },
    tipo: {
        type: String
    },
    id_cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Maquina', maquina);