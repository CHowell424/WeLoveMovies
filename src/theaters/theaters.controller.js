const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asncErrorBoundary");
const reduceProperties = require("../utils/reduce-properties");

async function getMTA(theaters,moviesTheaters){
    let MoviesTheatersArrays=[];
    let mta =[];
    theaters.forEach((theater)=>{
        MoviesTheatersArrays.push(moviesTheaters.filter((mt)=>mt.theater_id==theater.theater_id));
    } )
    MoviesTheatersArrays.forEach((mt)=>{
        mta.push(mt.map((mt2)=>mt2 = mt2.movie_id));
    })

    return mta;
}

async function getMTB(mta,movies){
    let mtb=[];
    for(let n=0;n<mta.length;n++){
        mtb.push([]);
    }
    for(let n=0;n<mta.length;n++){
        for(let t=0; t<mta[n].length;t++){
            for(let m=0;m<movies.length;m++){
                if(movies[m].movie_id == mta[n][t]){
                    mtb[n][t]=movies[m];
                }
            }
        }
    }
    return mtb;
}

async function list(req,res,next){
    const movies = await service.getMovies();
    const theaters = await service.getTheaters();
    const moviesTheaters = await service.getMovieTheaters();

    let mta = await getMTA(theaters,moviesTheaters);
    let mtb = await getMTB(mta,movies);
    //console.log(mta[0].length);
    //console.log(mtb[0].length);
    let data =[];

    for(let n = 0; n<mtb.length;n++){
        data.push({...theaters[n],movies:mtb[n]});
    }
    res.json({data})
}

module.exports={
    list
}