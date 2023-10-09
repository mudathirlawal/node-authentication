
const FS = require( "fs" );
const EXPRESS = require( "express" );
const BODY_PARSER = require( "body-parser" );
const { error } = require( "console" );
const ITEMS_ROUTER = EXPRESS.Router();

ITEMS_ROUTER.use( BODY_PARSER.json() );

let getAllItems = ITEMS_ROUTER.get( "/", ( req, res ) => {
    const items = FS.readFileSync( "./db/items.json" );
    res.status( 200 ).send( items );
} );

let getOneItem = ITEMS_ROUTER.get( "/:id", ( req, res ) => {
    const ITEMS_DB = FS.readFileSync( "./db/items.json" );
    const ITEMS_ARRAY = JSON.parse( ITEMS_DB );
    const ID = req.params.id;
    const ITEM_FOUND = ITEMS_ARRAY.find( ( item ) => {
        return item.id == parseInt( ID );
    } );
    if ( ITEM_FOUND == undefined ){
        res.status(404).send("The requested item cannot be found.");
        return;
    }
    res.status( 200 ).send( ITEM_FOUND );
} );

let addItem = ITEMS_ROUTER.post( "/", ( req, res ) => {
    const ITEMS_DB = FS.readFileSync( "./db/items.json" );
    const ITEMS = JSON.parse( ITEMS_DB );
    const ITEMS_SIZE = ITEMS.length - 1;
    const LAST_ID = ITEMS[ITEMS_SIZE].id;
    const NEW_ID = LAST_ID + 1;
    const NEW_ITEM = req.body;
    const NEW_ITEM_AND_ID = { ...NEW_ITEM, id: NEW_ID };
    ITEMS.push(NEW_ITEM_AND_ID);
    FS.writeFile( "./db/items.json", JSON.stringify(ITEMS), 
    (error) => {
        if ( error ){
            res.status(500);
        }
        res.status(200).json(NEW_ITEM_AND_ID);
    } );
} );

let modifyItem = ITEMS_ROUTER.patch( "/:id", ( req, res ) => {
    const ITEMS_DB = FS.readFileSync( "./db/items.json" );
    const ITEMS_ARRAY = JSON.parse( ITEMS_DB );
    const NEW_UPDATE = req.body;
    const ID = req.params.id;
    const ITEM_INDEX = ITEMS_ARRAY.findIndex( ( item ) => {
        return item.id == parseInt( ID );
    } );
    ITEMS_ARRAY[ITEM_INDEX] = {...ITEMS_ARRAY[ITEM_INDEX], ...NEW_UPDATE};
    
    FS.writeFile( "./db/items.json", JSON.stringify(ITEMS_ARRAY), 
    ( error ) => {
        if ( error ){
            res.status(500);
        }
        res.status(200).send( ITEMS_ARRAY[ITEM_INDEX] );
    } );
} );

let removeItem = ITEMS_ROUTER.delete( "/:id", ( req, res ) => {
    const ITEMS_DB = FS.readFileSync( "./db/items.json" );
    const ITEMS_ARRAY = JSON.parse( ITEMS_DB );
    const ID = req.params.id;
    const ITEM_INDEX = ITEMS_ARRAY.findIndex( ( item ) => {
        return item.id == parseInt( ID );
    } );

    if (ITEM_INDEX == -1){
        res.status(404).send( "Could not find item ${ID}");
        return; 
    } 
    else {
        ITEMS_ARRAY.splice(ITEM_INDEX, 1);
    }
    FS.writeFile( "./db/items.json", JSON.stringify(ITEMS_ARRAY), (error) => {
        if ( error ){
            res.status(404).send( "System encountered internal server error!");
            return; 
        } 
        res.status( 200 ).send( "Item ${ID}, successfully deleted." );
    });
});
 
// module.exports = ITEMS_ROUTER;

module.exports = {
    addItem,
    modifyItem,
    removeItem,
    getOneItem,
    getAllItems
}
