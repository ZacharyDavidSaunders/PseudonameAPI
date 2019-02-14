function checkParamsMiddleware(req, res, next) {
    var requiredParams = ['alias','realEmail'];
    var hasRequiredParams = true;
    for(var i in requiredParams){
        // Checks that API supplies the required params
        if(!req.query[requiredParams[i]]){
            hasRequiredParams = false;
        }
    }

    if(hasRequiredParams){
        next();
    }else{
        res.status(422).send({
            success: 'FALSE',
            message: 'Error: Missing required param. Please ensure that the following params are provided in the query: '+requiredParams.toString().split(',').join(', ')+'.'
        });
    }
}

module.exports = {
    checkParamsMiddleware : checkParamsMiddleware
}