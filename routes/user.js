const express  = require("express");
const router  = express.Router();


const { requireSignin} = require("../controllers/auth")

const {userById, isAuth} = require("../controllers/user")


router.get("/secret/:userId",requireSignin,isAuth, (req, res)=>{
    res.send({
        user : req.profile
    })
})

router.param("userId", userById);




module.exports = router
