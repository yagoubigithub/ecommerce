const express  = require("express");
const router  = express.Router();



const { create , read , categoryById , update,list , remove } = require("../controllers/category")
const {isAuth, isAdmin ,requireSignin} = require("../controllers/auth")
const {userById} = require("../controllers/user")

router.get("/category/:categoryId", read)
router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create)
router.put("/category/:categoryId/:userId", requireSignin, isAuth, isAdmin, update)
router.delete("/category/:categoryId/:userId", requireSignin, isAuth, isAdmin, remove)
router.get("/categories", list)


router.param("userId", userById);
router.param("categoryId", categoryById);



module.exports = router
