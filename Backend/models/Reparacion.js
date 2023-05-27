const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reparacion = new Schema({
    n_reparacion: {
        type: Number,
        default: 0,
        unique: true
    },
    id_usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    id_maquina: {
        type: Schema.Types.ObjectId,
        ref: 'Maquina'
    },
    id_factura: {
        type: Schema.Types.ObjectId,
        ref: 'Factura'
    },
    h_mano_de_obra: {
        type: Number
    },
    fecha_reparacion: {
        type: Date
    },
    precio_piezas: {
        type: Number
    },
    descripcion_reparacion: {
        type: String
    },
    total: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

reparacion.pre('save', async function (next) {
    if (this.isNew) {
        try {
            const lastReparacion = await mongoose.model('Reparacion').findOne({}, {}, { sort: { n_reparacion: -1 } });
            const lastNumber = lastReparacion ? lastReparacion.n_reparacion : 0;
            this.n_reparacion = lastNumber + 1;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});


module.exports = mongoose.model('Reparacion', reparacion);