

const checkReqBody = ( req, res, next ) => {
    if ( !req.body.username || !req.body.username.trim() ){
        return res.status(401).json( { message: "Enter a username!" } );
    }
    if ( !req.body.password || !req.body.password.trim() ){
        return res.status(401).json( { message: "Enter a password!" } );
    }
    next();
};

module.exports = { checkReqBody };

