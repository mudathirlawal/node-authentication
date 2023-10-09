
const FS = require( "fs" );
const EXPRESS = require( "express" );
const BODY_PARSER = require( "body-parser" );
const CONTROLLER = require("./users_controller");
const MIDDLEWARE = require("./users_middleware");
const USER_ROUTER = EXPRESS.Router();


USER_ROUTER.use( BODY_PARSER.json() );
USER_ROUTER.post( "/", MIDDLEWARE.checkReqBody, CONTROLLER.createUser );
USER_ROUTER.get( CONTROLLER.getAllUsers );


module.exports = USER_ROUTER;
