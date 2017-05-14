/**
 * Created by Jose Herrera on 14/05/2017.
 */

var mongoose = require('mongoose');

var auditoriaSchema = mongoose.Schema({
    codigo: Number,
    fecha: String,
    pagina_web: String,
    numero_registros: Number,
    estado: String,
    errores: Boolean
});

var Auditorias = mongoose.model('Auditorias',auditoriaSchema);
module.exports = Auditorias;
