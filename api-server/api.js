const FS = require( "fs" );
const EXPRESS = require( "express" );
const BODY_PARSER = require( "body-parser" );
const ITEMS_ROUTE = require( "./routes/items.js" );
const USERS_ROUTE = require( "./users/users.js" );
const PORT = 3005;
const API = EXPRESS();

API.use( "/items", ITEMS_ROUTE );
API.use( "/items", USERS_ROUTE );

let str = `
    API has started, and server is 
    listening for connection on port: ${PORT}.
`;

API.listen( 
    PORT, () => { console.log( str ); }
);


