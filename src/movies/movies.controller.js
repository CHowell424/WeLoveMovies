
const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asncErrorBoundary");

async function list(req,res,next){
    const movies = await service.list();
    let data = movies;
    const is_showing = req.query.is_showing
    if(is_showing){
        const movies_theaters = await service.getMovies_Theaters();
        const moviesShowingInTeaters = movies_theaters.filter((movie)=>movie.is_showing ==true);
        const idMS = moviesShowingInTeaters.map((movie)=>movie = movie.movie_id);
        data = movies.filter((movie)=>idMS.includes(movie.movie_id));
    }
    return res.json({data});
}

async function movieExists(req,res,next){
    const movieId= req.params.movieId;
    const movie = await service.read(movieId);
    if(movie){
        return next();
    }
    return next({status: 404, message:`could not find movie with id of ${movieId}`});
}

async function read(req,res,next){
    const movieId = req.params.movieId;
    const data = await service.read(movieId);
    res.json({data});
}

async function theaters(req,res,next){
    const movieId = req.params.movieId;
    const theaters = await service.getTheaters();
    const movies_theaters = await service.getMovies_Theaters();

    const theatersShowingMovie = movies_theaters.filter((movie)=>movie.movie_id ==movieId);
    const theatersIdShowingMovie = theatersShowingMovie.map((theater)=>theater=theater.theater_id);

    const data = theaters.filter((theater)=>theatersIdShowingMovie.includes(theater.theater_id));

    res.json({data});
}

async function reviews(req,res,next){
    const movieId = req.params.movieId;
    const critics = await service.getCritics();
    const reviews = await service.getReviews();

    const reviewsOfMovie = reviews.filter((review)=>review.movie_id==movieId);

    const data = reviewsOfMovie.map((review)=>review = {...review, critic :critics.find((critic)=>critic.critic_id==review.critic_id)})
    
    res.json({data});
};

module.exports={
    list:asyncErrorBoundary(list),
    read:[asyncErrorBoundary(movieExists),asyncErrorBoundary(read)],
    theaters:[asyncErrorBoundary(movieExists),asyncErrorBoundary(theaters)],
    reviews:[asyncErrorBoundary(movieExists),asyncErrorBoundary(reviews)]
}