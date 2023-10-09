
const FS = require( "fs" );
const EXPRESS = require( "express" );
const BODY_PARSER = require( "body-parser" );
const CONTROLLER = require("./users_controller");
const MIDDLEWARE = require("./users_middleware");
const USER_ROUTER = express.Router();

USER_ROUTER.use( BODY_PARSER.json() );
USER_ROUTER.post( "/", MIDDLEWARE.checkReqBody, CONTROLLER.createUser );
USER_ROUTER.get( CONTROLLER.getUser );


module.exports = USER_ROUTER;
