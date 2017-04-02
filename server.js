/**
 * Created by Jose Herrera on 31/03/2017.
 */

var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var Movie = require('./models/movie.js');

var app = express();
mongoose.connect('mongodb://localhost/peliculas');

app.get('/', function(req, res){
    var url = 'http://www.cuevana3.com/';
    request(url,function(error, response, html) {
        if(!error){
            var $ = cheerio.load(html);
            callPaginationLink(url);
        }
    });
    res.send("Datos guardados con exito!");
});

function callPaginationLink(url){
    request(url,function(error, response, html) {
        if(!error){
            var $ = cheerio.load(html);

            $('.item a').each(function(){
                 var anchorNode = $(this);
                 var link = anchorNode.attr('href');
                 console.log(link);
                 var json = {};
                 request(link,function (error,response,html) {
                     var $ = cheerio.load(html);

                     var imgNode = $('.info_movie img');
                     var imgSrc = imgNode.attr('src');
                     json.imagen = imgSrc;

                     var ratingNode = imgNode.next();
                     var rating = ratingNode.find('span');
                     json.rating = rating.text().trim();

                     var titleNode = ratingNode.next();
                     var title = titleNode.find('span');
                     json.titulo = title.text().trim();

                     var durationNode = titleNode.next();
                     var duration = durationNode.find('span').text().trim();
                     var minDuration = duration.replace(" min","");
                     json.duracionMinutos = parseInt(minDuration);

                     var yearNode = durationNode.next();
                     var year = yearNode.find('span');
                     json.ano = parseInt(year.text());

                     var releaseDateNode = yearNode.next();
                     var releaseDate = releaseDateNode.find('span');
                     json.fechaLanzamiento = releaseDate.text().trim();

                     var countryNode = releaseDateNode.next();
                     var country = countryNode.find('span');
                     json.pais = country.text().trim();

                     var idiomsNode = countryNode.next();
                     var idioms = idiomsNode.find('span');
                     json.idiomas = idioms.text().trim();

                     var qualityNode = idiomsNode.next();
                     var quality = qualityNode.find('span');
                     json.calidad = quality.text().trim();

                     var directorNode = qualityNode.next();
                     var director = directorNode.find('span');
                     json.director = director.text().trim();

                     var filmScriptNode = directorNode.next();
                     var script = filmScriptNode.find('span');
                     json.guion = script.text().trim();

                     var trophiesNode = filmScriptNode.next();
                     var trophies = trophiesNode.find('span');
                     json.premios = trophies.text().trim();

                     var genreNode = trophiesNode.next();
                     var genre = genreNode.find('span');
                     json.genero = genre.text().trim();

                     var actorsNode = genreNode.next();
                     var actors = actorsNode.find('span');
                     json.actores = actors.text().trim();

                     var sinopsisNode = $('.post-content p');
                     json.sinopsis = sinopsisNode.text();

                     if(json.imagen != undefined){
                         new Movie(json).save();
                     }
                     //console.log(json);
                 });
             });
            var nextPaginationLink = $('.current').next();
            if(nextPaginationLink.is('a')){
                var nextLink = nextPaginationLink.attr('href');
                callPaginationLink(nextLink);
            }
        }
    });
}

app.listen('8080');

console.log('Express has started on port:8080');
