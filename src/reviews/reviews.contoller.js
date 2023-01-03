const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asncErrorBoundary");

async function isValidId(req,res,next){
    const reviewId= req.params.reviewId;
    const foundReview = await service.read(reviewId);
    if(foundReview){
        return next();
    }
    next({status:404,message:`Review cannot be found.`});
}

async function destroy (req,res,next){
    await service.destroy(req.params.reviewId);
    res.sendStatus(204);
}

async function update(req,res,next){
    const updatedReview ={
        ...req.body.data,
        review_id:req.params.reviewId
    }
    const critics = await service.getCritics();
    const updated = await service.update(updatedReview);
    const review = await service.read(req.params.reviewId);
    const data = {...review,critic:critics.find((critic)=>critic.critic_id==review.critic_id)}
    res.json({data});
}

module.exports={
    delete:[asyncErrorBoundary(isValidId), asyncErrorBoundary(destroy)],
    update:[asyncErrorBoundary(isValidId), asyncErrorBoundary(update)]
}