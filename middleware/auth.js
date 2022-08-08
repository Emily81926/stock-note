const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  if(authHeader){
    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.JWT_SECRET,(err, user) => {
      if(err){
        return res.status(403).json('token is not valid!');
      }
      req.user = user;
      next();
    } )
  }else{
    res.status(401).json("You are not authenticated!!")
  }
  // const token = req.body.token || req.query.token || req.headers["x-access-token"];
  
  // if(!token){
  //   return res.status(403).send("A token is required for authentication")
  // }

  // try{
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET)
  //   req.user = decoded
  // }catch(error){ 
  //   return res.status(401).send("Invalid token");
  // }
  //return next();
}


module.exports = verifyToken;