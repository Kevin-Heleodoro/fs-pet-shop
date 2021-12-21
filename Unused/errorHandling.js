const { append } = require("express/lib/response");

//custom error 
function bigError(message){
    Error.captureStackTrace(this);
    this.message = message;
    this.name = "bigError";
}

bigError.prototype = Object.create(Error.prototype);

// use Error objects
// cb(err) or next(err) then immediately return
// helper functions can be used for creating standard schema for sending errors
// log EVERY error

function handleError(err, req, res){
    logError(err);

    let message = err ? err.message : "Internal Server Error"; // if no real message, send internal server

    res.json({
        error: {message: message} // makes sure message is json
    });

    function logError(error){
        console.log({
            message: error.message,
            stack: error.stack
        })
    }
}

app.get('/mountains/:id', function(req,res){
    db.get(req.params.id, function(err, user){
        if(err){
            return handleError(err, req, res)
        }
        res.json(user);
    })
})

app.use((req, res, next)=>{
    const error = new Error('Not found');
    error.status = 404
    next(error);
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
})