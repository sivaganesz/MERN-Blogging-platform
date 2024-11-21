<<<<<<< HEAD
class HttpError extends Error {
    constructor(message, errorCode){
        super(message);
        this.code=errorCode
    }
}

=======
class HttpError extends Error {
    constructor(message, errorCode){
        super(message);
        this.code=errorCode
    }
}

>>>>>>> 8e56e10c44ed715152572326d6bfe6ee3e1ca8fe
module.exports= HttpError;