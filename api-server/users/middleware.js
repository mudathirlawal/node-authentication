
const FS = require("fs");

const checkApiKey = ( req, res, next ) => {
  const userData = FS.readFileSync("./db/users.json");
  const userDB = JSON.parse(userData);
  const apiKey = req.headers.api_key;

  if ( !apiKey ) {
    return res.status( 401 ).json(
      { message: "Invalid API key." }
    );
  }

  const userSelected = userDB.find((user) => user.api_key === apiKey);
  if (!userSelected) {
   return res.status(401).json({
      message: "User not authenticated",
    });
  }
  next();
};

const checkAdmin = (req, res, next) => {
  const usersData = FS.readFileSync("./db/users.json");
  const userDB = JSON.parse(usersData);
  const apiKey = req.headers.api_key;
  const userSelected = userDB.find( user => user.api_key === apiKey );

  if( userSelected.userType != "Admin" ){
    return res.status(403).json(
      { message:"User not authorized" }
    );
  }
  next();
};

module.exports = {
  checkApiKey,
  checkAdmin,
};
