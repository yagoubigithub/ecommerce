const User = require("../models/user")


exports.userById = (req, res, next , id)=>{

    User.findById(id).exec((err,user)=>{

        if(err || !user){
            res.status(400).json({
                error :  "User Not found "
            })
        }
        req.profile = user;
        next();
    })
}


exports.isAuth = (req,res,next)=>{
    let user = req.profile && req.auth && req.profile._id == req.auth._id;

    if(!user){
        return res.status(403).json({
            error :  "Access denied"
        })
    }
    next();
}


exports.isAdmin = (req,res,next)=>{

    if(req.profile.role === 0){
        return res.status(403).json({
            error : "Admin resourse! Access denied"
        })
    }
    next();
}