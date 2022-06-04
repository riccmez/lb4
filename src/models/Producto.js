var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProductoSchema = new Schema({
    codigo: {type: Number, required: true},
    descripcion: {type: String, required: true, max: 20},
    precio: {type: String, required: true},
    stock: {type: String, required: true},
    marca: {type: String, required: true},
    categoria: {type: String, required: true, max:20},
    created_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Producto', ProductoSchema);