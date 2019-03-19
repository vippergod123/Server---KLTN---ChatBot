function isLoggedin(req, res, next) {  
  console.log(req.user);
  
    if (!req.user) {
      res.json({
        error: "You not sign in yet!",
        redirect: "/signin",
      })
    }  
    else {
      return next()
    }  
 }

 function isAdmin(req, res, next) {  
  
    if (!req.user) {
      res.json({
        error: "You not sign in yet!",
        redirect: "/signin",
      }) 
    }  
    else {
      if ( req.user.role !== "admin")
        res.json({
          error: "You have no permission to access this page!",
          redirect: "/signin",
        })
      else 
        return next()
    }  
 }

 

 module.exports.isLoggedin = isLoggedin
 module.exports.isAdmin = isAdmin