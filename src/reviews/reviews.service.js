const knex = require("../db/connection");

function read(reviewId){
    return knex("reviews").select("*").where({review_Id:reviewId}).first();
}

function destroy(reviewId){
    return knex("reviews").where({review_id:reviewId}).del();
}

function update(updatedReview){
    return knex("reviews")
        .select("*")
        .where({review_id : updatedReview.review_id})
        .update(updatedReview,"*")
        .then((updatedRecords) => updatedRecords[0]);
}

function getCritics(){
    return knex("critics").select("*");
}

module.exports={
    destroy,
    read,
    update,
    getCritics
}