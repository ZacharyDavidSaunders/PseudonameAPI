function checkParamsMiddleware(req, res, next) {
    var requiredParams = ['alias','realEmail'];
    var hasRequiredParams = true;
    for(var i in requiredParams){
        // Checks that the API request supplies the required params.
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

function validateParamsMiddleware(req, res, next) {
    var alias = req.query['alias'];
    var email = req.query['realEmail'];
    var emailVerificationRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(alias.includes('@')){
        res.status(422).send({
            success: 'FALSE',
            message: 'Error: The supplied alias parameter is invalid. Please be sure that it does not contain an \'@\' symbol.'
        });
    }else{
        if(!emailVerificationRegex.test(email)){
            res.status(422).send({
                success: 'FALSE',
                message: 'Error: The supplied realEmail parameter is invalid.'
            });
        }else{
            next();
        }
    }
}

module.exports.checkParamsMiddleware = checkParamsMiddleware;
module.exports.validateParamsMiddleware = validateParamsMiddleware;
