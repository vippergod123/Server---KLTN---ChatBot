
var Passport = require("passport")
var LocalStrategy = require("passport-local").Strategy
const accountModel = require('../models/account');

const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy   = passportJWT.Strategy;

const jsonWebTokenConfig = require('../config/jsonWebTokenConfig');

//sua
Passport.use(
  new LocalStrategy((username, password, done) => {
    accountModel.getAllAccount().then (account => { 
      var exist = account.find(x => x.username === username && x.password === password)
      if(!exist)
          return done(null, false, {message: 'Bạn đã nhập sai tài khoản hoặc mật khẩu', status:"error",type:"authentication" });
      return done ( null, user = exist,{message: 'Logged In Successfully', status:"success"} )
      
    })  
    .catch(err => { 
      console.log(err);
      return done(null,false,{message: "Database connect ECONNREFUSED", status: "error", type:"database"})
    })    
  }
)) 


Passport.serializeUser((user, done) => {
  done(null, user)
})
Passport.deserializeUser((id,done) => {
    done(null,id)
});


Passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey   : jsonWebTokenConfig.secretKey
},
function (jwtPayload, cb) {

  //find the user in db if needed
  console.log(jwtPayload);
  
  return UserModel.findOneById(jwtPayload.id)
      .then(user => {
          return cb(null, user);
      })
      .catch(err => {
          return cb(err);
      });
}
));





module.exports = Passport;