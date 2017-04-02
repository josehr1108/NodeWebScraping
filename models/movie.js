/**
 * Created by Jose Herrera on 01/04/2017.
 */

var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
    imagen: String,
    rating: String,
    titulo: String,
    duracionMinutos: Number,
    ano: Number,
    fechaLanzamiento: String,
    pais: String,
    idiomas: String,
    calidad: String,
    director: String,
    guion: String,
    premios: String,
    genero: String,
    actores: String,
    sinopsis: String
});

var Movie = mongoose.model('Movie',movieSchema);
module.exports = Movie;