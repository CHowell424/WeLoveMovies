const knex = require("../db/connection");

function list(){
    return knex("movies").select("*");
}

function getMovies_Theaters(){
    return knex("movies_theaters").select("*");
}

function read(movieId){
    return knex("movies").select("*").where({movie_id:movieId}).first();
}

function getTheaters(){
    return knex("theaters").select("*");
}

function getReviews(){
    return knex("reviews").select("*");
}

function getCritics(){
    return knex("critics").select("*");
}
module.exports = {
    list,
    getMovies_Theaters,
    getTheaters,
    getReviews,
    getCritics,
    read
  };