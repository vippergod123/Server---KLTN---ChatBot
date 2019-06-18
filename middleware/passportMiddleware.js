const error_code = require('../global/error_code');


function isLoggedin(req, res, next) {  
  console.log(req.user);
  
    if (!req.user) {
      return res.status(error_code.ERROR_CODE).json({
        status:"error",
        type: "authentication",
        message: "Bạn vẫn chưa đăng nhập!",
        redirect: "/signin",
      })
    }  
    else {
      return next()
    }  
 }

 function isAdmin(req, res, next) {  
  console.log("middleware isAdmin:" +req.user);
  
    if (!req.user) {
      return res.status(error_code.ERROR_CODE).json({
        status:"error",
        type: "authentication",
        message: "Bạn vẫn chưa đăng nhập !",
        redirect: "/signin",
      }) 
    }  
    else {
      if ( req.user.role !== "admin")
        return res.status(error_code.ERROR_CODE).json({
          message: "Bạn không có quyền hạn để truy cập trang này",
          type: "authentication",
          status:"error",
          redirect: "/signin",
        })
      else 
        return next()
    }  
 }

 

 module.exports.isLoggedin = isLoggedin
 module.exports.isAdmin = isAdmin