const knex = require("../db/connection");

function getMovies(){
    return knex("movies").select("*");
}

function getTheaters(){
    return knex("theaters").select("*");
}

function getMovieTheaters(){
    return knex("movies_theaters").select("*");
}

module.exports={
    getMovieTheaters,
    getMovies,
    getTheaters
}