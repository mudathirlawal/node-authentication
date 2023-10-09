
const FS = require( "fs" );
const EXPRESS = require( "express" );
const BODY_PARSER = require( "body-parser" );
const USERS_ROUTE = require( "./users.js" );
const ITEMS_ROUTE = require( "../routes/items.js" );


let getAllUsers = ITEMS_ROUTE.get( "/", ( req, res ) => {
    const items = FS.readFileSync( "./db/users.json" );
    res.status( 200 ).send( users );
} );

let approvedAdmins = [ "Adeola", "Director" ];
const createUser = ( req, res ) => {
    const USER_DATA = FS.readFileSync( "./db/users.json" );
    const USERS_DB = JSON.parse( USER_DATA );
    const NEW_USER = req.body;

    NEW_USER.apiKey = `${NEW_USER.username}_${NEW_USER.password}`;
    if ( approvedAdmins.includes( NEW_USER.username ) ) {
        NEW_USER.userType = "Admin";
    }
    else {
        NEW_USER.userType = "User";
    }

    USERS_DB.push( NEW_USER );
    FS.writeFile( "./db/users.json", JSON.stringify( USERS_DB ), 
    ( error ) => {
        if ( error ) { 
            res.status( 500 ).json( { message: "Encountered internal error." } 
        ); }
        res.status( 200 ).json( `New user: ${NEW_USER}, successfully created` );
    } );
};


module.exports = {
    createUser,
    getAllUsers
};