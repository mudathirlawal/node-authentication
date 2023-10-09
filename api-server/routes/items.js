
const EXPRESS = require( "express" );
const BODY_PARSER = require( "body-parser" );
const CONTROLLER = require( "../users/controller" );
const MIDDLEWARE = require( "../users/middleware" );
const ITEMS_ROUTER = EXPRESS.Router();

ITEMS_ROUTER.use( BODY_PARSER.json() );
ITEMS_ROUTER.get( "/", MIDDLEWARE.checkApiKey, CONTROLLER.getAllItems );
ITEMS_ROUTER.get( "/:id", MIDDLEWARE.checkApiKey, CONTROLLER.getOneItem );
ITEMS_ROUTER.post( "/", MIDDLEWARE.checkApiKey, MIDDLEWARE.checkAdmin, 
    CONTROLLER.addItem );   
ITEMS_ROUTER.put( "/:id", MIDDLEWARE.checkApiKey, MIDDLEWARE.checkAdmin, 
    CONTROLLER.modifyItem );
ITEMS_ROUTER.delete( "/:id", MIDDLEWARE.checkApiKey, MIDDLEWARE.checkAdmin, 
    CONTROLLER.removeItem );
    
module.exports = ITEMS_ROUTER;

