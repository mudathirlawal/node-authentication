const EXPRESS = require( 'express' );
const FS = require( "fs" );

const PORT = 1200;
const SERVER = EXPRESS();

let str = `
    App has started, and server is 
    listening for connection on port: ${PORT}.
`;

SERVER.listen( 
    PORT, () => { console.log( str ); }
);

SERVER.set("view engine", "ejs");
SERVER.set("views", "views");
SERVER.get( "/", (req, res) => {
    res.status(200).render("index");
} );

SERVER.get( "/index", (req, res) => {
    res.status(200).render("index");
} );

SERVER.get( "*", (req, res) => {
    res.status(404).render("404");
} );
