<<<<<<< HEAD
//unsupported (404) routes

const notFound = (req,res,next)=>{
    // const error = new Error(`not found - ${req-originalUrl}`)
    const error = new Error(`Not found - ${req.originalUrl}`);

    res.status(404);
    next(error);
}

const errorHandler = (error,req,res,next)=>{
    if(res.headerSent){
        return next(error)
    }

    res.status(error.code || 500).json({message:error.message || "An unknow error occured"})
}

=======
//unsupported (404) routes

const notFound = (req,res,next)=>{
    const error = new Error(`not found - ${req-originalUrl}`)
    res.status(404);
    next(error);
}

const errorHandler = (error,req,res,next)=>{
    if(res.headerSent){
        return next(error)
    }

    res.status(error.code || 500).json({message:error.message || "An unknow error occured"})
}

>>>>>>> 8e56e10c44ed715152572326d6bfe6ee3e1ca8fe
module.exports = {notFound,errorHandler}