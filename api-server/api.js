const EXPRESS = require( 'express' );
const ITEMS_ROUTE = require( "./routes/items.js" );

const PORT = 3003;
const API = EXPRESS();

API.use( "./db/items.json", ITEMS_ROUTE );

let str = `
    API has started, and server is 
    listening for connection on port: ${PORT}.
`;

API.listen( 
    PORT, () => { console.log( str ); }
);


